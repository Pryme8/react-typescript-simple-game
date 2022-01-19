import { Nullable } from "@babylonjs/core";
import { State } from "../";
import { Globals, Utilities } from "../../Constants";
import { Run } from "../../Run";

interface ISharedProps {
  run: Nullable<Run>;
  reactSetTimeAndDistance?: (
    delta: number,
    time: number,
    turnTime: number,
    distanceTraveled: number,
    distanceToNextZone: number,
    startedLastZoneAt: number
  ) => void;
  reactSetZones?: (current: string, next: string, last: string) => void;
  zoneCache: { current: string; next: string; last: string };
  reactSetSelectedEntity?: (uID: number) => void;
}

export class State_GameRunning {
  static SharedProps: ISharedProps = {
    run: null,
    zoneCache: { current: "", next: "", last: "" }
  };

  static onEnter(state: State) {
    const sp = State_GameRunning.SharedProps;
    const run = new Run();
    sp.run = run;
  }

  static onUpdate(delta: number, self: State_GameRunning) {
    const sp = State_GameRunning.SharedProps;

    if (sp.run && sp.reactSetTimeAndDistance) {
      sp.run.delta = delta;
      sp.run.time += delta;
      sp.run.turnTime = sp.run.time / Globals.TurnTime;
      const slowestPartyMemberSpeed = Utilities.CalculatePartyMovementSpeed(
        delta
      );

      sp.run.distanceTraveled += slowestPartyMemberSpeed;
      if (sp.run.distanceTraveled >= sp.run.distanceToNextZone) {
        sp.run.goToNewZone();
      }
      sp.reactSetTimeAndDistance(
        sp.run.delta,
        sp.run.time,
        sp.run.turnTime,
        sp.run.distanceTraveled,
        sp.run.distanceToNextZone,
        sp.run.startedLastZoneAt
      );
    }

    if (
      sp.run.zones.current.name !== sp.zoneCache.current ||
      sp.run.zones.next.name !== sp.zoneCache.next ||
      sp.run.zones.last.name !== sp.zoneCache.last
    )
      if (sp.reactSetZones) {
        sp.reactSetZones(
          sp.run.zones.current.name,
          sp.run.zones.next.name,
          sp.run.zones.last.name
        );
        sp.zoneCache.current = sp.run.zones.current;
        sp.zoneCache.next = sp.run.zones.next;
        sp.zoneCache.last = sp.run.zones.last;
      }
  }
}
