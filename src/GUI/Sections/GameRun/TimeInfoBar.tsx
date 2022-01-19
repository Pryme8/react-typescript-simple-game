import { FC } from "react";
import { Box, Grid } from "@mui/material";
import { Modal } from "../../Components";

interface ITimeInfoBar {
  time: number;
  distance: number;
  turnTime: number;
}

export const TimeInfoBar: FC<ITimeInfoBar> = ({ time, distance, turnTime }) => {
  const wrapperStyle = {
    display: "block",
    position: "absolute",
    left: "3px",
    top: "141px",
    width: "calc(100% - 6px)",
    height: "42px"
  };

  const modalStyle = {
    display: "block",
    position: "relative",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    fontSize: "16px",
    boxSizing: "border-box",
    padding: "0em 1em"
  };

  const barStyle = {
    display: "block",
    position: "absolute",
    width: "100%"
  };

  const barWrapperStyle = {
    backgroundColor: "rgba(180, 120, 20, 0.86)",
    left: 16,
    top: 6,
    bottom: 6,
    right: 16,
    border: "1px solid rgba(180, 100, 180, 0.86)",
    borderRadius: "6px"
  };

  const textStyle = {
    display: "inline-block",
    textAlign: "left"
  };

  return (
    <Box sx={wrapperStyle}>
      <Modal sx={modalStyle}>
        <Grid container spacing={1.5}>
          <Grid item xs={3}>
            <Box>
              <Box sx={textStyle}>Time:</Box>
              <Box sx={textStyle}>{Math.floor(time * 0.001)}</Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box></Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Box sx={textStyle}>Distance:</Box>
              <Box sx={textStyle}>{distance.toFixed(2)}</Box>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </Box>
  );
};
