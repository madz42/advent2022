// https://adventofcode.com/2022/day/23

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

const checkSpace = (cV, cH, rnd) => {
  if (map[cV][cH] === "#") {
    let around = [];
    around.push(map[cV - 1][cH - 1]);
    around.push(map[cV - 1][cH]);
    around.push(map[cV - 1][cH + 1]);
    around.push(map[cV][cH - 1]);
    around.push(map[cV][cH + 1]);
    around.push(map[cV + 1][cH - 1]);
    around.push(map[cV + 1][cH]);
    around.push(map[cV + 1][cH + 1]);
    if (around.every((x) => x === ".")) return null;
    // 0 1 2
    // 3 x 4
    // 5 6 7
    // console.log(around.slice(5).some((x) => x === "#"));
    const choices = [];
    if (around.slice(0, 3).every((x) => x === ".")) {
      //move N
      choices.push({ v: cV - 1, h: cH, old: [[cV, cH]] });
    } else choices.push(null);
    if (around.slice(5).every((x) => x === ".")) {
      //move S
      choices.push({ v: cV + 1, h: cH, old: [[cV, cH]] });
    } else choices.push(null);
    if (around[0] === "." && around[3] === "." && around[5] === ".") {
      //move W
      choices.push({ v: cV, h: cH - 1, old: [[cV, cH]] });
    } else choices.push(null);
    if (around[2] === "." && around[4] === "." && around[7] === ".") {
      //move E
      choices.push({ v: cV, h: cH + 1, old: [[cV, cH]] });
    } else choices.push(null);
    if (choices.every((x) => x === null)) return null;
    // console.log(choices);
    for (let i = rnd % 4; i < 8; i++) {
      const e = i >= 4 ? i - 4 : i;
      if (choices[e] !== null) return choices[e];
    }
  } else {
    //skip
    return null;
  }
};

const makeMove = (obj) => {
  //{ v: 7, h: 6, old: [ 6, 6 ] }
  map[obj.v][obj.h] = "#";
  map[obj.old[0][0]][obj.old[0][1]] = ".";
};

const addSpace = () => {
  const maxLen = Math.max(...map.map((x) => x.length));
  map = map.map((x) => {
    const add = maxLen - x.length;
    return [".", ...x, ...Array(add + 1).fill(".")];
  });
  map.unshift(Array(maxLen + 2).fill("."));
  map.push(Array(maxLen + 2).fill("."));
};

const runRound = (rnd) => {
  let queue = [];
  // make queue of propositions
  for (let v = 1; v < map.length - 1; v++) {
    for (let h = 1; h < map[0].length - 1; h++) {
      const prop = checkSpace(v, h, rnd);
      if (prop !== null) {
        const notNew = queue.find((x) => x.v === prop.v && x.h === prop.h);
        if (notNew) {
          queue = queue.map((x) => {
            if (x.v === prop.v && x.h === prop.h) {
              return { ...x, old: [...x.old, prop.old] };
            } else return x;
          });
        } else queue.push(prop);
      }
    }
  }
  //check QUEUE - PART2
  //   console.log(queue);
  if (queue.every((x) => x.old.length > 1)) abort = true;
  queue.forEach((x) => {
    if (x.old.length === 1) {
      makeMove(x);
    }
  });
};

const removeSpace = () => {
  while (map[map.length - 1].every((x) => x === ".")) {
    map.pop();
  }
  while (map[0].every((x) => x === ".")) {
    map.shift();
  }
  let [minX, maxX] = [1000, 0];
  map.forEach((x) => {
    if (x.includes("#")) {
      minX = x.indexOf("#") < minX ? x.indexOf("#") : minX;
      maxX = x.lastIndexOf("#") > maxX ? x.lastIndexOf("#") : maxX;
    }
  });
  // console.log(minX, maxX);
  map = map.map((x) => x.slice(minX, maxX + 1));
};

const countSpace = () => {
  let count = 0;
  map.forEach((x) =>
    x.forEach((y) => {
      if (y === ".") count++;
    })
  );
  return count;
};

const part1 = () => {
  //run rounds
  for (let r = 0; r < 10; r++) {
    addSpace();
    //   map.forEach((x) => console.log(x.join("")));
    runRound(r);
  }
  removeSpace();
  return countSpace();
};

const part2 = () => {
  //   let abort = false;
  let i = 0;
  while (!abort) {
    addSpace();
    runRound(i);
    i++;
  }
  removeSpace();
  return i;
};
//MAIN
const file = getInput("23");
let map = file.split(/\r?\n/).filter((x) => x.length > 0);
map = map.map((x) => x.split(""));

let abort = false;
const tm = Date.now();
// map.forEach((x) => console.log(x.join("")));

// console.log("PART I:", part1());
console.log("PART II:", part2());
console.log(Date.now() - tm, "ms");
// map.forEach((x) => console.log(x.join("")));
