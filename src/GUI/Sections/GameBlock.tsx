import { FC, useRef, useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import { TitleScreen } from "./TitleScreen";
import { PreGame } from "./PreGame";
import { GameRun } from "./GameRun";
import { Core, Entity } from "../../Core";

const fixedSize = { w: 800, h: 1140 };

interface IGameBlock {
  core: Core;
  callbacks: IGameBlockCallbacks;
}

interface IGameBlockCallbacks {
  setBackgroundZone: (zoneName: string) => void;
}

export const GameBlock: FC<IGameBlock> = ({ core, callbacks }) => {
  /*UPDATE GAME STATE*/
  const [coreState, updateCoreState] = useState<string>(
    core.currentStateName || "Loading"
  );

  const setCoreState = useCallback(
    (newState: string) => {
      updateCoreState(newState);
      core.setState(newState);
    },
    [core]
  );
  /*---------------*/
  /*PreGame PickClassUpdates*/
  const pickClassClick = useCallback(
    (name: string, className: string) => {
      setCoreState("GameRunning");
      const entity = core.createNewEntityFromClassName(name, className, {
        dynamic: Entity.ClassDynamic.Self
      });
    },
    [core, setCoreState]
  );
  /*---------------*/

  const wrapRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const ref = wrapRef && wrapRef.current;
    if (ref) {
      ref.style.left = "50%";
      ref.style.top = "50%";
      const rect = ref.getBoundingClientRect();
      ref.style.marginLeft = `-${rect.width * 0.5}px`;
      ref.style.marginTop = `-${rect.height * 0.5}px`;
    }
  }, []);

  const wrapperStyle = {
    position: "relative",
    width: `${fixedSize.w}px`,
    height: `${fixedSize.h}px`,
    transformOrigin: "top left"
  };

  return (
    <Box id="game-wrapper" sx={wrapperStyle} ref={wrapRef}>
      {coreState === "Loading" && (
        <>
          <TitleScreen setCoreState={setCoreState} />
        </>
      )}
      {coreState === "PreGame" && (
        <>
          <PreGame callbacks={{ pickClassClick }} />
        </>
      )}
      {coreState === "GameRunning" && (
        <>
          <GameRun
            callbacks={{ setBackgroundZone: callbacks.setBackgroundZone }}
          />
        </>
      )}
    </Box>
  );
};
