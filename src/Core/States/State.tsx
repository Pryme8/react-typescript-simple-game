import { Nullable } from "@babylonjs/core";
import { StateManager } from "./StateManager";

export interface IState {
  name: string;
  onInit?: (self: State) => void;
  onEnter?: (self: State, lastState: State) => void;
  onUpdate?: (delta: number, self: State) => void;
  onLeave?: (self: State) => void;
}
export class State {
  get name() {
    return this._props.name;
  }
  get manager() {
    return this._manager;
  }

  static SharedProps: any = {};

  get onInit(): Nullable<(self: State) => void> {
    return this._props?.onInit ?? null;
  }
  get onEnter(): Nullable<(self: State, lastState: State) => void> {
    return this._props?.onEnter ?? null;
  }
  get onUpdate(): Nullable<(delta: number, self: State) => void> {
    return this._props?.onUpdate ?? null;
  }
  get onLeave(): Nullable<(self: State) => void> {
    return this._props?.onLeave ?? null;
  }

  constructor(private _props: IState, private _manager: StateManager) {}
}
