// https://adventofcode.com/2022/day/2

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

const kanobu = (op, you) => {
  // A - Rock, B - Paper, C - Scissors
  // extra points A+1 B+2 C+3
  switch (op) {
    case "A":
      if (you === "A") return 3 + 1;
      if (you === "B") return 6 + 2;
      if (you === "C") return 0 + 3;
      break;
    case "B":
      if (you === "A") return 0 + 1;
      if (you === "B") return 3 + 2;
      if (you === "C") return 6 + 3;
      break;
    case "C":
      if (you === "A") return 6 + 1;
      if (you === "B") return 0 + 2;
      if (you === "C") return 3 + 3;
      break;
    default:
      break;
  }
};

const testCase = (iteration, letter) => {
  // X Y Z
  // 123 132 213 231 312 321
  // XYZ XYZ XYZ XYZ XYZ XYZ
  // ABC ACB BAC BCA CAB CBA
  // A - Rock, B - Paper, C - Scissors
  switch (iteration) {
    case 0:
      if (letter === "X") return "A";
      if (letter === "Y") return "B";
      if (letter === "Z") return "C";
      break;
    case 1:
      if (letter === "X") return "A";
      if (letter === "Y") return "C";
      if (letter === "Z") return "B";
      break;
    case 2:
      if (letter === "X") return "B";
      if (letter === "Y") return "A";
      if (letter === "Z") return "C";
      break;
    case 3:
      if (letter === "X") return "B";
      if (letter === "Y") return "C";
      if (letter === "Z") return "A";
      break;
    case 4:
      if (letter === "X") return "C";
      if (letter === "Y") return "A";
      if (letter === "Z") return "B";
      break;
    case 5:
      if (letter === "X") return "C";
      if (letter === "Y") return "B";
      if (letter === "Z") return "A";
      break;
    default:
      break;
  }
};

const byResult = (op, res) => {
  // A - Rock, B - Paper, C - Scissors
  // X - lose, Y - draw, Z - win
  switch (op) {
    case "A":
      if (res === "X") return "C";
      if (res === "Y") return "A";
      if (res === "Z") return "B";
      break;
    case "B":
      if (res === "X") return "A";
      if (res === "Y") return "B";
      if (res === "Z") return "C";
      break;
    case "C":
      if (res === "X") return "B";
      if (res === "Y") return "C";
      if (res === "Z") return "A";
      break;
    default:
      break;
  }
};

//MAIN RUN
const file = getInput("02");
let arr = file.split(/\r?\n/);
// console.log(arr);
arr = arr.filter((e) => e !== "");

const newArr = [];
console.log("All strategies:");
for (let i = 0; i < 6; i++) {
  //
  const sum = arr.map((r) => {
    return kanobu(r[0], testCase(i, r[2]));
  });
  newArr.push([...sum]);
}
console.log(
  newArr.map((a) => {
    return a.reduce((s, e) => s + e);
  })
);
console.log("By result:");
const sum = arr.map((r) => {
  return kanobu(r[0], byResult(r[0], r[2]));
});
console.log(sum.reduce((s, e) => s + e));
