// https://adventofcode.com/2022/day/22
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

const parseLine = (seq) => {
  let com = "";
  let coms = [];
  for (let i = 0; i < seq.length; i++) {
    const l = seq[i];
    if (l === "R" || l === "L") {
      coms.push(parseInt(com));
      coms.push(l);
      com = "";
    } else {
      com += l;
    }
    if (i === seq.length - 1) {
      coms.push(parseInt(l));
    }
  }
  return coms;
};

const getDir = (dir) => {
  switch (dir) {
    case "U":
      return [-1, 0];
    case "R":
      return [0, 1];
    case "D":
      return [1, 0];
    case "L":
      return [0, -1];
  }
};

const changeDir = (current, turn) => {
  const dirs = "lURDLu";
  const shift = turn === "R" ? 1 : -1;
  return dirs[dirs.indexOf(current) + shift].toUpperCase();
};

const checkSpace = (cV, cH, shift) => {
  let [nV, nH] = [cV + shift[0], cH + shift[1]];
  const nCell = map[nV][nH];
  if (nCell === " ") {
    //use teleport
    return teleport(cV, cH, shift);
  } else {
    //check for wall
    if (nCell === "#") {
      //ignore
      return [cV, cH];
    } else if (nCell === ".") {
      //move
      return [nV, nH];
    }
  }
};

const execute = (com) => {
  if (typeof com === "number") {
    for (let i = 0; i < com; i++) {
      makeMove();
    }
  } else {
    cur = { ...cur, d: changeDir(cur.d, com) };
  }
  //
};

const makeMove = () => {
  const coord = checkSpace(cur.v, cur.h, getDir(cur.d));
  cur = { ...cur, v: coord[0], h: coord[1] };
};

const teleport = (cV, cH, shift) => {
  const [oV, oH] = [cV, cH];
  if (shift[0] !== 0) {
    // up or down
    cV = shift[0] === 1 ? 0 : map.length - 1;
    while (map[cV][cH] === " ") cV += shift[0];
  } else if (shift[1] !== 0) {
    // left or right
    cH = shift[1] === 1 ? 0 : map[0].length - 1;
    while (map[cV][cH] === " ") cH += shift[1];
  }
  if (map[cV][cH] === "#") return [oV, oH];
  return [cV, cH];
};

//MAIN
const file = getInput("22");
let map = file.split(/\r?\n/).filter((x) => x.length > 0);

const seq = parseLine(map.pop());
map = map.map((x) => x.split(""));
//add space borders, to make rest easier
const maxLen = Math.max(...map.map((x) => x.length));
map = map.map((x) => {
  const add = maxLen - x.length;
  return [" ", ...x, ...Array(add + 1).fill(" ")];
});
map.unshift(Array(maxLen + 2).fill(" "));
map.push(Array(maxLen + 2).fill(" "));
//

let cur = { v: 1, h: map[1].findIndex((x) => x === "."), d: "R" };

//run comands
console.log(cur);
seq.forEach((x) => execute(x));
// map.forEach((x) => console.log(x.join("")));
console.log(cur);
// execute("n");
const dir = cur.d === "R" ? 0 : cur.d === "D" ? 1 : cur.d === "L" ? 2 : 3;
const sum = cur.v * 1000 + cur.h * 4 + dir;
console.log("Part I:", sum);
