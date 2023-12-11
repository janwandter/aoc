const fs = require("fs");

const data = fs.readFileSync("d2", "utf8").split("\n").filter(x => x.length);

const newArr = data.map(x => {
  const minCubes = { red: 0, green: 0, blue: 0 };
  x.split(":")[1].split(";").map(play =>
    play.split(",").map(cube => {
      const [num, color] = cube.trim().split(" ");
      if (parseInt(num) > minCubes[color]) minCubes[color] = parseInt(num);
      return;
    })
  )
  return minCubes;
}).reduce(
  (acc, curr) => acc += curr.red * curr.green * curr.blue, 0
)

console.log(newArr, "data")