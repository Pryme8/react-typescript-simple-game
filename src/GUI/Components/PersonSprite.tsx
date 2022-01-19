import React, { FC, useRef, useState, useEffect } from "react";
import PeopleSpritesA from "../Assets/Sprites.png";
import { Box } from "@mui/material";

interface IPersonSprite {
  sx?: any;
  spriteId: number;
  flipX?: boolean;
}
export const PersonSprite: FC<IPersonSprite> = ({ spriteId, sx, flipX }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resize = (ref: HTMLCanvasElement) => {
    const parentElement = ref.parentElement;
    const rect = parentElement?.getBoundingClientRect();
    const width = rect?.width;
    const height = rect?.height;
    ref.width = 64 ?? 0;
    ref.height = 64 ?? 0;
  };

  useEffect(() => {
    const ref = canvasRef && canvasRef.current;
    const draw = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const cellWidth = 80;
      const cellHeight = 80;
      const cellId = spriteId;
      const cellY = Math.floor(cellId / 12);
      const cellX = cellId - cellY * 12;

      ctx.drawImage(
        image,
        cellWidth * cellX,
        cellHeight * cellY,
        cellWidth,
        cellHeight,
        0,
        0,
        width,
        height
      );
    };
    if (ref) {
      resize(ref);
      const ctx = ref.getContext("2d");
      if (ctx) {
        const image = new Image();
        image.src = PeopleSpritesA;
        image.onload = () => {
          draw(ctx, image);
        };
      }
    }
    return () => {};
  }, [spriteId]);

  const flipXStyle = {
    transform: "scaleX(-1)"
  };

  return (
    <Box sx={{ ...sx }}>
      <Box sx={flipX ? {} : { ...flipXStyle }}>
        <canvas style={{ zIndex: -1 }} ref={canvasRef} />
      </Box>
    </Box>
  );
};
