import { Core } from "../Core";
import { Zones, IZone } from "./Zones";
import { RNG } from "./RNG";
import { Run } from "../Run";

export class World {
  static Instance: World;
  get core(): Core {
    return this._core;
  }
  private _zoneWeights: any = [];
  private _rng: () => number;

  get randomNumber(): number {
    return this._rng();
  }

  static GetRandomNumber(): number {
    return World.Instance.randomNumber;
  }

  public initialZone!: IZone;

  constructor(private _core: Core) {
    World.Instance = this;
    this._rng = RNG("DifferentSeed");
    this._cacheZoneWeights();
  }

  private _cacheZoneWeights() {
    let totalWeight = 0;
    const fractionalWeights: any[][] = [];
    const keys = Object.keys(Zones);
    const typeData: any = Zones;
    keys.forEach((key: any) => {
      totalWeight += typeData[key].spawnWeight;
    });
    let influcnce = 0;
    keys.forEach((key) => {
      influcnce = typeData[key].spawnWeight / totalWeight;
      fractionalWeights.push([key, influcnce]);
    });

    const sortedWeights = fractionalWeights.sort((a, b) => {
      return a[1] - b[1];
    });

    let weightRange = 0;

    sortedWeights.forEach((zoneWeight) => {
      weightRange += zoneWeight[1];
      this._zoneWeights.push([zoneWeight[0], weightRange]);
    });

    this.initialZone = this.getRandomZone();
    console.log(this);
  }

  getRandomZone(excludedZones: string[] = []) {
    const s = World.GetRandomNumber();
    let i = 0;
    let zone: [string, number] | boolean = false;
    while (i < this._zoneWeights.length && zone === false) {
      const a = i === 0 ? 0 : this._zoneWeights[i - 1][1];
      const b =
        i !== this._zoneWeights.length - 1
          ? this._zoneWeights[i][1]
          : Number.POSITIVE_INFINITY;
      if (s > a && s < b) {
        zone = this._zoneWeights[i];
      }
      i++;
    }
    return (Zones as any)[zone[0]];
  }

  getNewZoneForRun(run: Run) {
    const zone = this.getRandomZone();
    run.zones.last = run.zones.current;
    run.zones.current = run.zones.next;
    run.zones.next = zone;
  }
}
