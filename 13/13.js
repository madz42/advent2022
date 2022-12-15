// https://adventofcode.com/2022/day/13

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

const comparePair = (left, right) => {
  //   console.log("fun", left, right);
  if (typeof left === "number" && typeof right === "number") {
    // console.log("comp i i");
    if (left === right) return "next";
    if (left < right) return "left";
    if (left > right) return "right";
  } else if (typeof left === "object" && typeof right === "number") {
    // console.log("comp a i");
    return comparePair(left, [right]);
  } else if (typeof left === "number" && typeof right === "object") {
    // console.log("comp i a");
    return comparePair([left], right);
  } else if (typeof left === "object" && typeof right === "object") {
    // console.log("comp a a");
    //go deep
    const minElem = Math.min(left.length, right.length);
    //if no empty arrays
    if (minElem > 0) {
      for (let i = 0; i < minElem; i++) {
        const res = comparePair(left[i], right[i]);
        if (res !== "next") return res;
        if (i === minElem - 1 && left.length !== right.length) {
          if (left.length < right.length) return "left";
          return "right";
        }
      }
      return "next";
    } else {
      if (left.length < right.length) return "left";
      return "right";
    }
  }
};

//MAIN
const file = getInput("13");
let input = file.split(/\r?\n/).filter((x) => x.length > 0);
const totalPairs = input.length / 2;
console.log("pairs", totalPairs);
input = input.map((x) => JSON.parse(x));

//PART 1
let sum = 0;
for (let i = 0; i < totalPairs; i++) {
  //   console.log(input[i * 2]);
  //   console.log(input[i * 2 + 1]);
  const res = comparePair(input[i * 2], input[i * 2 + 1]);
  //   console.log(res);
  if (res === "left") {
    sum = sum + i + 1;
  }
}
console.log("PART I:", sum);

//PART 2
let res = 1;
input.push([[2]]);
input.push([[6]]);
input.sort((a, b) => (comparePair(a, b) === "left" ? -1 : 1));
// console.log(input);
input.forEach((x, ix) => {
  let e = x;
  if (typeof e === "object") {
    e = e.flat();
    if (typeof e === "object" && e.length === 1) {
      if (e[0] === 6 || e[0] === 2) {
        console.log(e, "at", ix + 1);
        res *= ix + 1;
      }
    }
  }
});
console.log("PART II:", res);
