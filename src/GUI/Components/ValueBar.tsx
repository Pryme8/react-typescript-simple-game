import { FC } from "react";
import { Box } from "@mui/material";

interface IValueBar {
  value: number;
  max: number;
  wrapperOutline?: string;
  wrapperBackground?: string;
  barOutline?: string;
  barBackground: string;
  style?: any;
}
export const ValueBar: FC<IValueBar> = ({
  value,
  max,
  wrapperOutline,
  wrapperBackground,
  barOutline,
  barBackground,
  style
}) => {
  const wrapperStyle = {
    display: "block",
    overflow: "hidden"
  };

  const complete = (value / max) * 100;

  const barStyle = {
    position: "absolute",
    display: "block",
    left: 0,
    top: 0,
    width: `${complete.toFixed(1)}%`,
    height: "100%"
  };

  return (
    <Box
      sx={{
        position: "absolute",
        ...style,
        border: wrapperOutline,
        backgroundColor: wrapperBackground,
        ...wrapperStyle
      }}
    >
      <Box
        sx={{
          border: barOutline,
          backgroundColor: barBackground,
          ...barStyle
        }}
      ></Box>
    </Box>
  );
};
