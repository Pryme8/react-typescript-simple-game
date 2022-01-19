export interface IZone {
  uID: number;
  name: string;
  spawnWeight: number;
  spriteSheet: string;
  spriteCellId: number;
}

export class Zones {
  static Planes: IZone = {
    uID: 0,
    name: "Planes",
    spawnWeight: 1,
    spriteSheet: "BackgroundsA",
    spriteCellId: 2
  };
  static Forest: IZone = {
    uID: 1,
    name: "Forest",
    spawnWeight: 1,
    spriteSheet: "BackgroundsA",
    spriteCellId: 4
  };
  static Swamp: IZone = {
    uID: 2,
    name: "Swamp",
    spawnWeight: 0.25,
    spriteSheet: "BackgroundsA",
    spriteCellId: 21
  };
  static Desert: IZone = {
    uID: 3,
    name: "Desert",
    spawnWeight: 0.35,
    spriteSheet: "BackgroundsA",
    spriteCellId: 0
  };
}
