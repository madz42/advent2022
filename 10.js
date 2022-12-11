// https://adventofcode.com/2022/day/10

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
const file = getInput("10");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
// console.log(file);
// console.log(input);
const picture = [];
let signal = 1;
let sum = 0;
let cycle = 0;

const shootPixel = (cycle, value) => {
  const pos = cycle % 40;
  if (Math.abs(pos - value) <= 1) {
    picture.push("#");
    // console.log("#");
  } else {
    picture.push(".");
    // console.log(".");
  }
};

input.forEach((l) => {
  const [command, value] = l.split(" ");
  //   console.log(command, value);
  shootPixel(cycle, signal);
  cycle++;
  //   console.log(cycle, signal);
  if (cycle % 40 === 20) {
    sum += signal * cycle;
    // console.log(cycle, signal, sum);
  }
  if (command === "addx") {
    shootPixel(cycle, signal);
    cycle++;
    if (cycle % 40 === 20) {
      sum += signal * cycle;
      //   console.log(cycle, signal, sum);
    }
    signal += parseInt(value);
  }
});
console.log("Part I:");
console.log(sum);
console.log("Part II:");
const out = picture.join("");
for (let i = 0; i < 6; i++) {
  console.log(out.slice(i * 40, i * 40 + 40));
}
