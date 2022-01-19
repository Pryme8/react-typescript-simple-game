import { FC, useRef, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { Modal } from "../../Components";
import { SpriteSheets, CheckForCachedSheetThen } from "../../Assets";
import { IZone, Zones } from "../../../Core/World";

interface IExplorationDisplay {
  distanceTraveled: number;
  distanceToNextZone: number;
  startedLastZoneAt: number;

  currentZone: string;
  nextZone: string;
  lastZone: string;
}

export const ExplorationDisplay: FC<IExplorationDisplay> = ({
  distanceTraveled,
  distanceToNextZone,
  startedLastZoneAt,
  currentZone,
  nextZone,
  lastZone
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resize = (ref: HTMLCanvasElement) => {
    const parentElement = ref.parentElement;
    const rect = parentElement?.getBoundingClientRect();
    const width = rect?.width;
    const height = rect?.height;
    ref.width = width * 3 ?? 0;
    ref.height = height ?? 0;
  };
  const _Zones: any = Zones;

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const width = ctx.canvas.width / 3;
      const height = ctx.canvas.height;
      if (!currentZone) {
        return;
      }

      const zoneList = [
        _Zones[lastZone],
        _Zones[currentZone],
        _Zones[nextZone]
      ];
      const _SpriteSheets: any = SpriteSheets;
      const sheets = [
        _SpriteSheets[zoneList[0].spriteSheet],
        _SpriteSheets[zoneList[1].spriteSheet],
        _SpriteSheets[zoneList[2].spriteSheet]
      ];
      const distanceTillNext = distanceToNextZone - distanceTraveled;
      const stepsTillNext = Math.floor(distanceToNextZone - distanceTraveled);
      const currentStepDistance = distanceTillNext - stepsTillNext;
      const distanceThisSegment = distanceTraveled - startedLastZoneAt;

      let x = 0;
      let z = 0;
      zoneList.forEach(() => {
        let sheet = sheets[z];
        let cellId = zoneList[1].spriteCellId;
        z++;
        if (distanceThisSegment < 1) {
          if (z === 1) {
            sheet = sheets[0];
            cellId = zoneList[0].spriteCellId;
          }
        } else if (stepsTillNext <= 1) {
          if (z === 3) {
            sheet = sheets[2];
            cellId = zoneList[2].spriteCellId;
          }
        }

        let cellWidth = sheet.cellSizeX;
        let cellHeight = sheet.cellSizeY;
        let cellY = Math.floor(cellId / sheet.cellCountY);
        let cellX = cellId - cellY * sheet.cellCountX;

        const maxSteps = width / cellWidth;
        const fullSteps = Math.floor(maxSteps);
        const fractionalStep = maxSteps - fullSteps;
        for (let i = 0; i <= maxSteps; i++) {
          ctx.drawImage(
            sheet.cached,
            cellWidth * cellX + sheet.cellOffsetX * (1 + cellX),
            cellHeight * cellY + sheet.cellOffsetX * (1 + cellY),
            cellWidth,
            cellHeight,
            x,
            0,
            cellWidth,
            height
          );
          x += cellWidth;
        }
        const fractWidth = cellWidth * (1.0 - fractionalStep);
        x -= fractWidth;
      });

      ctx.canvas.style.left = `${
        width * -0.5 - width * (1.0 - currentStepDistance)
      }px`;

      return () => {};
    },
    [currentZone, distanceTraveled, distanceToNextZone]
  );

  useEffect(() => {
    const ref = canvasRef && canvasRef.current;
    if (ref) {
      resize(ref);
      const ctx = ref.getContext("2d");
      const zoneList = [
        _Zones[lastZone],
        _Zones[currentZone],
        _Zones[nextZone]
      ];
      if (ctx && currentZone) {
        let done = 0;
        const _SpriteSheets: any = SpriteSheets;
        zoneList.forEach((zone: IZone) => {
          const sheet = _SpriteSheets[zone.spriteSheet];
          CheckForCachedSheetThen(sheet.name, () => {
            if (++done === 3) {
              draw(ctx);
            }
          });
        });
      }
    }
  }, [draw]);

  const wrapperStyle = {
    display: "block",
    position: "absolute",
    left: "3px",
    top: "34px",
    width: "calc(100% - 6px)",
    height: "96px"
  };

  const modalStyle = {
    display: "block",
    position: "relative",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
  };

  const canvasWrap = {
    display: "block",
    position: "absolute",
    left: 5,
    top: 5,
    right: 5,
    bottom: 5,
    zIndex: -1,
    overflow: "hidden"
  };

  return (
    <Box sx={wrapperStyle}>
      <Modal sx={modalStyle}>
        <Box sx={canvasWrap}>
          <canvas style={{ position: "absolute", left: 0 }} ref={canvasRef} />
        </Box>
      </Modal>
      <Modal
        sx={{ ...modalStyle, position: "absolute", zIndex: 2 }}
        backgroundStyle={{ backgroundColor: "transparent" }}
      >
        {(distanceToNextZone - distanceTraveled).toFixed(2)}
      </Modal>
    </Box>
  );
};
