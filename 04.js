// https://adventofcode.com/2022/day/4

const fs = require("fs");

const getInput = (id) => {
  try {
    const data = fs.readFileSync(`./${id}.input`, "utf-8");
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};

const contains = (a1, a2, b1, b2) => {
  if (a1 >= b1 && a1 <= b2 && a2 >= b1 && a2 <= b2) {
    return true;
  } else return false;
};

const file = getInput("04");
let arr = file.split(/\r?\n/).filter((x) => x.length > 0);
arr = arr.map((x) => x.split(",").map((y) => y.split("-")));
arr = arr.map((x) => x.map((y) => y.map((z) => parseInt(z))));
const overlap = arr.map((x) => {
  if (x[0][1] - x[0][0] < x[1][1] - x[1][0]) {
    return contains(...x[0], ...x[1]);
  } else {
    return contains(...x[1], ...x[0]);
  }
});
console.log("Part I:");
console.log(overlap.filter((x) => x).length);
//part2
const overlapPartial = arr.map((x) => {
  if (x[0][0] >= x[1][0] && x[0][0] <= x[1][1]) {
    // console.log(true);
    return true;
  }
  if (x[0][1] >= x[1][0] && x[0][1] <= x[1][1]) {
    // console.log(true);
    return true;
  }
  if (x[1][0] >= x[0][0] && x[1][0] <= x[0][1]) {
    // console.log(true);
    return true;
  }
  if (x[1][1] >= x[0][0] && x[1][1] <= x[0][1]) {
    // console.log(true);
    return true;
  }
  //   console.log(x);
  //   console.log(false);
  return false;
});
console.log("Part II:");
console.log(overlapPartial.filter((x) => x).length);
