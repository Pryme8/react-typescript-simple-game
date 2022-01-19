import { FC, useState, useEffect, useRef, useCallback } from "react";
import { Box } from "@mui/material";
import { BattleGround } from "./BattleGround";
import { TurnTimer } from "./TurnTimer";
import { ExplorationDisplay } from "./ExplorationDisplay";
import { TimeInfoBar } from "./TimeInfoBar";
import { BottomPanel } from "./BottomPanel";
import { Entity, EntityCache } from "../../Entities";
import { EnemyTypes } from "../../../Constants";

import { State_GameRunning } from "../../../Core";

const GameStates = {
  Paused: 0,
  Running: 1,
  Combat: 2
};

const GridIdentity: number[][][] = [
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ],
  [
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1],
    [0, -1, -1]
  ]
];

const GlobalTurnTime = 10000; //10 Mins = 10 seconds

interface IGameRun {
  callbacks: IGameRunCallbacks;
}

interface IGameRunCallbacks {
  setBackgroundZone: (zoneName: string) => void;
}
interface ITimeValues {
  time: number;
  delta: number;
  turnTime: number;
  distanceTraveled: number;
  distanceToNextZone: number;
  startedLastZoneAt: number;
}

interface IZoneValues {
  current: string;
  next: string;
  last: string;
}

