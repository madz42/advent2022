// https://adventofcode.com/2022/day/9
//Part II
//proper way with scoring

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
    //move head
    prev = rope.map((x) => [...x]);
    if (dir === "R") {
      rope[0] = [rope[0][0] + 1, rope[0][1]];
    } else if (dir === "L") {
      rope[0] = [rope[0][0] - 1, rope[0][1]];
    } else if (dir === "U") {
      rope[0] = [rope[0][0], rope[0][1] + 1];
    } else if (dir === "D") {
      rope[0] = [rope[0][0], rope[0][1] - 1];
    }
    // move body
    for (let j = 1; j <= last; j++) {
      if (tooFar(rope[j - 1], rope[j])) {
        crawl(j);
        if (j === last) addPath(rope[j]);
      }
    }
  }
};

const tooFar = (h, t) => {
  const difX = Math.abs(h[0] - t[0]);
  const difY = Math.abs(h[1] - t[1]);
  //   console.log("diff", difX, difY);
  if (difX > 1 || difY > 1) {
    return true;
  }
  return false;
};

const crawl = (i) => {
  const matrix = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  //evaluate
  const score = matrix.map((x, ix) =>
    x.map((y, iy) => {
      // rope[i-1]
      const difX = Math.abs(rope[i][0] - 1 + ix - rope[i - 1][0]);
      const difY = Math.abs(rope[i][1] - 1 + iy - rope[i - 1][1]);
      // console.log("crawl:", difX, difY);
      return difX + difY;
    })
  );
  const lowScore = Math.min(...score.flat(2));
  let moveY = 0;
  let moveX = 0;
  //choose direction
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (score[x][y] === lowScore) {
        moveX = x - 1;
        moveY = y - 1;
      }
    }
  }
  rope[i] = [rope[i][0] + moveX, rope[i][1] + moveY];
  // console.log(score);
  // console.log(lowScore, moveX, moveY);
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
let rope = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];
const last = rope.length - 1;

input.forEach((m) => {
  //
  //   console.log("LINE ", m);
  makeMove(...m.split(" "));
});
// console.log(rope);
console.log("Part II:");
console.log(tailPath.length);
