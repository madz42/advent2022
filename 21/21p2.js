// https://adventofcode.com/2022/day/21
//part 2 crap solution, should rebuild graph tree

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

const findPath = (cur, end, seq) => {
  if (cur === end) return seq;
  const parent = monkeys.find((x) => x.name === cur).parent;
  return findPath(parent, end, [...seq, parent]);
};

const callMonkey = (name) => {
  const { value, func, child } = monkeys.find((x) => x.name === name);
  if (value === null) {
    const val = child.map((x) => callMonkey(x));
    // console.log(name, func, child, val);
    let tot = 0;
    switch (func) {
      case "add":
        tot = val.reduce((s, e) => s + e);
        break;
      case "sub":
        tot = val.reduce((s, e) => s - e);
        break;
      case "mul":
        tot = val.reduce((s, e) => s * e);
        break;
      case "div":
        tot = val.reduce((s, e) => s / e);
        break;
    }
    monkeys = monkeys.map((x) => (x.name !== name ? x : { ...x, value: tot }));
    return tot;
  } else return value;
};

const parseLine = (x) => {
  const parts = x.split(": ");
  const val = parts[1].split(" ");
  if (val.length === 1) {
    return {
      name: parts[0],
      value: parseInt(val[0]),
      func: null,
      parent: null,
      child: [],
    };
  } else {
    const func =
      val[1] === "+"
        ? "add"
        : val[1] === "-"
        ? "sub"
        : val[1] === "*"
        ? "mul"
        : "div";
    return {
      name: parts[0],
      value: null,
      func,
      parent: null,
      child: [val[0], val[2]],
    };
  }
};

const addParents = () => {
  for (let i in monkeys) {
    const pt = monkeys[i].name;
    const ch = [...monkeys[i].child];
    //   console.log(pt, ch);
    if (monkeys[i].child.length > 0) {
      for (j of ch) {
        monkeys = monkeys.map((m) => (m.name !== j ? m : { ...m, parent: pt }));
      }
    }
  }
};

const getChildren = (name) => {
  return monkeys.find((x) => x.name === name).child;
};

const getFunc = (name) => {
  return monkeys.find((x) => x.name === name).func;
};

//MAIN
const file = getInput("21");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
// console.log(input);
let monkeys = input.map((x) => parseLine(x));
addParents();

const route = findPath("humn", "root", ["humn"]).reverse();
// console.log(route);
let total = 0;
for (let i = 0; i < route.length - 1; i++) {
  const cur = route[i];
  const child = getChildren(route[i]);
  const func = getFunc(route[i]);
  let [a, b] = [0, 0];
  if (child[0] === route[i + 1]) {
    //left child on human route
    b = callMonkey(child[1]);
    if (cur === "root") {
      total = b;
    } else {
      if (func === "add") {
        a = total - b;
      } else if (func === "sub") {
        a = total + b;
      } else if (func === "mul") {
        a = total / b;
      } else if (func === "div") {
        a = total * b;
      }
      total = a;
    }
  } else {
    //right child on human route
    a = callMonkey(child[0]);
    if (cur === "root") {
      total = a;
    } else {
      if (func === "add") {
        b = total - a;
      } else if (func === "sub") {
        b = a - total;
      } else if (func === "mul") {
        b = total / a;
      } else if (func === "div") {
        b = a / total;
      }
      total = b;
    }
  }
  //   console.log(cur, total);
}
console.log("PART II:", total);
