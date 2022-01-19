import { FC, useState } from "react";
import { Box } from "@mui/material";
import { BJSRender } from "../../../BJSRender";

import { CharicterGrid } from "./CharicterGrid";

interface IBattleGround {
  // gridData: number[][][];
  callbacks: any;
}
export const BattleGround: FC<IBattleGround> = ({ callbacks }) => {
  // const [selectedCell, setSelectedCell] = useState<number>(-1);

  const style = {
    display: "block",
    position: "absolute",
    color: "white",
    left: "50%",
    top: "30%",
    width: "100%",
    transformOrigin: "left top",
    transform: "translate(-50%, 0)",
    //   "perspective(1000px) rotateX(32deg) scale(0.825) translate(-50%, 0)",
    userSelect: "none"
  };

  return <BJSRender sx={style} sceneName={"BattleField"} />;
};
