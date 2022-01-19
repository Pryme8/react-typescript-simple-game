import { FC } from "react";
import { Box } from "@mui/material";
import { PersonSprite } from "../../../../Components";
import { Entity } from "../../../../Entities";
import { Styles } from "../../../../Constants";

interface ILeftPanel {
  entity: Entity;
}

export const LeftPanel: FC<ILeftPanel> = ({ entity }) => {
  const portraitStyle = {
    position: "relative",
    border: "1px solid black",
    left: 16,
    top: 12,
    height: "120px",
    width: "120px",
    borderRadius: 1
  };

  const portraitSpriteStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%) scale(1.6)"
  };

  const nameStyle = {
    ...{
      position: "absolute",
      left: 48,
      top: 135,
      textAlign: "center"
    },
    ...Styles.WhiteTextBlackOutline
  };

  const labelAndValueBlockStyle = {
    ...{
      whitespace: "nowrap",
      fontSize: "10px",
      position: "absolute",
      textAlign: "left"
    },
    ...Styles.WhiteTextBlackOutline
  };

  const labelStyle = {
    position: "relative",
    textAlign: "right",
    display: "inline-block",
    paddingRight: "1em",
    width: "32px"
  };

  const valueStyle = {
    position: "relative",
    textAlign: "right",
    display: "inline-block",
    float: "right",
    overflow: "hidden"
  };

  const levelBlockStyle = {
    ...labelAndValueBlockStyle,
    ...{
      left: 20,
      top: 156,
      width: "120px"
    }
  };

  const expBlockStyle = {
    ...labelAndValueBlockStyle,
    ...{
      left: 20,
      top: 168,
      width: "120px"
    }
  };

  const apBlockStyle = {
    ...labelAndValueBlockStyle,
    ...{
      left: 150,
      top: 18,
      width: "120px"
    }
  };
  const hpBlockStyle = {
    ...labelAndValueBlockStyle,
    ...{
      left: 150,
      top: 30,
      width: "120px"
    }
  };
  const mpBlockStyle = {
    ...labelAndValueBlockStyle,
    ...{
      left: 150,
      top: 42,
      width: "120px"
    }
  };
  return (
    <>
      <Box sx={portraitStyle}>
        {entity && (
          <PersonSprite
            sx={portraitSpriteStyle}
            spriteId={entity.classData.spriteId}
          />
        )}
      </Box>
      <Box sx={nameStyle}>{entity && entity.name}</Box>
      <Box sx={levelBlockStyle}>
        <Box sx={labelStyle}>LEVEL</Box>
        <Box sx={valueStyle}>{entity && entity.classData.stats.l}</Box>
      </Box>
      <Box sx={expBlockStyle}>
        <Box sx={labelStyle}>EXP</Box>
        <Box sx={valueStyle}>
          {entity &&
            `${entity.classData.stats.e[0].toFixed(
              0
            )}:${entity.classData.stats.e[1].toFixed(0)}`}
        </Box>
      </Box>
      <Box sx={apBlockStyle}>
        <Box sx={labelStyle}>AP</Box>
        <Box sx={valueStyle}>
          {entity &&
            `${entity.classData.stats.ap[0].toFixed(
              0
            )}:${entity.classData.stats.ap[1].toFixed(0)}`}
        </Box>
      </Box>
      <Box sx={hpBlockStyle}>
        <Box sx={labelStyle}>HP</Box>
        <Box sx={valueStyle}>
          {entity &&
            `${entity.classData.stats.hp[0].toFixed(
              0
            )}:${entity.classData.stats.hp[1].toFixed(0)}`}
        </Box>
      </Box>
      <Box sx={mpBlockStyle}>
        <Box sx={labelStyle}>MP</Box>
        <Box sx={valueStyle}>
          {entity &&
            `${entity.classData.stats.mp[0].toFixed(
              0
            )}:${entity.classData.stats.mp[1].toFixed(0)}`}
        </Box>
      </Box>
    </>
  );
};
