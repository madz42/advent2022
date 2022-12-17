// https://adventofcode.com/2022/day/9
//Part I
//wrong logic, but works with short rope in part1, proper way in 09proper.js

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

const makeMove = (dir, num) => {
  for (let i = 1; i <= num; i++) {
    prevHead = [...head];
    if (dir === "R") {
      head = [head[0] + 1, head[1]];
    } else if (dir === "L") {
      head = [head[0] - 1, head[1]];
    } else if (dir === "U") {
      head = [head[0], head[1] + 1];
    } else if (dir === "D") {
      head = [head[0], head[1] - 1];
    }
    // console.log("HERE", head);
    if (tooFar()) {
      //   tailPath.push(tail);
      tail = [...prevHead];
      addPath(tail);
    }
    // console.log("STEP ", dir, i);
    // console.log("h:", head, "ph:", prevHead, "t:", tail);
    // console.log(tailPath);
  }
};

const tooFar = () => {
  const difX = Math.abs(head[0] - tail[0]);
  const difY = Math.abs(head[1] - tail[1]);
  //   console.log("diff", difX, difY);
  if (difX > 1 || difY > 1) {
    return true;
  }
  return false;
};

const addPath = (point) => {
  if (!tailPath.find((y) => point[0] === y[0] && point[1] === y[1])) {
    tailPath.push([...point]);
  }
};

//MAIN
const file = getInput("09");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
// console.log(file);

const tailPath = [[0, 0]];
// const tailPath = [];
let head = [0, 0];
let tail = [0, 0];
let prevHead = [];

input.forEach((m) => {
  //
  //   console.log("LINE ", m);
  makeMove(...m.split(" "));
});
// console.log("h ph t", head, prevHead, tail);
// console.log(tailPath);
console.log("Part I:");
console.log(tailPath.length);
