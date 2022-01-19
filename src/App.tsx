import { FC, useEffect, useRef, useState } from "react";
import "./styles.css";
import { Box } from "@mui/material";
import { GameBlock, Background } from "./GUI";

import { Core, World } from "./Core";

interface IApp {
  getCore: () => Core;
}

export const App: FC<IApp> = ({ getCore }) => {
  const core = getCore();
  const world = useRef<World>(core.world);

  useEffect(() => {
    globalThis.mouseButtonLeftDown = false;
    const setLeftButtonState = (e: any): void => {
      globalThis.mouseButtonLeftDown =
        e.buttons === undefined ? e.which === 1 : e.buttons === 1;
    };

    document.addEventListener("mousedown", setLeftButtonState);
    document.addEventListener("mousemove", setLeftButtonState);
    document.addEventListener("onmouseup", setLeftButtonState);
    return () => {
      document.removeEventListener("mousedown", setLeftButtonState);
      document.removeEventListener("mousemove", setLeftButtonState);
      document.removeEventListener("onmouseup", setLeftButtonState);
    };
  }, []);

  // const [currentState, setCurrentState] = useState<number>(States.TitleScreen);

  // const [currentZone, setCurrentZone] = useState<number>(10);
  // const [lastZone, setLastZone] = useState<number>(10);
  // const [nextZone, setNextZone] = useState<number>(2);

  // const [currentPlayerData, setCurrentPlayerData] = useState();

  // const [currentPlayerEntity, setCurrentPlayerEntity] = useState<Entity>();

  // const changeState = (state: number) => {
  //   setCurrentState(state);
  // };

  // const changeZone = (zone: number) => {
  //   setCurrentZone((prev) => {
  //     setLastZone(prev);
  //     return zone;
  //   });
  // };

  // const startGameClick = () => {
  //   changeZone(0);
  //   changeState(States.GameStart);
  // };

  // const pickClassClick = (classData: any) => {
  //   const newPlayerClassData: any = {
  //     name: currentPlayerData?.name || "Player",
  //     classData
  //   };
  //   setCurrentPlayerData(newPlayerClassData);
  //   const entity = Entity.CreateNewAndAddToCache(newPlayerClassData, {
  //     dynamic: Entity.ClassDynamic.Self
  //   });
  //   setCurrentPlayerEntity(entity);
  //   changeState(States.GameRun);
  // };

  const centerBlockStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden"
  };

  // const backgroundBlockStyle = {
  //   position: "absolute",
  //   left: 0,
  //   top: 0,
  //   width: "100%",
  //   height: "100%",
  //   overflow: "hidden"
  // };

  const [backgroundZone, setBackgroundZone] = useState<string>(
    world.current.initialZone.name
  );

  return (
    <div className="App">
      <Box sx={centerBlockStyle} id="background-block">
        <Background currentZoneName={backgroundZone} />
      </Box>
      <Box sx={centerBlockStyle} id="center-block">
        <GameBlock core={core} callbacks={{ setBackgroundZone }} />
      </Box>
    </div>
  );
};
