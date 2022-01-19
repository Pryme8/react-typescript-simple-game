export class ClassTypes {
  static Adventurer = {
    id: 0,
    spriteId: 10,
    name: "Adventurer",
    desc: `She pets all the kitties.`,
    stats: {
      l: 0, //level
      e: [0, 10], //exp
      hp: [20, 20], //health
      ap: [0, 100], //actionCounter
      mp: [0, 10], //magic
      hr: 0.012, //healthRegen
      ar: 0.25, //actionRegen
      mr: 0.002, //magicRegen
      s: 5, //strength
      d: 5, //dexterity
      w: 1, //wisdom
      pd: 5, //phsyicalDefence
      md: 2, //magicDefence
      sp: 0.7 //speed
    },
    skills: [
      {
        name: "Punch",
        mc: 0, //magicCost
        ac: 50 //ActionCost
      }
    ]
  };

  static Wizard = {
    id: 1,
    spriteId: 12,
    name: "Wizard",
    desc: `Thinks hes witty.`,
    stats: {
      l: 0, //level
      e: [0, 10], //exp
      hp: [20, 20], //health
      ap: [0, 100], //actionCounter
      mp: [0, 10], //magic
      hr: 0.008, //healthRegen
      ar: 0.15, //actionRegen
      mr: 0.01, //magicRegen
      s: 1, //strength
      d: 5, //dexterity
      w: 5, //wisdom
      pd: 2, //phsyicalDefence
      md: 5, //magicDefence
      sp: 0.5 //speed
    },
    skills: [
      {
        name: "Punch",
        mc: 0, //magicCost
        ac: 50 //ActionCost
      }
    ]
  };

  static Marksman = {
    id: 2,
    spriteId: 16,
    name: "Marksman",
    desc: `Has touched the Butt.`,
    stats: {
      l: 0, //level
      e: [0, 10], //exp
      hp: [20, 20], //health
      ap: [0, 100], //actionCounter
      mp: [0, 10], //magic
      hr: 0.01, //healthRegen
      ar: 0.2, //actionRegen
      mr: 0.005, //magicRegen
      s: 1, //strength
      d: 5, //dexterity
      w: 5, //wisdom
      pd: 2, //phsyicalDefence
      md: 5, //magicDefence
      sp: 0.6 //speed
    },
    skills: [
      {
        name: "Punch",
        mc: 0, //magicCost
        ac: 50 //ActionCost
      }
    ]
  };

  static Cleric = {
    id: 3,
    spriteId: 53,
    name: "Cleric",
    desc: `Ye Got Ghost in Yer Blood.`,
    stats: {
      l: 0, //level
      e: [0, 10], //exp
      hp: [20, 20], //health
      ap: [0, 100], //actionCounter
      mp: [0, 10], //magic
      hr: 0.01, //healthRegen
      ar: 0.2, //actionRegen
      mr: 0.005, //magicRegen
      s: 1, //strength
      d: 5, //dexterity
      w: 5, //wisdom
      pd: 2, //phsyicalDefence
      md: 5, //magicDefence
      sp: 0.6 //speed
    },
    skills: [
      {
        name: "Punch",
        mc: 0, //magicCost
        ac: 50 //ActionCost
      }
    ]
  };
}
