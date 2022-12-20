// https://adventofcode.com/2022/day/20
//part 1

const fs = require("fs");

const getInput = (id) => {
  try {
    // const data = fs.readFileSync(`./${id}.input.test`, "utf-8");
    const data = fs.readFileSync(`./${id}.input`, "utf-8");
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};

const shiftDigit = (id) => {
  const pos = pool.findIndex((x) => x.id === id);
  const shift = seq[id];
  //   console.log("STEP", id, seq[id]);
  // splice(start, deleteCount)
  // splice(start, deleteCount, item1)
  if (shift === 0) return;
  pool.splice(pos, 1);
  let newPos = pos + shift;
  //   console.log(newPos, pool.length);
  while (newPos >= pool.length) newPos -= pool.length;
  while (newPos <= pool.length * -1) newPos += pool.length;
  if (newPos === 0) {
    pool.push({ id, value: seq[id] });
  } else {
    pool.splice(newPos, 0, { id, value: seq[id] });
  }
};

//MAIN
const file = getInput("20");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
const seq = input.map((x) => parseInt(x));
let pool = seq.map((x, ix) => {
  return { id: ix, value: x };
});
const stamp = Date.now();
seq.forEach((x, ix) => shiftDigit(ix));
console.log(Date.now() - stamp, "ms");
// console.log(pool.map((x) => x.value).join());

//zero id
const zeroId = seq.findIndex((x) => x === 0);
const zeroLoc = pool.findIndex((x) => x.id === zeroId);
console.log(zeroId, zeroLoc);
console.log(
  pool[zeroLoc + 1000].value,
  pool[zeroLoc + 2000].value,
  pool[zeroLoc + 3000].value
);
console.log(
  "PART I:",
  pool[zeroLoc + 1000].value +
    pool[zeroLoc + 2000].value +
    pool[zeroLoc + 3000].value
);
// console.log(first);