export const GameRun: FC<IGameRun> = ({ callbacks }) => {
  const [time, setTime] = useState<ITimeValues>({
    time: 0,
    delta: 0,
    turnTime: 0,
    distanceTraveled: 0,
    distanceToNextZone: 0,
    startedLastZoneAt: 0
  });
  const reactSetTimeAndDistance = useCallback(
    (
      _delta: number,
      _time: number,
      _turnTime: number,
      _distanceTraveled: number,
      _distanceToNextZone: number,
      _startedLastZoneAt: number
    ) => {
      setTime({
        time: _time,
        delta: _delta,
        turnTime: _turnTime,
        distanceTraveled: _distanceTraveled,
        distanceToNextZone: _distanceToNextZone,
        startedLastZoneAt: _startedLastZoneAt
      });
    },
    []
  );
  useEffect(() => {
    State_GameRunning.SharedProps.reactSetTimeAndDistance = reactSetTimeAndDistance;
  }, [reactSetTimeAndDistance]);

  const [zones, setZones] = useState<IZoneValues>({
    current: "",
    next: "",
    last: ""
  });

  const reactSetZones = useCallback(
    (_current: string, _next: string, _last: string) => {
      //console.log(_current, _next, _last);
      setZones({
        current: _current,
        next: _next,
        last: _last
      });
      callbacks.setBackgroundZone(_current);
    },
    []
  );
  useEffect(() => {
    State_GameRunning.SharedProps.reactSetZones = reactSetZones;
  }, [reactSetZones]);

  const [selectedEntityValue, setSelectedEntityValue] = useState<number>(-1);

  const reactSetSelectedEntity = useCallback(
    (_uID: number) => {
      setSelectedEntityValue(_uID);
    },
    [setSelectedEntityValue]
  );
  useEffect(() => {
    State_GameRunning.SharedProps.reactSetSelectedEntity = reactSetSelectedEntity;
  }, [reactSetZones]);

  // const [gameState, setGameState] = useState<number>(GameStates.Combat);
  // const [time, setTime] = useState<number>(0);
  // const [deltaTime, setDeltaTime] = useState<number>(0);

  // const [currentDistanceTraveled, setCurrentDistanceTraveled] = useState<
  //   number
  // >(0);

  // const [currentDistanceToNextZone, setCurrentDistanceToNextZone] = useState<
  //   number
  // >(50);

  // const [stepTime, setStepTime] = useState<number>(0);

  // const [startedLastZoneAt, setStartedLastZoneAt] = useState<number>(0);

  // //[x][y][selectionLayer:0|1, entityLayer:-1|number, effectLayer:-1|number]
  // const [gridData, setGridData] = useState<number[][][]>(
  //   GridIdentity.map((grid) => grid)
  // );

  // const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  // const [currentCommand, setCurrentCommand] = useState<string | null>(null);

  // const placeEntityOnGrid = (entity: Entity, x: number, y: number) => {
  //   const _newGrid = gridData;
  //   if (_newGrid[x][y][1] === -1) {
  //     //Empty Space
  //     entity.metadata.gridPosition = { x, y };
  //     _newGrid[x][y][1] = entity.uID;
  //     setGridData(_newGrid);
  //   }
  // };

  // const moveEntityOnGrid = useCallback(
  //   (
  //     entity: Entity,
  //     from: { x: number; y: number },
  //     to: { x: number; y: number },
  //     isOnPlayerGrid: boolean
  //   ) => {
  //     if (typeof entity === "number") {
  //       entity = EntityCache.Alive.get(entity);
  //     }
  //     if (entity) {
  //       if (isOnPlayerGrid) {
  //         console.log(entity, from, to, gridData);
  //         const grid: number[][][] = gridData;
  //         grid[from.x][from.y][1] = -1;
  //         grid[to.x][to.y][1] = entity.uID;
  //         setGridData(grid);
  //         setCurrentCommand(null);
  //       }
  //     }
  //   },
  //   [gridData]
  // );

  // useEffect(() => {
  //   placeEntityOnGrid(playerEntity, 0, 3);
  //   const firstSlime = Entity.CreateNewAndAddToCache(
  //     {
  //       name: "Slime",
  //       classData: EnemyTypes.Slime
  //     },
  //     {
  //       dynamic: Entity.ClassDynamic.Hostile
  //     }
  //   );
  //   placeEntityOnGrid(firstSlime, 11, 2);
  // }, []);

  // const updateDistance = useCallback(
  //   (delta: number) => {
  //     if (gameState !== GameStates.Running) {
  //       return;
  //     }
  //     const speed = playerEntity.classData?.stats.sp ?? 0;
  //     const stepDelta = delta / GlobalTurnTime;
  //     setCurrentDistanceTraveled((lastDistance: number) => {
  //       return lastDistance + speed * stepDelta;
  //     });
  //   },
  //   [gameState, playerEntity.classData?.stats.sp]
  // );

  // const updateEntities = useCallback(
  //   (delta: number) => {
  //     if (gameState == GameStates.Paused) {
  //       return;
  //     }
  //     EntityCache.Alive.forEach((entity: Entity, uID: number) => {
  //       entity.update(delta);
  //     });
  //   },
  //   [gameState]
  // );

  // useEffect(() => {
  //   const startedOn: number = Date.now(); //Date.now();
  //   let lastFrame = startedOn;

  //   const update = (_now: number) => {
  //     if (gameState === GameStates.Paused) {
  //       return;
  //     }
  //     const now = Date.now();
  //     const delta = now - lastFrame;
  //     let newTime = 0;
  //     setTime((lastTime) => {
  //       const nt = lastTime + delta;
  //       newTime = nt;
  //       return nt;
  //     });
  //     setDeltaTime(delta);
  //     setStepTime(newTime / GlobalTurnTime);
  //     lastFrame = now;
  //     updateDistance(delta);
  //     updateEntities(delta);
  //     return requestAnimationFrame(update);
  //   };

  //   const loop = requestAnimationFrame(update);
  //   return () => cancelAnimationFrame(loop);
  // }, []);

  const wrapperStyle = {
    display: "block",
    position: "absolute",
    padding: "0.4em",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  };

  return (
    <Box id={"game-wrapper"} sx={wrapperStyle}>
      <TurnTimer turnTime={time.turnTime} />
      <ExplorationDisplay
        distanceTraveled={time.distanceTraveled}
        distanceToNextZone={time.distanceToNextZone}
        startedLastZoneAt={time.startedLastZoneAt}
        currentZone={zones.current}
        nextZone={zones.next}
        lastZone={zones.last}
      />
      <TimeInfoBar
        time={time.time}
        distance={time.distanceTraveled}
        turnTime={time.turnTime}
      />
      <BattleGround callbacks={{}} />
      <BottomPanel
        selectedEntityValue={selectedEntityValue}
        callbacks={
          {
            //command: { get: currentCommand, set: setCurrentCommand }
          }
        }
      />
    </Box>
  );
};
