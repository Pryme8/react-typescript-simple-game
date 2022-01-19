import { FC, useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { Core, Scenes } from "../../Core";

import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3
} from "@babylonjs/core";
interface IBJSRender {
  sceneName: string;
  sx: any;
}

export const BJSRender: FC<any> = ({ sceneName, sx }) => {
  const [ready, setReady] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ref = canvasRef?.current;
    if (ref) {
      Core.Instance.getRender().registerView(ref);
    }
  }, [canvasRef]);

  useEffect(() => {
    const engine = Core.Instance.getRender().getEngine();
    const canvas = canvasRef.current;
    if (engine) {
      const scene = new Scene(engine);
      Scenes[sceneName].onInit(scene);
      Core.Instance.getRender().registerScene(scene);
    }
  }, [sceneName]);

  const canvasStyle = {
    position: "absolute",
    outline: "none",
    left: 0,
    top: 0
  };

  return (
    <Box sx={{ ...sx }}>
      <canvas style={canvasStyle} ref={canvasRef}></canvas>
    </Box>
  );
};
