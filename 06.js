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

const file = getInput("06");
const len = 14 - 1;

for (let i = len; i <= file.length; i++) {
  const cut = file.slice(i - len, i + 1);
  let found = true;
  for (let j = 0; j < len; j++) {
    // console.log(cut.slice(j + 1), cut[j]);
    if (cut.slice(j + 1).includes(cut[j])) found = false;
  }
  if (found) {
    console.log(i + 1);
    break;
  }
}
