// https://adventofcode.com/2022/day/14

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

const checkFall = (x, y) => {
  if (x < 0 || y < 0 || x >= cave.length || y >= cave[0].length) return "abyss";
  if (cave[x][y] === "o" || cave[x][y] === "#") return false;
  return true;
};

const simSand = (x, y) => {
  //start @x,y
  let stop = false;
  while (!stop) {
    switch (checkFall(x, y + 1)) {
      case true:
        y++;
        break;
      case false:
        switch (checkFall(x - 1, y + 1)) {
          case true:
            x--;
            y++;
            break;
          case false:
            switch (checkFall(x + 1, y + 1)) {
              case true:
                x++;
                y++;
                break;
              case false:
                //stopped
                // cave[x][y] = "o";
                stop = true;
                return [x, y];
                break;
              case "abyss":
                return "stop";
                break;
            }
            break;
          case "abyss":
            return "stop";
            break;
        }
        break;
      case "abyss":
        return "stop";
        break;
    }
  }
};

//MAIN
const file = getInput("14");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
let [minX, maxX, minY, maxY] = [10000, 0, 10000, 0];
//parse input get min and max
const rockLines = input.map((x) =>
  x
    .replaceAll(" ", "")
    .split("->")
    .map((y) =>
      y.split(",").map((z, iz) => {
        const val = parseInt(z);
        if (iz === 0) {
          if (minX > val) minX = val;
          if (maxX < val) maxX = val;
        } else {
          if (minY > val) minY = val;
          if (maxY < val) maxY = val;
        }
        return val;
      })
    )
);
// console.log(rockLines);
minY = 0; // sand start 500,0
// console.log(minX, maxX, minY, maxY);
let cave = Array(maxX - minX + 1).fill(0); // add edges
cave = cave.map((x) => {
  const arr = Array(maxY + 1).fill("."); // add edges
  return [...arr];
});

//generate cave
rockLines.forEach((line) => {
  line.forEach((coord, ic) => {
    if (ic !== line.length - 1) {
      const nextCoord = line[ic + 1];
      let [dir, far] = [0, 0];
      if (coord[1] === nextCoord[1]) {
        //go X
        // console.log("goX", coord, nextCoord);
        far = Math.abs(nextCoord[0] - coord[0]);
        dir = (nextCoord[0] - coord[0]) / far;
        // console.log("far dir", far, dir);
        for (let i = 0; i <= far; i++) {
          cave[coord[0] - minX + i * dir][coord[1] - minY] = "#";
        }
      } else if (coord[0] === nextCoord[0]) {
        //go Y
        // console.log("goY", coord, nextCoord);
        far = Math.abs(nextCoord[1] - coord[1]);
        dir = (nextCoord[1] - coord[1]) / far;
        // console.log("far dir", far, dir);
        for (let i = 0; i <= far; i++) {
          cave[coord[0] - minX][coord[1] - minY + i * dir] = "#";
        }
      }
    }
  });
});
cave[500 - minX][0 - minY] = "x";

//draw cave
// cave.map((x) => x.join("")).forEach((y) => console.log(y));

//simsand
let stable = false;
while (!stable) {
  const drop = simSand(500 - minX, 0 - minY);
  if (drop !== "stop") {
    cave[drop[0]][drop[1]] = "o";
  } else stable = true;
}

//draw cave
cave.map((x) => x.join("")).forEach((y) => console.log(y));
const result = cave.flat().filter((x) => x === "o");
console.log(result.length);
