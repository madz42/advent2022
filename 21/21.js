// https://adventofcode.com/2022/day/21
//part 1

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

const callMonkey = (name) => {
  const { value, func, child } = monkeys.find((x) => x.name === name);
  if (value === null) {
    const val = child.map((x) => callMonkey(x));
    // console.log(name, func, child, val);
    switch (func) {
      case "add":
        return val.reduce((s, e) => s + e);
      case "sub":
        return val.reduce((s, e) => s - e);
      case "mul":
        return val.reduce((s, e) => s * e);
      case "div":
        return val.reduce((s, e) => s / e);
    }
  } else return value;
};

//MAIN
const file = getInput("21");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
// const totalMonkeys = input.length / 6;
// console.log(input);
let monkeys = input.map((x) => {
  const parts = x.split(": ");
  const val = parts[1].split(" ");
  if (val.length === 1) {
    return { name: parts[0], value: parseInt(val[0]), func: null, child: [] };
  } else {
    const func =
      val[1] === "+"
        ? "add"
        : val[1] === "-"
        ? "sub"
        : val[1] === "*"
        ? "mul"
        : "div";
    return { name: parts[0], value: null, func, child: [val[0], val[2]] };
  }
});
// console.log(monkeys);

console.log("PART I:", callMonkey("root"));
