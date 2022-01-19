import { FC } from "react";
import { Box } from "@mui/material";
import { Modal, ValueBar } from "../../Components";

interface ITurnTimer {
  turnTime: number;
}
export const TurnTimer: FC<ITurnTimer> = ({ turnTime }) => {
  const wrapperStyle = {
    display: "block",
    position: "absolute",
    left: "3px",
    top: "3px",
    width: "calc(100% - 6px)",
    height: "32px"
  };

  const modalStyle = {
    display: "block",
    position: "relative",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
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
    borderRadius: "6px",
    position: "absolute"
  };

  return (
    <Box sx={wrapperStyle}>
      <Modal sx={modalStyle}>
        <ValueBar
          style={barWrapperStyle}
          value={turnTime % 1}
          max={1}
          barBackground={"rgba(200, 160, 60, 0.85)"}
        />
      </Modal>
    </Box>
  );
};
