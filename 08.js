// https://adventofcode.com/2022/day/8

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

//MAIN
const file = getInput("08");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);

const part1 = () => {
  const arr = input.map((l) => l.split("").map((x) => [parseInt(x), false]));
  for (let i = 1; i < arr[0].length - 1; i++) {
    for (let j = 1; j < arr.length - 1; j++) {
      //check
      let horz = [
        arr[j].slice(0, i).map((x) => x[0]),
        arr[j].slice(i + 1).map((x) => x[0]),
      ];
      const vert = [[], []];
      for (let k = 0; k < arr.length; k++) {
        //i
        if (j > k) vert[0].push(arr[k][i][0]);
        if (j < k) vert[1].push(arr[k][i][0]);
      }
      const maxH = [
        Math.max(...horz[0]),
        Math.max(...horz[1]),
        Math.max(...vert[0]),
        Math.max(...vert[1]),
      ];
      if (
        maxH[0] < arr[j][i][0] ||
        maxH[1] < arr[j][i][0] ||
        maxH[2] < arr[j][i][0] ||
        maxH[3] < arr[j][i][0]
      ) {
        arr[j][i][1] = true;
      }
    }
  }
  const res = arr.map((x) => x.map((y) => y[1]));
  // console.log(arr.map((x) => x.map((y) => y[0])));
  return (
    res
      .flat(2)
      .map((x) => (x ? 1 : 0))
      .reduce((s, e) => s + e) +
    (arr.length - 1 + arr[0].length - 1) * 2
  );
};

const part2 = () => {
  const getH = (x, y) => {
    if (x < 0 || y < 0) return "end";
    if (x >= arr.length || y >= arr[0].length) return "end";
    return arr[x][y][0];
  };
  const arr = input.map((l) => l.split("").map((x) => [parseInt(x), 0]));
  arr.forEach((x, ix) => {
    x.forEach((y, iy) => {
      let view = [0, 0, 0, 0];
      let curX = ix;
      let curY = iy;
      while (getH(curX, curY) !== "end") {
        curX--;
        if (getH(curX, curY) === "end") {
          break;
        } else if (getH(curX, curY) < getH(ix, iy)) {
          view[0]++;
        } else {
          view[0]++;
          break;
        }
      }
      curX = ix;
      while (getH(curX, curY) !== "end") {
        curX++;
        if (getH(curX, curY) === "end") {
          break;
        } else if (getH(curX, curY) < getH(ix, iy)) {
          view[1]++;
        } else {
          view[1]++;
          break;
        }
      }
      curX = ix;
      curY = iy;
      while (getH(curX, curY) !== "end") {
        curY--;
        if (getH(curX, curY) === "end") {
          break;
        } else if (getH(curX, curY) < getH(ix, iy)) {
          view[2]++;
        } else {
          view[2]++;
          break;
        }
      }
      curY = iy;
      while (getH(curX, curY) !== "end") {
        curY++;
        if (getH(curX, curY) === "end") {
          break;
        } else if (getH(curX, curY) < getH(ix, iy)) {
          view[3]++;
        } else {
          view[3]++;
          break;
        }
      }
      arr[ix][iy][1] = view[0] * view[1] * view[2] * view[3];
    });
  });

  const res = arr.map((x) => x.map((y) => y[1]));
  //   console.log(arr.map((x) => x.map((y) => y[0])));
  //   console.log(res);
  return Math.max(...res.flat(2));
};

console.log("Part I:");
console.log(part1());
//1719
console.log("Part II:");
console.log(part2());
//590824
