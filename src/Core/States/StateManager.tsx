import { Nullable } from "@babylonjs/core";
import { Core, State, IState } from "../";
export class StateManager {
  private _states: any = {};
  get states() {
    return this._states;
  }
  private _currentState: Nullable<State> = null;
  get currentState(): Nullable<State> {
    return this._currentState;
  }

  get core(): Core {
    return this._core;
  }

  constructor(private _core: Core) {}

  public initState(props: IState) {
    const state = new State(props, this);
    if (state.onInit) {
      state.onInit(state);
    }
    this.states[state.name] = state;
  }

  public setState(name: string) {
    const prevState = this.currentState;
    if (prevState) {
      if (prevState.name === name) {
        return;
      }

      if (prevState.onLeave) {
        prevState.onLeave(prevState);
      }
    }

    const nextState = this.states[name];

    this._currentState = nextState;

    if (nextState.onEnter) {
      nextState.onEnter(nextState, prevState || null);
    }
  }

  public get currentStateName(): string | null {
    return this.currentState?.name || null;
  }

  public update(delta: number): void {
    if (this?.currentState?.onUpdate) {
      this.currentState.onUpdate(delta, this.currentState);
    }
  }
}
