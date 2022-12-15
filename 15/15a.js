// https://adventofcode.com/2022/day/15
//PART 1 single line map

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

const getDist = (s, b) => {
  return Math.abs(s[0] - b[0]) + Math.abs(s[1] - b[1]);
};

const putOnMap = (x, y, symb) => {
  //   map[x - minX + maxD][y - minY + maxD] = symb;
  map[x - minX + maxD] = symb;
};

const countOnY = () => {
  return map.filter((x) => x === "#").length;
};

const buildCoverage = (s, b) => {
  const dist = getDist(s, b);
  const dist2y = Math.abs(s[1] - lineY);
  //   console.log("cover", s, b, dist);
  if (dist2y <= dist) {
    // console.log("in");
    for (let x = dist - dist2y; x >= 0; x--) {
      //   console.log("IN", x);
      putOnMap(s[0] + x, lineY, "#");
      putOnMap(s[0] - x, lineY, "#");
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
let lineY = 2000000;
let map = Array(maxX - minX + 2 * maxD).fill("."); // add edges
// console.log(map.length);

list.forEach((x) => {
  buildCoverage(...x);
});
list.forEach((x) => {
  if (x[0][1] === lineY) putOnMap(x[0][0], x[0][1], "S");
  if (x[1][1] === lineY) putOnMap(x[1][0], x[1][1], "B");
});

console.log(countOnY());
