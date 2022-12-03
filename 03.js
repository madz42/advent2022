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

const itemValue = (x) => {
  const items = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return items.search(x) + 1;
};

const findCommon = (initArr, arr1, arr2) => {
  for (let i = 0; i < initArr.length; i++) {
    if (arr1.includes(initArr[i]) && arr2.includes(initArr[i])) {
      return initArr[i];
    }
  }
};

const file = getInput("03");
const arr = file.split(/\r?\n/).filter((x) => x.length > 0);
const sum = arr.map((bag) => {
  const pocket1 = bag.slice(0, bag.length / 2);
  const pocket2 = bag.slice(bag.length / 2);
  for (let i = 0; i < pocket1.length; i++) {
    if (pocket2.includes(pocket1[i])) {
      //   console.log(bag, pocket1, pocket2);
      //   console.log(pocket1[i]);
      return itemValue(pocket1[i]);
    }
  }
});
console.log(
  "Part I:",
  sum.reduce((s, e) => s + e)
);
let group = [];
for (let i = 0; i < arr.length; i = i + 3) {
  group.push(itemValue(findCommon(arr[i], arr[i + 1], arr[i + 2])));
}
console.log(
  "Part II:",
  group.reduce((s, e) => s + e)
);
