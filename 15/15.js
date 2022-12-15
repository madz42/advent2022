// https://adventofcode.com/2022/day/15
//PART 1 ok for test data and visualisation, crash on real data
//working solution in 15a.js

const fs = require("fs");

const getInput = (id) => {
  try {
    const data = fs.readFileSync(`./${id}.input.test`, "utf-8");
    // const data = fs.readFileSync(`./${id}.input`, "utf-8");
    return data;
  } catch (err) {
    console.error(err);
    return;
  }
};

const getDist = (s, b) => {
  return Math.abs(s[0] - b[0]) + Math.abs(s[1] - b[1]);
};

const putOnMap = (x, y, symb) => {
  map[x - minX + maxD][y - minY + maxD] = symb;
};

const countOnY = (num) => {
  const line = map.map((x) => x[num - minY + maxD]);
  return line.filter((x) => x === "#").length;
};

const buildCoverage = (s, b) => {
  const dist = getDist(s, b);
  for (x = dist; x >= 0; x--) {
    for (let y = dist - x; y >= 0; y--) {
      // console.log(dist, x, y);
      putOnMap(s[0] + x, s[1] + y, "#");
      putOnMap(s[0] + x, s[1] - y, "#");
      putOnMap(s[0] - x, s[1] - y, "#");
      putOnMap(s[0] - x, s[1] + y, "#");
    }
  }
};

//MAIN
const file = getInput("15");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
//parse input senson-beacon pairs
//Sensor at x=14, y=17: closest beacon is at x=10, y=16
let [minX, minY, maxX, maxY, maxD] = [10000, 10000, 0, 0, 0];
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
  if (s[0] < minX) minX = s[0];
  if (s[1] < minY) minY = s[1];
  if (s[0] > maxX) maxX = s[0];
  if (s[1] > maxY) maxY = s[1];
  return [s, b];
});
//generate map
maxD = Math.max(...list.map((p) => getDist(...p)));
// console.log(minX, maxX, minY, maxY, maxD);
let map = Array(maxX - minX + 2 * maxD).fill(0); // add edges
map = map.map((x) => {
  const arr = Array(maxY - minY + 2 * maxD).fill("."); // add edges
  return [...arr];
});
//build map
// map[0 - minX + maxD][0 - minY + maxD] = "X";
// map.forEach((x) => console.log(x.join("")));
list.forEach((x) => buildCoverage(...x));
list.forEach((x) => {
  putOnMap(x[0][0], x[0][1], "S");
  putOnMap(x[1][0], x[1][1], "B");
});
// putOnMap(0, 0, "+");
// putOnMap(0, 20, "+");
// putOnMap(20, 20, "+");
// putOnMap(20, 0, "+");
map.forEach((x) => console.log(x.join("")));
console.log(countOnY(10));
