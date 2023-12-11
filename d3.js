const fs = require("fs");
const { parse } = require("path");

const data = fs.readFileSync("d3", "utf8").split("\n").filter(x => x.length);
const arrMap = data.map(x => x.split(""));
const revisedNum = arrMap.map(x => x.map(y => 0));
const targetedSym = {};
let sum = 0;


const checkNeighbors = (x, y) => {
  for (let i = y - 1; i <= y + 1; i++) {
    if (i < 0 || i >= arrMap.length) continue;
    for (let j = x - 1; j <= x + 1; j++) {
      if (j < 0 || j >= arrMap[i].length) continue;
      if (isNaN(arrMap[i][j]) && arrMap[i][j] === "*" ) return [j, i];
    }
  }
  return false;
}

const hasNeighbors = (init, last, y) => {
  for (let i = init; i < last; i++) {
    if (checkNeighbors(i, y)) return checkNeighbors(i, y);
  }
  return false;
}


const buildNum = (x, y) => {
  let num = x;
  let num2 = x;
  while (!isNaN(arrMap[y][num - 1]) && num > 0) {
    revisedNum[y][num - 1] = 1;
    num--;
  }
  while (!isNaN(arrMap[y][num2 + 1]) && num2 < arrMap[y].length - 1) {
    revisedNum[y][num2 + 1] = 1;
    num2++;
  }
  console.log(data[y].substring(num, num2 + 1))
  if (hasNeighbors(num, num2 + 1, y)) {
    let [posx, posy] = hasNeighbors(num, num2 + 1, y);
    (!targetedSym[`${posx},${posy}`]) ? targetedSym[`${posx},${posy}`] = [parseInt(data[y].substring(num, num2 + 1))] : targetedSym[`${posx},${posy}`].push(parseInt(data[y].substring(num, num2 + 1)));
  }
}

arrMap.forEach((row, y) => {
  row.forEach((part, x) => {
    if (!isNaN(part) && revisedNum[y][x] === 0) {
      buildNum(x, y);
    }
  })
})

console.log(targetedSym);
Object.values(targetedSym).forEach((val) => {
  if (val.length === 2) {
    sum += val.reduce((acc, curr) => acc * curr, 1);
  }
})

console.log(sum, "sum"  )