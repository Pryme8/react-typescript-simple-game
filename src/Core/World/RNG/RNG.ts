// // 1993 Park-Miller LCG
// function LCG(s) {
//   return function() {
//     s = Math.imul(48271, s) | 0 % 2147483647;
//     return (s & 2147483647) / 2147483648;
//   }
// }

export const RNG = (_seed: string | number = 123456) => {
  const parseSeed = (s: string) => {
    let sv = "";
    s.split("").forEach((char) => {
      sv += char.charCodeAt(0) + "";
    });
    console.log(sv);
    return parseInt(sv, 10);
  };

  let parsedSeed: number = typeof _seed === "string" ? parseSeed(_seed) : _seed;
  console.log(parsedSeed);
  // doesn't repeat b4 JS dies.
  // https://gist.github.com/blixt/f17b47c62508be59987b
  let seed = parsedSeed % 2147483647;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
};
