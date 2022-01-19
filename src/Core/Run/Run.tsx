import { Nullable } from "@babylonjs/core";
import { World, IZone } from "../World";

export class Run {
  public runStartedOn: number = 0;
  public time: number = 0;
  public delta: number = 0;
  public turnTime: number = 0;
  public distanceTraveled: number = 0;
  public startedLastZoneAt: number = 0;
  public distanceToNextZone: number = 4;

  private _distanceFactor: number = 1.345;

  public zones: {
    last: Nullable<IZone>;
    current: Nullable<IZone>;
    next: Nullable<IZone>;
  } = {
    last: null,
    current: null,
    next: null
  };

  constructor() {
    this.runStartedOn = Date.now();
    this.zones.current = World.Instance.getRandomZone();
    this.zones.last = this.zones.current;
    this.zones.next = World.Instance.getRandomZone();
  }

  goToNewZone() {
    World.Instance.getNewZoneForRun(this);
    this.startedLastZoneAt = this.distanceToNextZone;
    this.distanceToNextZone += this.distanceToNextZone * this._distanceFactor;
  }
}
