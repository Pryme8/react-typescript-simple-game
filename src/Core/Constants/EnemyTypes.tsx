import { SkillArea, SkillTypes } from "./Skills";

export class EnemyTypes {
  static Slime = {
    id: 0,
    spriteId: 96,
    name: "Slime",
    desc: `Ew, I stepped in something.`,
    stats: {
      l: 0, //level
      e: [0, 10], //exp
      hp: [5, 5], //health
      ap: [0, 100], //actionCounter
      mp: [0, 0], //magic
      hr: 0.01, //healthRegen
      ar: 0.08, //actionRegen
      mr: 0, //magicRegen
      s: 1, //strength
      d: 1, //dexterity
      w: 0, //wisdom
      pd: 1, //phsyicalDefence
      md: 0, //magicDefence
      sp: 0 //speed
    },
    skills: [
      {
        name: "Plop",
        type: SkillTypes.PhysicalMelee,
        area: SkillArea.Types.Point,
        areaProps: {
          offset: { x: 1, y: 0 }
        },
        mc: 0, //magicCost
        ac: 100 //ActionCost
      }
    ],
    equipment: [],
    items: [],
    levelUp: {
      hp: (hp: number, level: number) => {
        return hp + level;
      },
      ap: 0,
      mp: 0,
      hr: (hr: number, level: number) => {
        const variance = 0.001 * (Math.random() * 2 - 1);
        return hr + 0.002 + variance;
      },
      mr: 0,
      s: (s: number, level: number) => {
        const variance = 0.01 * (Math.random() * 2 - 1);
        return s + 0.5 + variance;
      },
      d: (d: number, level: number) => {
        const variance = 0.008 * (Math.random() * 2 - 1);
        return d + 0.2 + variance;
      },
      pd: (pd: number, level: number) => {
        const variance = 0.05 * (Math.random() * 2 - 1);
        return pd + 0.1 + variance;
      },
      md: (md: number, level: number) => {
        const variance = 0.01 * (Math.random() * 2 - 1);
        return md + 0.05 + variance;
      },
      sp: 0,
      unlockSkills: [{}]
    }
  };
}
