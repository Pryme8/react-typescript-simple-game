import React, { FC, useRef, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { useResizeDetector } from "react-resize-detector";
import { SpriteSheets } from "../Assets";
import { Zones } from "../../Core";

interface IBackground {
  currentZoneName: string;
}

export const Background: FC<IBackground> = ({ currentZoneName }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getZoneData = useCallback(() => {
    return Zones[currentZoneName];
  }, [currentZoneName]);

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
    [currentZoneName]
  );

  const draw = useCallback(() => {
    const zoneData = getZoneData();
    const sheet = SpriteSheets[zoneData.spriteSheet];
    const _draw = (ctx, img) => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const cellWidth = 240;
      const cellHeight = 170;
      const cellId = zoneData.spriteCellId;
      const cellY = Math.floor(cellId / sheet.cellCountX);
      const cellX = cellId - cellY * sheet.cellCountX;

      let ratio = 1;
      if (width < height) {
        //Check if once its Scaled up it will cover the whole contents
        ratio = height / cellHeight;
        const sw = cellWidth * ratio;
        if (sw < width) {
          ratio += width / sw;
        }
      } else {
        ratio = width / cellWidth;
        const sh = cellHeight * ratio;
        if (sh < height) {
          ratio += height / sh;
        }
      }

      ctx.clearRect = "black";
      ctx.fillRect(0, 0, width, height);
      const nW = cellWidth * ratio;
      const nH = cellHeight * ratio;
      ctx.drawImage(
        img,
        cellX + 1 + cellWidth * cellX,
        cellY + 1 + cellHeight * cellY,
        cellWidth,
        cellHeight,
        0,
        0,
        nW,
        nH
      );
    };
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      const ctx = ref.getContext("2d");
      if (ctx) {
        if (sheet.cached) {
          _draw(ctx, sheet.cached);
        } else {
          const image = new Image();
          image.src = sheet.url;
          image.onload = () => {
            console.log("loaded!");
            sheet.cached = image;
            _draw(ctx, image);
          };
        }
      }
    }
  }, [currentZoneName]);

  useEffect(() => {
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      resize(ref);
      draw();
    }
    return () => {};
  }, [currentZoneName]);

  const resizeRef = useRef<HTMLDivElement>(null);
  const onResize = useCallback(() => {
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      resize(ref);
      draw();
    }
  }, [currentZoneName]);

  const { width, height } = useResizeDetector({
    //handleHeight: false,
    //refreshMode: "debounce",\
    targetRef: resizeRef,
    refreshRate: 30,
    onResize
  });

  const wrapperStyle = {
    position: "absolute",
    width: "100%",
    height: "100%"
  };

  return (
    <Box sx={wrapperStyle} ref={resizeRef}>
      <canvas style={{ zIndex: -1 }} ref={canvasRef} />
    </Box>
  );
};
