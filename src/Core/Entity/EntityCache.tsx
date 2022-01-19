import { Entity } from "./Entity";
export class EntityCache {
  static uID: number = 0;
  static Alive: Map<number, Entity> = new Map();
  static AddToAlive(entity: Entity): void {
    EntityCache.Alive.set(entity.uID, entity);
  }
  static GetCurrentParty(): Entity[] {
    const party: Entity[] = [];
    EntityCache.Alive.forEach((entity: Entity) => {
      if (
        entity.metadata.dynamic === Entity.ClassDynamic.Self ||
        entity.metadata.dynamic === Entity.ClassDynamic.Friendly
      ) {
        party.push(entity);
      }
    });
    return party;
  }
}
