import { EntityCache } from "../Entity";
import { Globals } from "./";

export class Utilities {
  static CalculatePartyMovementSpeed(delta: number) {
    const party = EntityCache.GetCurrentParty();
    let minSpeed = Number.MAX_VALUE;
    if (party.length) {
      party.forEach((entity) => {
        minSpeed = Math.min(minSpeed, entity.classData?.stats.sp || minSpeed);
      });
    } else {
      minSpeed = 0;
    }

    return (delta / Globals.TurnTime) * minSpeed;
  }
}
