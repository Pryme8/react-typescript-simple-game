import { FC } from "react";
import { Box } from "@mui/material";
import { Modal } from "../../../Components";
import { RightPanel, LeftPanel } from "./SubPanels";

interface IBottomPanel {
  selectedEntityValue: number | null;
  callbacks: any;
}

export const BottomPanel: FC<IBottomPanel> = ({
  selectedEntityValue,
  callbacks
}) => {
  const wrapperStyle = {
    display: "block",
    position: "absolute",
    left: "3px",
    bottom: "32px",
    width: "calc(100% - 6px)",
    height: "200px"
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
    padding: "0.3em 0.5em",
    background: "transparent"
  };

  const leftPanelStyle = {
    position: "absolute",
    left: -4,
    top: 0,
    width: "calc(35% + 9px)",
    height: "100%"
  };

  const rightPanelStyle = {
    position: "absolute",
    right: -4,
    top: 0,
    width: "65%",
    height: "100%"
  };

  return (
    <Box sx={wrapperStyle}>
      <Modal sx={modalStyle}>
        <Modal sx={leftPanelStyle}>
          {/* <LeftPanel entity={selectedEntityValue} /> */}
        </Modal>
        <Modal sx={rightPanelStyle} contentStyle={{ width: "100%" }}>
          {/* <RightPanel entity={selectedEntityValue} callbacks={callbacks} /> */}
        </Modal>
      </Modal>
    </Box>
  );
};
