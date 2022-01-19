import { EntityCache } from "./";

export interface IEntity {
  uID?: number;
  name: string;
  classData?: IEntityClassData;
}

interface IEntityClassData {
  id: number;
  name: string;
  desc: string;
  spriteId: number;
  stats: IEntityClassDataStats;
  skills: any;
  equipment: any;
  items: any;
  levelUp: any;
}

interface IEntityClassDataStats {
  l: number; //level
  e: Array<number>; //exp
  hp: Array<number>; //health
  ap: Array<number>; //actionCounter
  mp: Array<number>; //magic
  hr: number; //healthRegen
  ar: number; //actionRegen
  mr: number; //magicRegen
  s: number; //strength
  d: number; //dexterity
  w: number; //wisdom
  pd: number; //phsyicalDefence
  md: number; //magicDefence
  sp: number; //speed
}

export class Entity {
  static Types = {
    EffectData: 0,
    ClassData: 1,
    ItemData: 2
  };

  static ClassDynamic = {
    Self: 0,
    Friendly: 1,
    Hostile: 2,
    Neutral: 3
  };

  static CreateNew(props: IEntity, metadata: any = {}): Entity {
    const entity = new Entity(props);
    entity.metadata = { ...metadata };
    return entity;
  }

  static CreateNewAndAddToCache(props: IEntity, metadata: any = {}): Entity {
    const entity = Entity.CreateNew(props, metadata);
    EntityCache.AddToAlive(entity);
    return entity;
  }

  get uID(): number {
    return this._props.uID ?? -1;
  }
  get name(): string {
    return this._props.name;
  }
  get classData(): IEntityClassData | undefined {
    return this._props.classData;
  }
  get classDynamic(): number | undefined {
    return this.metadata?.dynamic;
  }
  get actionPoints(): number {
    return this.classData?.stats?.ap[0] ?? 0;
  }
  get actionPointsMax(): number {
    return this.classData?.stats?.ap[1] ?? 0;
  }
  get healthPoints(): number {
    return this.classData?.stats?.hp[0] ?? 0;
  }
  get healthPointsMax(): number {
    return this.classData?.stats?.hp[1] ?? 0;
  }
  get magicPoints(): number {
    return this.classData?.stats?.mp[0] ?? 0;
  }
  get magicPointsMax(): number {
    return this.classData?.stats?.mp[1] ?? 0;
  }

  public metadata: any = {};
  constructor(private _props: IEntity) {
    this._props.uID = EntityCache.uID++;
  }

  public update(delta: number) {
    const d = delta * 0.1;
    if (this.classData) {
      this.classData.stats.ap[0] = Math.min(
        this.classData.stats.ap[0] + this.classData.stats.ar * d,
        this.classData.stats.ap[1]
      );
      this.classData.stats.hp[0] = Math.min(
        this.classData.stats.hp[0] + this.classData.stats.hr * d,
        this.classData.stats.hp[1]
      );
      this.classData.stats.mp[0] = Math.min(
        this.classData.stats.mp[0] + this.classData.stats.mr * d,
        this.classData.stats.mp[1]
      );
    }
  }
}
