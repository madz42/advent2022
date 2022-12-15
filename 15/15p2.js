// https://adventofcode.com/2022/day/15
//PART 2 signal chunks per line

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

const getArr = (s, b, lineY) => {
  const dist = getDist(s, b);
  const dist2y = Math.abs(s[1] - lineY);
  if (dist2y <= dist) {
    return [s[0] - dist + dist2y, s[0] + dist - dist2y];
  }
};

const getDist = (s, b) => {
  return Math.abs(s[0] - b[0]) + Math.abs(s[1] - b[1]);
};

const mergeArr = (arr) => {
  arr.sort((a, b) => a[0] - b[0]);
  let result = [[arr[0][0], arr[0][1]]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][0] <= result[result.length - 1][1] + 1) {
      result[result.length - 1][1] = Math.max(
        result[result.length - 1][1],
        arr[i][1]
      );
    } else {
      result.push(arr[i]);
    }
  }
  return result;
};

//MAIN
const file = getInput("15");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
//parse input senson-beacon pairs
const list = input.map((l) => {
  const parts = l.split(": ");
  const [s, b] = [[], []];
  parts[0].split(",")[0].replace("Sensor at x=", "");
  s.push(parseInt(parts[0].split(", ")[0].replace("Sensor at x=", "")));
  s.push(parseInt(parts[0].split(", ")[1].replace("y=", "")));
  b.push(
    parseInt(parts[1].split(", ")[0].replace("closest beacon is at x=", ""))
  );
  b.push(parseInt(parts[1].split(", ")[1].replace("y=", "")));
  return [s, b];
});

//run through Y lines
const maxCoord = 4000000;
const time = Date.now();
for (let y = 0; y < maxCoord; y++) {
  const line = list
    .map((pair) => getArr(pair[0], pair[1], y))
    .filter((x) => x !== undefined);
  //   console.log("line", y, line);
  const combine = mergeArr(line);
  //   console.log("combine", y, combine);
  if (combine.length > 1) {
    console.log(combine, y);
    console.log((combine[0][1] + 1) * 4000000 + y);
    break;
  }
}
console.log(Date.now() - time);
