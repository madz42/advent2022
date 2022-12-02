// https://adventofcode.com/2022/day/1

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

const file = getInput("01");
const arr = file.split(/\r?\n/);
let cur = 0;
const sum = [[]];
for (let i = 0; i < arr.length; i++) {
  if (arr[i]) {
    sum[cur].push(parseInt(arr[i]));
  } else {
    cur++;
    sum.push([]);
  }
}
let q = sum.map((a) => {
  return a.reduce((s, e) => s + e, 0);
});
console.log("Part 1:");
console.log(Math.max(...q));
console.log("Part 2:");
let total = 0;
for (let i = 1; i <= 3; i++) {
  const mx = Math.max(...q);
  const id = q.indexOf(mx);
  total += mx;
  // console.log(i, "i:", id, "v:", mx, "l:", q.length);
  q = q.filter((e, i) => i !== id);
}
console.log(total);
