import { FC, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { ButtonATemplates, IButtonATemplateProps } from "./ButtonATemplates";

import { useResizeDetector } from "react-resize-detector";

// class ModalImageTemplate {
//   public static Instance: ModalImageTemplate;
//   public canvas: HTMLCanvasElement | null = null;
//   constructor() {
//     if (!ModalImageTemplate.Instance) {
//       ModalImageTemplate.Instance = this;
//     } else {
//       return;
//     }
//     const canvas = document.createElement("canvas");
//     const w = 64;
//     const h = 64;
//     const r = 6;
//     canvas.width = 64;
//     canvas.height = 64;
//     const ctx = canvas.getContext("2d");
//     this.canvas = canvas;
//   }
// }

const PatchNineDraw = (
  template: IButtonATemplateProps,
  offset: number,
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D
): void => {
  //const rect = parentElement.getBoundingClientRect();
  const tw = template.tw; //templateWidth
  const th = template.th; //templateHeight
  const cs = template.cs; //cornerSize
  const w = ctx.canvas.width; //canvasWidth
  const h = ctx.canvas.height / 3; //canvasHeight
  ctx.save();
  ctx.translate(0, offset);
  //bg
  // ctx.drawImage(img, tw * 0.5 - 0.5, th * 0.5 - 0.5, 1, 1, 0, 0, w, h);
  // //ClearSpaces
  // ctx.clearRect(0, 0, cs, cs);
  // ctx.clearRect(w - cs, 0, cs, cs);
  // ctx.clearRect(w - cs, h - cs + 0, cs, cs);
  // ctx.clearRect(0, h - cs + 0, cs, cs);
  // ctx.clearRect(0, 0, w, rs.b + 0);
  // ctx.clearRect(w - rs.b, 0, rs.b, h);
  // ctx.clearRect(0, h - rs.b + 0, w, rs.b);
  // ctx.clearRect(0, 0, rs.b, h);
  //Corners
  ctx.drawImage(img, 0, 0, cs, cs, 0, 0, cs, cs);
  ctx.drawImage(img, tw - cs, 0, cs, cs, w - cs, 0, cs, cs);
  ctx.drawImage(img, tw - cs, th - cs, cs, cs, w - cs, h - cs, cs, cs);
  ctx.drawImage(img, 0, th - cs, cs, cs, 0, h - cs, cs, cs);
  // //Rails
  ctx.drawImage(img, cs, 0, cs, cs, cs, 0, w - cs * 2, cs);
  ctx.drawImage(img, tw - cs, cs, cs, cs, w - cs, cs, cs, h - cs * 2);
  ctx.drawImage(img, cs, th - cs, cs, cs, cs, h - cs, w - cs * 2, cs);
  ctx.drawImage(img, 0, cs, cs, cs, 0, cs, cs, h - cs * 2);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.restore();
};

const PatchNineButtonDraw = (
  template: IButtonATemplatesProps,
  normal: HTMLImageElement,
  active: HTMLImageElement,
  hover: HTMLImageElement,
  ctx: CanvasRenderingContext2D
): void => {
  //const parentElement = ctx.canvas.parentElement;
  //const rect = parentElement.getBoundingClientRect();
  const h = ctx.canvas.height / 3; //canvasHeight
  PatchNineDraw(template, 0, normal, ctx);
  PatchNineDraw(template, h, active, ctx);
  PatchNineDraw(template, h * 2, hover, ctx);
};

interface IButtonA {
  templateName?: string;
  children?: any;
  sx?: any;
  wrapSx: any;
  id?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonA: FC<IButtonA> = ({
  id,
  children,
  onClick,
  disabled,
  sx,
  wrapSx,
  templateName = "Basic"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const resize = useCallback(
    (ref: HTMLCanvasElement, width: number = -1, height: number = -1) => {
      if (width >= 0 || height >= 0) {
        ref.width = width;
        ref.height = height;
      } else {
        const parentElement = ref.parentElement;
        const rect = parentElement?.getBoundingClientRect();
        ref.width = rect.width ?? 0;
        ref.height = rect.height * 3 ?? 0;
      }
    },
    []
  );

  const draw = useCallback(() => {
    const template = ButtonATemplates[templateName];
    console.log(template);
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      const ctx = ref.getContext("2d");
      if (ctx) {
        if (
          template.cached.normal &&
          template.cached.hover &&
          template.cached.active
        ) {
          PatchNineButtonDraw(
            template,
            template.cached.normal,
            template.cached.hover,
            template.cached.active,
            ctx
          );
        } else {
          let loaded = 0;
          const targetLoad = 3;

          const normalImage = new Image();
          const activeImage = new Image();
          const hoverImage = new Image();

          const checkLoaded = () => {
            loaded++;
            if (loaded === targetLoad) {
              PatchNineButtonDraw(
                template,
                normalImage,
                activeImage,
                hoverImage,
                ctx
              );
            }
          };

          normalImage.src = template.urls.normal;
          normalImage.onload = () => {
            template.cached.normal = normalImage;
            checkLoaded();
          };

          activeImage.src = template.urls.active;
          activeImage.onload = () => {
            template.cached.normal = activeImage;
            checkLoaded();
          };

          hoverImage.src = template.urls.hover;
          hoverImage.onload = () => {
            template.cached.normal = hoverImage;
            checkLoaded();
          };
        }
      }
    }
  }, []);

  const onResize = useCallback(() => {
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      resize(ref);
      draw();
    }
  }, []);

  const { width, height } = useResizeDetector({
    //handleHeight: false,
    //refreshMode: "debounce",\
    targetRef: resizeRef,
    refreshRate: 30,
    onResize
  });

  const baseStyle = {
    userSelect: "none",
    fontSize: "0.65em",
    cursor: "pointer",
    color: "lightGray",
    boxSizing: "border-box"
  };

  const hoverStyle = {
    "&:hover .buttonCanvas": {
      transform: `translateY(calc(-${(1 / 3) * 100}% ))`
    },
    "&:active .buttonCanvas": {
      transform: `translateY(calc(-${(2 / 3) * 100}% ))`
    },
    "&:hover, &hover *": {
      color: "white"
    },
    "&:active, &active *": {
      color: "skyblue"
    }
  };

  const canvasStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1
  };

  const wrapStyle = {
    ...{
      position: "relative",
      overflow: "hidden",
      minHeight: "36px",
      boxSizing: "border-box",
      pointerEvents: "none",
      lineHeight: "36px"
    },
    ...wrapSx
  };

  const childrenWrapStyle = {
    position: "relative"
  };

  const contents = (
    <Box sx={wrapStyle}>
      <canvas ref={canvasRef} style={canvasStyle} className="buttonCanvas" />
      <Box sx={childrenWrapStyle}>{children}</Box>
    </Box>
  );

  return (
    (!disabled && (
      <Box
        sx={{ ...baseStyle, ...hoverStyle, ...sx }}
        onClick={onClick}
        id={id}
        ref={resizeRef}
      >
        {contents}
      </Box>
    )) || (
      <Box
        sx={{ ...baseStyle, ...sx, cursor: "default" }}
        onClick={onClick}
        id={id}
        ref={resizeRef}
      >
        {contents}
      </Box>
    )
  );
};
