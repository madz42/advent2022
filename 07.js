// https://adventofcode.com/2022/day/7

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

const decodeCommand = (arr) => {
  if (arr[1] === "cd") {
    //change dir
    if (arr[2] === "..") {
      //go up
      const getParent = disk.find((x) => x.id === curDir);
      curDir = getParent.parent;
      curLvl--;
    } else if (arr[2] === "/") {
      //go root id 0
      curDir = 0;
      curLvl = 0;
    } else {
      //enter dir
      //arr[2]
      const currentDirectory = disk.find((x) => x.id === curDir);
      currentDirectory.content.forEach((x) => {
        const dir = disk.find((z) => z.id === x);
        if (dir.name === arr[2]) {
          curDir = x;
          curLvl++;
        }
      });
    }
  } else if (arr[1] === "ls") {
    //ignore list command log
  }
};

const addFile = (arr) => {
  //add file
  curId++;
  const file = {
    id: curId,
    name: arr[1],
    size: parseInt(arr[0]),
    content: "file",
    parent: curDir,
    level: curLvl + 1,
  };
  disk.push(file);
  disk = disk.map((x) => {
    if (x.id === curDir) {
      return { ...x, content: [...x.content, curId] };
    } else return x;
  });
};

const addDir = (arr) => {
  //add dir
  curId++;
  const dir = {
    id: curId,
    name: arr[1],
    size: "",
    content: [],
    parent: curDir,
    level: curLvl + 1,
  };
  disk.push(dir);
  //add new content to parent
  disk = disk.map((x) => {
    if (x.id === curDir) {
      return { ...x, content: [...x.content, curId] };
    } else return x;
  });
};

const decodeLine = (line) => {
  //   console.log(curDir);
  const arr = line.split(" ");
  if (arr[0] === "$") {
    //command
    return decodeCommand(arr);
  } else if (arr[0] === "dir") {
    //dir
    return addDir(arr);
  } else {
    //file
    return addFile(arr);
  }
};

const smallestToDelete = (require) => {
  const total = 70000000;
  const free = total - disk[0].size;
  const need = require - free;
  const pack = disk
    .filter((x) => x.content !== "file" && x.size >= need)
    .map((s) => s.size);
  return Math.min(...pack);
};

const getDirsSmaller = (topsize) => {
  const maxLvl = Math.max(...disk.map((x) => x.level));
  const pack = disk.filter((x) => x.content !== "file" && x.size <= topsize);
  return pack.map((x) => x.size).reduce((s, e) => s + e);
};

const calcAllSizes = () => {
  const maxLvl = Math.max(...disk.map((x) => x.level));
  for (let i = maxLvl; i >= 0; i--) {
    disk = disk.map((x) => {
      if (x.level === i && x.content !== "file") {
        let sum = 0;
        x.content.forEach((y) => {
          sum += disk.find((z) => z.id === y).size;
        });
        return { ...x, size: sum };
      } else return x;
    });
  }
};

//MAIN
const file = getInput("07");
const input = file.split(/\r?\n/).filter((x) => x.length > 0);
//parse input
let disk = [];
disk.push({
  id: 0,
  name: "/",
  size: "",
  content: [],
  parent: "root",
  level: 0,
});
let curDir = 0;
let curId = 0;
let curLvl = 0;
input.forEach((l) => decodeLine(l));
calcAllSizes();
// console.log(disk);

console.log("Part I:");
console.log(getDirsSmaller(100000));

console.log("Part II:");
console.log(smallestToDelete(30000000));
