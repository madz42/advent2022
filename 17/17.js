// https://adventofcode.com/2022/day/17
//Part 1

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

let chamber = [["#", "#", "#", "#", "#", "#", "#"]];
let [curFig, curJet] = [0, 0];
const totalRocks = 2022;
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
}
chamber.push([".", ".", ".", ".", ".", ".", "."]);
//draw chamber
// chamber.reverse();
// chamber.forEach((x) => console.log(x.join("")));
console.log("PART I:", findTowerH() - 1);
