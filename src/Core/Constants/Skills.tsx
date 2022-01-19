export class SkillTypes {
  static PhysicalMelee: number = 0;
  static PhysicalRanged: number = 1;
  static MagicMelee: number = 2;
  static MagicRanged: number = 3;
}

interface IPoint {
  x: number;
  y: number;
}

export class SkillArea {
  static Types = {
    Point: 0,
    LineHorizontal: 1,
    LineVertical: 2,
    Box: 3,
    Ring: 4,
    Cross: 5,
    TShape: 6,
    Custom: 7
  };

  public GetSkillAreaFromObject(data: any): SkillArea {
    const skillArea = new SkillArea(data.area, data.areaProps);
    return skillArea;
  }
  constructor(public type: number, private _props: any) {}
}
