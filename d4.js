const fs = require("fs");

const data = fs.readFileSync("d4", "utf8").split("\n").filter(x => x.length);
const arrMap = data.map(x => x.split(":")[1]).map(x => x.split("|").map(y => y.split(" ").filter(z => z.length)));
const wins = new Array(data.length).fill(1);

const checkDict = (dict, arr, idx) => {
  const it = wins[idx];
  for (i = 0; i < it; i++) {
    let counter = idx;
    arr.map(x => {
      if (!dict[x]) return;
      wins[++counter]++;
    });
  }
}

const res = arrMap.map((x, idx) => {
  let wDict = {};
  x[0].forEach(y => wDict[y] = 1);
  checkDict(wDict, x[1], idx);
})

const ans = wins.reduce((acc, curr) => acc + curr, 0);
console.log(ans);