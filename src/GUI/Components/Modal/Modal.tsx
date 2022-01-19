import { FC, useRef, useEffect, useCallback } from "react";
import { Box } from "@mui/material";

import { ModalTemplates } from "./ModalTemplates";

import { useResizeDetector } from "react-resize-detector";

const PatchNineDraw = (templateData: any, ctx: any): void => {
  const img = templateData.cached;
  const tw = templateData.tw; //templateWidth
  const th = templateData.th; //templateHeight
  const cs = templateData.cs; //cornerSize
  const w = ctx.canvas.width; //canvasWidth
  const h = ctx.canvas.height; //canvasHeight

  ctx.drawImage(img, 0, 0, cs, cs, 0, 0, cs, cs);
  ctx.drawImage(img, tw - cs, 0, cs, cs, w - cs, 0, cs, cs);
  ctx.drawImage(img, tw - cs, th - cs, cs, cs, w - cs, h - cs, cs, cs);
  ctx.drawImage(img, 0, th - cs, cs, cs, 0, h - cs, cs, cs);
  // //Rails
  ctx.drawImage(img, cs, 0, cs, cs, cs, 0, w - cs * 2, cs);
  ctx.drawImage(img, tw - cs, cs, cs, cs, w - cs, cs, cs, h - cs * 2);
  ctx.drawImage(img, cs, th - cs, cs, cs, cs, h - cs, w - cs * 2, cs);
  ctx.drawImage(img, 0, cs, cs, cs, 0, cs, cs, h - cs * 2);
};

interface IModal {
  templateName?: string;
  children?: any;
  sx?: any;
  backgroundStyle?: any;
  contentStyle?: any;
}

export const Modal: FC<IModal> = ({
  templateName = "Basic",
  children,
  sx,
  backgroundStyle,
  contentStyle
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resize = useCallback(
    (ref: HTMLCanvasElement, width: number = -1, height: number = -1) => {
      if (width >= 0 || height >= 0) {
        ref.width = width;
        ref.height = height;
      } else {
        const parentElement = ref.parentElement;
        const rect = parentElement?.getBoundingClientRect();
        ref.width = rect?.width ?? 0;
        ref.height = rect?.height ?? 0;
      }
    },
    []
  );

  const draw = useCallback(() => {
    const template = ModalTemplates[templateName];
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      const ctx = ref.getContext("2d");
      if (ctx) {
        console.log("Template", template);
        if (template.cached) {
          PatchNineDraw(template, ctx);
        } else {
          const image = new Image();
          image.src = template.url;
          image.onload = () => {
            template.cached = image;
            PatchNineDraw(template, ctx);
          };
        }
      }
    }
  }, [templateName]);

  useEffect(() => {
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      resize(ref);
      draw();
    }
  }, []);

  const resizeRef = useRef<HTMLDivElement>(null);
  const onResize = useCallback(() => {
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      resize(ref);
      draw();
    }
  }, [draw, resize]);

  const { width, height } = useResizeDetector({
    //handleHeight: false,
    //refreshMode: "debounce",\
    targetRef: resizeRef,
    refreshRate: 30,
    onResize
  });

  const baseStyle = {
    userSelect: "none"
  };

  const canvasStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: 0
  };

  const bgStyle = {
    ...{
      position: "absolute",
      left: 5,
      top: 5,
      right: 5,
      bottom: 5,
      zIndex: 0,
      backgroundColor: "rgba(80, 80, 210, 0.86)"
    },
    ...backgroundStyle
  };

  const contentBaseStyle = {
    position: "relative",
    zIndex: 1
  };

  return (
    <Box ref={resizeRef} sx={{ ...baseStyle, ...sx }}>
      <Box sx={{ ...bgStyle }}></Box>
      <canvas ref={canvasRef} style={canvasStyle} />
      <Box sx={{ ...contentBaseStyle, ...sx, ...contentStyle }}>{children}</Box>
    </Box>
    // <Box ref={resizeRef} sx={{ ...baseStyle, ...sx, ...wrapperStyle }}>
    //
    //   <canvas ref={canvasRef} style={canvasStyle as any} />
    // </Box>
  );
};
