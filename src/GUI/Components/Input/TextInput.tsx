import { FC } from "react";
import { Box, Input } from "@mui/material";
interface ITextInput {
  label?: string;
  value?: string;
  labelSx?: any;
  textBoxSx?: any;
  id?: string;
  sx?: any;
}
export const TextInput: FC<ITextInput> = ({
  label,
  labelSx,
  textBoxSx,
  value,
  id,
  sx
}) => {
  const wrapStyle = {
    ...{
      position: "relative",
      overflow: "hidden",
      minHeight: "16px",
      boxSizing: "border-box",
      //pointerEvents: "none",
      lineHeight: "16px"
    },
    ...sx
  };

  const labelStyle = {
    ...{
      userSelect: "none",
      color: "lightGray",
      display: "inline-block",
      marginRight: "6px"
    },
    ...labelSx
  };

  const textBoxStyle = {
    ...{
      fontSize: "0.65em",
      background: "white",
      display: "inline-block",
      position: "relative",
      borderRadius: "3px"
    },
    ...textBoxSx
  };

  const inputStyle = {
    ...{
      paddingLeft: "6px"
    }
  };

  // const hoverStyle = {
  //   "&:hover .buttonCanvas": {
  //     transform: `translateY(calc(-${(1 / 3) * 100}% ))`
  //   },
  //   "&:active .buttonCanvas": {
  //     transform: `translateY(calc(-${(2 / 3) * 100}% ))`
  //   },
  //   "&:hover, &hover *": {
  //     color: "white"
  //   },
  //   "&:active, &active *": {
  //     color: "skyblue"
  //   }
  // };

  return (
    <Box sx={wrapStyle}>
      {label !== null && <Box sx={labelStyle}>{label}</Box>}
      <Box sx={textBoxStyle}>
        <Input sx={inputStyle} value={value} id={id} />
      </Box>
    </Box>
  );
};
