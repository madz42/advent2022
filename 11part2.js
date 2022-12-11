// https://adventofcode.com/2022/day/11
// part2

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

const findDiv = (arr) => {
  return arr.reduce((s, e) => s * e);
};

//MAIN
const file = getInput("11");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
// console.log(file);
// console.log(input);
const totalMonkeys = input.length / 6;
let monkeys = [];
const rounds = 10000;
// console.log(totalMonkeys);
//parse input
for (let i = 0; i < totalMonkeys; i++) {
  const items = input[i * 6 + 1]
    .split(":")[1]
    .split(",")
    .map((x) => parseInt(x.trim(" ")));
  const x = input[i * 6 + 2].split(":")[1].split(" ").slice(4);
  const action = x[0] === "*" ? "mult" : "add";
  const value = x[1] === "old" ? "pow" : parseInt(x[1]);
  const divide = parseInt(input[i * 6 + 3].split(" ").slice(5));
  const ifTrue = parseInt(input[i * 6 + 4].split(" ").slice(9));
  const ifFalse = parseInt(input[i * 6 + 5].split(" ").slice(9));
  const newMonkey = {
    inspected: 0,
    items,
    action,
    value,
    divide,
    ifTrue,
    ifFalse,
  };
  monkeys.push({ ...newMonkey });
}
// console.log(monkeys);
//run rounds
const div = findDiv(monkeys.map((x) => x.divide));
// console.log(div);
for (let i = 0; i < rounds; i++) {
  for (let j = 0; j < totalMonkeys; j++) {
    const { action, value, divide, ifTrue, ifFalse } = monkeys[j];
    let { inspected, items } = monkeys[j];
    items.forEach((item) => {
      inspected++;
      let newItem = 0;
      //worry
      if (value === "pow") {
        newItem = item ** 2;
      } else {
        if (action === "add") newItem = item + value;
        if (action === "mult") newItem = item * value;
      }
      //unworry
      // newItem = Math.floor(newItem / 3);
      newItem = newItem % div;
      // console.log(newItem);
      //test
      //   console.log(newItem);
      if (newItem % divide === 0) {
        monkeys[ifTrue].items.push(newItem);
      } else {
        monkeys[ifFalse].items.push(newItem);
      }
    });
    monkeys[j].inspected = inspected;
    monkeys[j].items = [];
  }
}
console.log("After", rounds, "rounds");
// console.log(monkeys);
monkeys.sort((a, b) => b.inspected - a.inspected);
console.log(monkeys.map((m) => m.inspected));
console.log("Part I:");
console.log(monkeys[0].inspected * monkeys[1].inspected);
