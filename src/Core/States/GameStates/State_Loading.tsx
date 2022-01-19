import { State } from "../State";

export class State_Loading {
  static onInit(state: State) {
    console.log("Loading Stuff...");
    console.log(state);
  }
  // static onEnter(self: State) {}
  // static onUpdate(delta: number, self: State) {}
}
