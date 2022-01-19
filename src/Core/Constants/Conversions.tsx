export class Conversions {
  static CellIdToPos = (id: number): any => {
    const y = Math.floor(id / 12);
    const x = id - y * 12;
    const point = { x, y };
    return point;
  };
}
