import { World } from "./World";
import { Render } from "./Render";
import { Entity } from "./Entity";
import { ClassTypes } from "./Constants";
import {
  StateManager,
  State_Loading,
  State_PreGame,
  State_GameRunning
} from "./States";

export class Core {
  static Instance: Core;
  private _startedOn: number;
  private _world: World;
  get world(): World {
    return this._world;
  }

  private _render: Render;
  private _stateManager: StateManager;

  get currentStateName(): string | null {
    return this._stateManager.currentStateName;
  }

  public setState(stateName: string): void {
    this._stateManager.setState(stateName);
  }

  public paused: boolean = false;

  constructor() {
    Core.Instance = this;
    this._startedOn = Date.now();
    this._world = new World(this);
    this._render = new Render(this);
    this._stateManager = new StateManager(this);
    this._setupGameStates();

    this.setState("Loading");
  }

  _setupGameStates() {
    this._stateManager.initState({
      name: "Loading",
      onInit: State_Loading.onInit
    });
    this._stateManager.initState({
      name: "PreGame",
      onEnter: State_PreGame.onEnter
    });
    this._stateManager.initState({
      name: "GameRunning",
      onEnter: State_GameRunning.onEnter,
      onUpdate: State_GameRunning.onUpdate
    });
  }

  update(delta: number) {
    if (this?._stateManager?.update) {
      this._stateManager.update(delta);
    }
  }

  createNewEntityFromClassName(
    name: string,
    className: string,
    metadata: any = {}
  ): Entity {
    const classData = ClassTypes[className];
    if (classData) {
      const props = { name, classData };
      const entity = Entity.CreateNewAndAddToCache(props, metadata);
      return entity;
    }
    return null;
  }

  registerView(canvasRef) {}
  getRender(): Render {
    return this._render;
  }
}
