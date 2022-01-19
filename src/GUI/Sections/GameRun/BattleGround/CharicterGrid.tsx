import React, { FC, useCallback } from "react";
import { Box } from "@mui/material";

import { EntityOnGrid } from "./EntityOnGrid";

import { EntityCache, Entity } from "../../../Entities";
import { Commands, Conversions } from "../../../Constants";

interface ICharicterGrid {
  gridData: number[][][];
  callbacks: any;
  flipX?: boolean;
}
export const CharicterGrid: FC<ICharicterGrid> = ({
  gridData,
  callbacks,
  flipX = false
}) => {
  const gridWrapperStyle = {
    display: "inline-block",
    width: "calc(64px * 12)",
    height: "calc(64px * 6)"
  };

  const gridRowStyle = {
    display: "block",
    width: "calc(64px * 12)",
    height: "64px"
  };

  const charItemStyle = {
    display: "inline-block",
    position: "relative",
    width: "64px",
    height: "64px",
    boxSizing: "border-box",
    outline: "1px solid rgba(200, 200, 200, 0.5)",
    outlineOffset: "-2px",
    "&:hover": {
      border: "1px solid white"
    }
  };

  const charItemSelectedStyle = {
    background: "rgba(255, 255, 255, 0.4)"
  };

  const getEntityFromId = (uID: number): Entity => {
    const entity = EntityCache.Alive.get(uID);
    return entity;
  };

  const handleCellClick = useCallback(
    (event) => {
      const target = parseInt(event.target.getAttribute("name"), 10);
      const point = Conversions.CellIdToPos(target);
      switch (callbacks.command.get) {
        case null: {
          const x = point.x;
          const y = point.y;
          //console.log(point);
          const entities = getEntityFromId(gridData[x][y][1]);
          if (!entities) {
            return;
          }
          callbacks.selectedCell.set(target);
          callbacks.selectedEntity.set(entities);
          break;
        }
        case Commands.Move: {
          if (
            callbacks.selectedEntity.get.uID === gridData[point.x][point.y][1]
          ) {
            return;
          }
          const origin = Conversions.CellIdToPos(callbacks.selectedCell.get);
          if (
            Math.abs(point.x - origin.x) > 1 ||
            Math.abs(point.y - origin.y) > 1
          ) {
            return;
          }
          callbacks.moveEntityOnGrid(
            callbacks.selectedEntity.get,
            Conversions.CellIdToPos(callbacks.selectedCell.get),
            point,
            true
          );
          callbacks.selectedCell.set(target);
          break;
        }
      }
    },
    [gridData, callbacks.command.get, callbacks.selectedEntity.get]
  );

  const getItems = (keyStart: number, y: number) => {
    const items = [];
    for (let x = 0; x < 12; x++) {
      const idx = keyStart + x;
      items.push(
        <Box
          sx={{
            ...charItemStyle,
            ...(idx === callbacks.selectedCell.get ? charItemSelectedStyle : {})
          }}
          name={idx}
          key={idx}
          onClick={handleCellClick}
        >
          {gridData[x][y][1] !== null && (
            <Box>
              <EntityOnGrid entity={getEntityFromId(gridData[x][y][1])} />
            </Box>
          )}
          {/* {!flipX && gridDataA[x][y] > -1 && (
            <Box>
              <EntityOnGrid
                flipX={flipX}
                entity={getEntityFromId(gridDataA[x][y])}
              />
            </Box>
          )}
          {!flipX && gridDataB[x][y] > -1 && (
            <Box>
              <EntityOnGrid
                flipX={!flipX}
                entity={getEntityFromId(gridDataB[x][y])}
              />
            </Box>
          )}
          {flipX && gridDataA[x + 6][y] > -1 && (
            <Box>
              <EntityOnGrid
                flipX={!flipX}
                entity={getEntityFromId(gridDataA[x + 6][y])}
              />
            </Box>
          )}
          {flipX && gridDataB[x + 6][y] > -1 && (
            <Box>
              <EntityOnGrid
                flipX={flipX}
                entity={getEntityFromId(gridDataB[x + 6][y])}
              />
            </Box>
          )} */}
        </Box>
      );
    }
    return items;
  };

  // {(flipX &&)||<Box sx={charItemStyle} key={keyStart + x}>
  //       {gridDataA[x][y] > -1 && !flipX && (

  //         )}
  //         {gridDataB[x][y] > -1 && flipX && (
  //           <Box>
  //             <EntityOnGrid
  //               flipX={flipX}
  //               entity={getEntityFromId(gridDataB[x][y])}
  //             />
  //           </Box>
  //         )}
  //       </Box>

  return (
    <Box sx={gridWrapperStyle}>
      <Box sx={gridRowStyle}>{getItems(0, 0)}</Box>
      <Box sx={gridRowStyle}>{getItems(12, 1)}</Box>
      <Box sx={gridRowStyle}>{getItems(24, 2)}</Box>
      <Box sx={gridRowStyle}>{getItems(36, 3)}</Box>
      <Box sx={gridRowStyle}>{getItems(48, 4)}</Box>
      <Box sx={gridRowStyle}>{getItems(60, 5)}</Box>
    </Box>
  );
};
