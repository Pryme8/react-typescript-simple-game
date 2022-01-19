import { FC } from "react";
import { Modal, ButtonA } from "../../Components";
import { Box } from "@mui/material";
import { Core } from "../../../Core";

interface ITitleScreen {
  setCoreState: any;
}
export const TitleScreen: FC<ITitleScreen> = ({ setCoreState }) => {
  const startButtonClick = () => {
    console.log("startButtonClick");
    setCoreState("PreGame");
  };

  const modalStyle = {
    display: "block",
    position: "absolute",
    color: "white",
    padding: "0.4em",
    borderRadius: "0.1em",
    left: "50%",
    top: "50%",
    width: "200px",
    height: "140px",
    padding: "1em",
    transform: "translate(-50%, -50%)",
    textShadow:
      "rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px"
  };

  return (
    <Modal sx={modalStyle}>
      <Box sx={{ paddingBottom: "0.5em" }}>Welcome To a Game</Box>
      <ButtonA wrapSx={{ padding: "0.4em 0.2em" }} onClick={startButtonClick}>
        Start Game!
      </ButtonA>
    </Modal>
  );
};
