import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Entity } from "../../../Entities";
import { PersonSprite, ValueBar } from "../../../Components";

interface IEntityOnGrid {
  entity: Entity;
}
export const EntityOnGrid: FC<IEntityOnGrid> = ({ entity }) => {
  const wrapperStyle = {
    position: "absolute",
    fontSize: "8px",
    width: "64px",
    height: "64px",
    top: 0,
    left: 0,
    pointerEvents: "none"
  };

  const barBlockStyle = {
    left: 6,
    top: "100%",
    right: 6,
    position: "absolute",
    height: "6px",
    marginTop: "-8px"
  };

  const barWrapperStyle = {
    backgroundColor: "rgba(180, 120, 20, 0.86)",
    position: "relative",
    width: "52px",
    height: "3px",
    border: "1px solid rgba(180, 100, 180, 0.86)",
    borderRadius: "1px"
  };

  const [flipX, setFlipX] = useState<boolean>(false);
  useEffect(() => {
    if (entity) {
      setFlipX(() => {
        return entity.classDynamic === Entity.ClassDynamic.Hostile;
      });
    }
  }, [entity]);

  return (
    <>
      <Box
        sx={{
          ...wrapperStyle,
          transform: "perspective(2000px) rotateX(-40deg)"
        }}
      >
        {entity?.classData?.spriteId && (
          <PersonSprite spriteId={entity.classData.spriteId} flipX={flipX} />
        )}
      </Box>
      <Box sx={wrapperStyle}>
        {entity && (
          <Box sx={barBlockStyle}>
            <ValueBar
              style={barWrapperStyle}
              value={entity.actionPoints}
              max={entity.actionPointsMax}
              barBackground={"rgba(255, 200, 120, 0.85)"}
              wrapperBackground={"rgba(120, 80, 30, 0.5)"}
            />
            <ValueBar
              style={barWrapperStyle}
              value={entity.healthPoints}
              max={entity.healthPointsMax}
              barBackground={"rgba(255, 0, 0, 0.85)"}
              wrapperBackground={"rgba(200, 0, 0, 0.5)"}
            />
            <ValueBar
              style={barWrapperStyle}
              value={entity.magicPoints}
              max={entity.magicPointsMax}
              barBackground={"rgba(20, 20, 255, 0.85)"}
              wrapperBackground={"rgba(0, 0, 200, 0.5)"}
            />
          </Box>
        )}
      </Box>
    </>
  );
};
