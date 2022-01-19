import { State } from "../State";

export class State_PreGame {
  static onEnter(self: State, prevState: State) {
    console.log("PreGame");
    console.log(self);
  }
  // static onEnter(self: State) {}
  // static onUpdate(delta: number, self: State) {}
}
