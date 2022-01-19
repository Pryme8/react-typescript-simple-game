import { Engine, Nullable, Scene, Vector2 } from "@babylonjs/core";
import { Core } from "../Core";

/*Only handles rendering a temporary canvas of 3d elements that might be used*/
export class Render {
  static Instance: Render;
  get core(): Core {
    return this._core;
  }
  private _canvas: HTMLCanvasElement;
  private _engine: Engine;
  private _fixedRenderSize: Vector2 = new Vector2(800, 600);
  private _registeredView: Nullable<HTMLCanvasElement> = null;
  //private _registeredCanvas: Nullable<HTMLCanvasElement> = null;
  private _currentScene: Nullable<Scene> = null;
  constructor(private _core: Core) {
    this._canvas = this._createHiddenCanvas();
    this._engine = this._createEngine();
    this._startGameLoop();
  }
  private _fixedRatioStyleUpdate(): void {
    /*TODO*/
  }
  private _createHiddenCanvas(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", `hidden-canvas`);
    canvas.width = this._fixedRenderSize.x;
    canvas.height = this._fixedRenderSize.y;
    this._fixedRatioStyleUpdate();
    return canvas;
  }

  private _createEngine(): Engine {
    const engine = new Engine(this._canvas, true, {
      preserveDrawingBuffer: false
    });
    return engine;
  }

  private _startGameLoop() {
    this._engine.runRenderLoop(() => {
      const delta = this._engine.getDeltaTime();
      this.core.update(delta);
      if (this._registeredView && this._currentScene) {
        this._currentScene.render();
        //console.log("tick");
      }
    });
  }

  public registerView(canvas: HTMLCanvasElement) {
    canvas.width = this._fixedRenderSize.x;
    canvas.height = this._fixedRenderSize.y;
    if (this._registeredView) {
      this._engine.unRegisterView(canvas);
    }
    this._engine.registerView(canvas);
    this._registeredView = canvas;
    this._engine.inputElement = canvas;
  }
  public registerScene(scene: Scene) {
    this._currentScene = scene;
  }
  public getEngine(): Engine {
    return this._engine;
  }
}
