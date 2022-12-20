// https://adventofcode.com/2022/day/20
//part 2

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
  const shift = pool[pos].value;
  //   console.log("STEP", id, seq[id]);
  // splice(start, deleteCount)
  // splice(start, deleteCount, item1)
  if (shift === 0) return;
  pool.splice(pos, 1);
  let newPos = pos + shift;
  //   console.log(newPos, pool.length);
  const loops = Math.floor(newPos / pool.length);
  newPos -= loops * pool.length;
  if (newPos === 0) {
    pool.push({ id, value: shift });
  } else {
    pool.splice(newPos, 0, { id, value: shift });
  }
};

//MAIN
const file = getInput("20");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
const seq = input.map((x) => parseInt(x));
const key = 811589153;

let pool = seq.map((x, ix) => {
  return { id: ix, value: x * key };
});
let stamp = 0;
// console.log(pool.map((x) => x.value).join());
for (let i = 0; i < 10; i++) {
  stamp = Date.now();
  console.log("Running round", i + 1, "...");
  seq.forEach((x, ix) => shiftDigit(ix));
  console.log(Date.now() - stamp, "ms");
}
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
  "PART II:",
  pool[zeroLoc + 1000].value +
    pool[zeroLoc + 2000].value +
    pool[zeroLoc + 3000].value
);
