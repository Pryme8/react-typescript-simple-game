import { Nullable } from "@babylonjs/core";
import BackgroundsA from "./Files/BackgroundsA.png";

export interface ISpriteSheet {
  name: string;
  url: string;
  cached?: Nullable<HTMLImageElement>;
  cellCountX: number;
  cellCountY: number;
  cellSizeX: number;
  cellSizeY: number;
  cellOffsetX: number;
  cellOffsetY: number;
}

export class SpriteSheets {
  static BackgroundsA: ISpriteSheet = {
    name: "BackgroundsA",
    url: BackgroundsA,
    cached: null,
    cellCountX: 6,
    cellCountY: 14,
    cellSizeX: 240,
    cellSizeY: 170,
    cellOffsetX: 1,
    cellOffsetY: 1
  };
}

export const CheckForCachedSheetThen = (name: string, callback: () => void) => {
  const ss: any = SpriteSheets;
  if (ss[name].cached) {
    callback();
  } else {
    const image = new Image();
    image.src = ss[name].url;
    image.onload = () => {
      ss[name].cached = image;
      callback();
    };
  }
};
