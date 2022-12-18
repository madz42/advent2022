// https://adventofcode.com/2022/day/18

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

const part1 = () => {
  //check X
  let connects = 0;
  for (let i = 0; i < space.length - 1; i++) {
    //fix i at x
    for (let j = 0; j < space.length; j++) {
      for (let k = 0; k < space.length; k++) {
        if (space[i][j][k] + space[i + 1][j][k] === 2) connects++;
      }
    }
  }
  //check Y
  for (let i = 0; i < space.length - 1; i++) {
    //fix i at y
    for (let j = 0; j < space.length; j++) {
      for (let k = 0; k < space.length; k++) {
        if (space[j][i][k] + space[j][i + 1][k] === 2) connects++;
      }
    }
  }
  //check Z
  for (let i = 0; i < space.length - 1; i++) {
    //fix i at z
    for (let j = 0; j < space.length; j++) {
      for (let k = 0; k < space.length; k++) {
        if (space[j][k][i] + space[j][k][i + 1] === 2) connects++;
      }
    }
  }
  return connects;
};

const markOuterAir = () => {
  //mark outer air
  //check X
  //fix i at x
  for (let j = 0; j < space.length; j++) {
    for (let k = 0; k < space.length; k++) {
      for (let i = 0; i < space.length - 1; i++) {
        if (space[i][j][k] !== 1) space[i][j][k] = 9;
        if (space[i + 1][j][k] === 1) break;
      }
    }
  }
  //fix i at x
  for (let j = 0; j < space.length; j++) {
    for (let k = 0; k < space.length; k++) {
      for (let i = space.length - 1; i > 0; i--) {
        if (space[i][j][k] !== 1) space[i][j][k] = 9;
        if (space[i - 1][j][k] === 1) break;
      }
    }
  }
  // check Y
  // fix i at y
  for (let j = 0; j < space.length; j++) {
    for (let k = 0; k < space.length; k++) {
      for (let i = 0; i < space.length - 1; i++) {
        if (space[j][i][k] !== 1) space[j][i][k] = 9;
        if (space[j][i + 1][k] === 1) break;
      }
    }
  }
  for (let j = 0; j < space.length; j++) {
    for (let k = 0; k < space.length; k++) {
      for (let i = space.length - 1; i > 0; i--) {
        if (space[j][i][k] !== 1) space[j][i][k] = 9;
        if (space[j][i - 1][k] === 1) break;
      }
    }
  }
  //check Z
  //fix i at z
  for (let j = 0; j < space.length; j++) {
    for (let k = 0; k < space.length; k++) {
      for (let i = 0; i < space.length - 1; i++) {
        if (space[j][k][i] !== 1) space[j][k][i] = 9;
        if (space[j][k][i + 1] === 1) break;
      }
    }
  }
  //fix i at z
  for (let j = 0; j < space.length; j++) {
    for (let k = 0; k < space.length; k++) {
      for (let i = space.length - 1; i > 0; i--) {
        if (space[j][k][i] !== 1) space[j][k][i] = 9;
        if (space[j][k][i - 1] === 1) break;
      }
    }
  }
};

const checkRestAir = () => {
  //check rest of air
  let last = false;
  while (!last) {
    last = true;
    for (let i = 1; i < space.length - 2; i++) {
      for (let j = 1; j < space.length - 2; j++) {
        for (let k = 1; k < space.length - 2; k++) {
          if (space[i][j][k] === 0) {
            if (
              space[i + 1][j][k] === 9 ||
              space[i - 1][j][k] === 9 ||
              space[i][j + 1][k] === 9 ||
              space[i][j - 1][k] === 9 ||
              space[i][j][k + 1] === 9 ||
              space[i][j][k - 1] === 9
            ) {
              space[i][j][k] = 9;
              last = false;
            }
          }
        }
      }
    }
  }
};

const showSpace = () => {
  space.forEach((z, iz) => {
    console.log(iz);
    z.forEach((x) => console.log(x.join("")));
  });
};

const part2 = () => {
  //count surfaces
  let surfaces = 0;
  for (let i = 1; i < space.length - 1; i++) {
    for (let j = 1; j < space.length - 1; j++) {
      for (let k = 1; k < space.length - 1; k++) {
        if (space[i][j][k] === 1) {
          if (space[i + 1][j][k] === 9) surfaces++;
          if (space[i - 1][j][k] === 9) surfaces++;
          if (space[i][j + 1][k] === 9) surfaces++;
          if (space[i][j - 1][k] === 9) surfaces++;
          if (space[i][j][k + 1] === 9) surfaces++;
          if (space[i][j][k - 1] === 9) surfaces++;
        }
      }
    }
  }
  return surfaces;
};

//MAIN RUN
const file = getInput("18");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
// console.log(input);
const drops = input.map((i) => i.split(",").map((k) => parseInt(k)));
const totalDrops = drops.length;
console.log("Total lava blocks:", totalDrops);
const minC = Math.min(
  Math.min(...drops.map((x) => x[0])),
  Math.min(...drops.map((y) => y[1])),
  Math.min(...drops.map((z) => z[2]))
);
const maxC = Math.max(
  Math.max(...drops.map((x) => x[0])),
  Math.max(...drops.map((y) => y[1])),
  Math.max(...drops.map((z) => z[2]))
);
// console.log(minC, maxC);
//put data in
let space = new Array(maxC + 3).fill(0);
space = space.map((x) => new Array(maxC + 3).fill(0));
space = space.map((x) => x.map((z) => new Array(maxC + 3).fill(0)));
drops.forEach((i) => {
  space[i[0] + 1][i[1] + 1][i[2] + 1] = 1;
});

//PART1
console.log("PART 1:", totalDrops * 6 - part1() * 2);

//PART2
markOuterAir();
checkRestAir();
console.log("PART 2:", part2());

// showSpace();
