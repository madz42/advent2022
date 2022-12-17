// https://adventofcode.com/2022/day/5

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

const file = getInput("05");
const all = file.split(/\r?\n/).filter((x) => x.length > 0);
//parse input
let br = 0;
for (let i = 0; i < all.length; i++) {
  if (all[i].split(" ")[0] === "move") {
    br = i;
    break;
  }
}
// console.log(br);
let initArr = all.slice(0, br - 1).reverse();
let stacks = Array(initArr[0].split(" ").length).fill([]);
// parse stacks
stacks = stacks.map((x, i) => {
  //
  const stack = [];
  for (let j = 0; j < initArr.length; j++) {
    const crate = initArr[j][1 + i * 4];
    if (crate !== " ") stack.push(crate);
  }
  return stack;
});
// console.log(initArr);
// console.log(stacks);
const moves = all.slice(br);
// console.log(moves);

const crane9000 = (arr) => {
  moves.forEach((x) => {
    const move = x.split(" ");
    const num = parseInt(move[1]);
    const src = parseInt(move[3]) - 1;
    const des = parseInt(move[5]) - 1;
    for (let i = 1; i <= num; i++) {
      const crate = arr[src].pop();
      if (crate) {
        arr[des].push(crate);
      }
    }
  });
  return arr;
};
const crane9001 = (arr) => {
  moves.forEach((x) => {
    const move = x.split(" ");
    const num = parseInt(move[1]);
    const src = parseInt(move[3]) - 1;
    const des = parseInt(move[5]) - 1;
    const pack = [];
    for (let i = 1; i <= num; i++) {
      const crate = arr[src].pop();
      if (crate) {
        pack.push(crate);
      }
    }
    arr[des] = [...arr[des], ...pack.reverse()];
  });
  return arr;
};
// console.log("PartI");
// const result = crane9000(stacks)
console.log("PartII");
const result = crane9001(stacks);
console.log(result.map((x) => x[x.length - 1]).join(""));
