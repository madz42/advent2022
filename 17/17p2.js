// https://adventofcode.com/2022/day/17
// Part2
// some optimizations and pattern search

const { info } = require("console");
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

//MAIN
const file = getInput("17");
const input = file.split(/\r?\n/).filter((x) => x.length > 0)[0];
//parse input <><><>
// console.log(input);
let rocks = [
  [[".", ".", "@", "@", "@", "@", "."]],
  //
  [
    [".", ".", ".", "@", ".", ".", "."],
    [".", ".", "@", "@", "@", ".", "."],
    [".", ".", ".", "@", ".", ".", "."],
  ],
  //
  [
    [".", ".", "@", "@", "@", ".", "."],
    [".", ".", ".", ".", "@", ".", "."],
    [".", ".", ".", ".", "@", ".", "."],
  ],
  //
  [
    [".", ".", "@", ".", ".", ".", "."],
    [".", ".", "@", ".", ".", ".", "."],
    [".", ".", "@", ".", ".", ".", "."],
    [".", ".", "@", ".", ".", ".", "."],
  ],
  //
  [
    [".", ".", "@", "@", ".", ".", "."],
    [".", ".", "@", "@", ".", ".", "."],
  ],
];
// console.log("REPEAT:", rocks.length * input.length);

const moveSide = (arr, dir) => {
  const newArr = arr.map((x) => {
    chamber[x[0]][x[1]] = ".";
    chamber[x[0]][x[1] + dir] = "@";
    return [x[0], x[1] + dir];
  });
  return newArr;
};
const moveDown = (arr) => {
  const newArr = arr.map((x) => {
    chamber[x[0]][x[1]] = ".";
    chamber[x[0] - 1][x[1]] = "@";
    return [x[0] - 1, x[1]];
  });
  return newArr;
};
const endMove = (arr) => {
  arr.forEach((x) => {
    chamber[x[0]][x[1]] = "#";
  });
};
const findRock = () => {
  const arr = [];
  chamber.forEach((x, ix) =>
    x.forEach((y, iy) => {
      if (y === "@") arr.push([ix, iy]);
    })
  );
  return arr;
};
const checkRight = (arr) => {
  const chk = arr.map((x) => {
    if (x[1] + 1 >= chamber[0].length) return false;
    const cell = chamber[x[0]][x[1] + 1];
    if (cell === "@" || cell === ".") {
      return true;
    } else {
      return false;
    }
  });
  //   console.log(chk);
  return chk.every((x) => x === true);
};
const checkLeft = (arr) => {
  const chk = arr.map((x) => {
    if (x[1] - 1 < 0) return false;
    const cell = chamber[x[0]][x[1] - 1];
    if (cell === "@" || cell === ".") {
      return true;
    } else {
      return false;
    }
  });
  //   console.log(chk);
  return chk.every((x) => x === true);
};
const checkDown = (arr) => {
  const chk = arr.map((x) => {
    if (x[0] === 0) console.log("HIT THE GROUND");
    const cell = chamber[x[0] - 1][x[1]];
    if (cell === "@" || cell === ".") {
      return true;
    } else {
      return false;
    }
  });
  //   console.log(chk);
  return chk.every((x) => x === true);
};
const findTowerH = () => {
  return chamber.findIndex((x) => !x.includes("#"));
};

const cutChamber = () => {
  chamber = chamber.slice(0, findTowerH());
};

const addRock = (num) => {
  chamber.push([".", ".", ".", ".", ".", ".", "."]);
  chamber.push([".", ".", ".", ".", ".", ".", "."]);
  chamber.push([".", ".", ".", ".", ".", ".", "."]);
  for (let i = 0; i < rocks[num].length; i++) {
    chamber.push([...rocks[num][i]]);
  }
};

const patternStep = 1000;
const milestones = [];
let chamber = [["#", "#", "#", "#", "#", "#", "#"]];
const runRounds = (pStep, rounds) => {
  let [curFig, curJet] = [0, 0];
  let [sum, curStep] = [0, 0];
  // const time = Date.now();
  const totalRocks = pStep * rounds;
  for (let i = 0; i < totalRocks; i++) {
    let moving = true;
    addRock(curFig);
    let curRock = findRock();
    while (moving) {
      //first jet
      if (input[curJet] === ">") {
        if (checkRight(curRock)) curRock = moveSide(curRock, 1);
      } else {
        if (checkLeft(curRock)) curRock = moveSide(curRock, -1);
      }
      // if (curFig === 0 && curJet === 0) console.log("BAM!", i);
      curJet++;
      if (curJet === input.length) curJet = 0;
      //then fall
      if (checkDown(curRock)) {
        curRock = moveDown(curRock);
      } else {
        endMove(curRock);
        cutChamber();
        moving = false;
      }
    }
    curFig++;
    if (curFig === rocks.length) curFig = 0;
    curStep++;
    //cut off old chamber to reduce size
    if (curStep === 30) {
      const toCut = chamber.length - 20;
      sum += toCut;
      curStep = 0;
      chamber = chamber.slice(toCut);
    }
    if (i % pStep === 0 && i !== 0) {
      console.log("height at", i / pStep, sum + chamber.length - 2);
      milestones.push(sum + chamber.length - 2);
    }
  }
  chamber.push([".", ".", ".", ".", ".", ".", "."]);
  console.log("height", sum + findTowerH() - 1);
  milestones.push(sum + findTowerH() - 1);
};

runRounds(patternStep, 20);
// console.log(milestones);
const newArr = [];
for (let i = milestones.length - 1; i > 0; i--) {
  newArr.push(milestones[i] - milestones[i - 1]);
}
newArr.push(milestones[0]);
newArr.reverse();
// console.log(newArr);
//find pattern
const tailArr = newArr.slice(3);
const patBeg = tailArr.findIndex((x) => x === newArr[1]) + 3;
const pattern = newArr.slice(1, patBeg);
const patRepeat = newArr.slice(patBeg, patBeg + patBeg - 1);
// console.log(pattern);
// console.log(patRepeat);
//check pattern
const patCheck = pattern.map((x, ix) => {
  if (x === patRepeat[ix]) return true;
  return false;
});
//in case of fail need better algo
if (!patCheck.every((x) => x === true)) console.log("FAIL TO FIND PATTERN");

let res = milestones[0];
let curP = 0;
for (let i = 1; i < 1000000000000 / patternStep; i++) {
  res += pattern[curP];
  curP++;
  if (curP === pattern.length) curP = 0;
}
console.log("PART II:", res);

//draw chamber
// chamber.reverse();
// chamber.forEach((x) => console.log(x.join("")));
// console.log("ms:", Date.now() - time);
