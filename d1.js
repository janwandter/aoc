const fs = require("fs");

const data = fs.readFileSync("d1", "utf8").split("\n").filter(x => x.length);

const getNumberX= (x) => {
  const digitArr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  let digit1; let idxDigit1 = Infinity;
  let digit2; let idxDigit2 = -1;
  digitArr.map((digit, index) => {
    if (!x.includes(digit)) return;
    if (x.indexOf(digit) < idxDigit1) {
      idxDigit1 = x.indexOf(digit);
      digit1 = (index + 1).toString();
    }
    if (x.lastIndexOf(digit) > idxDigit2) {
      idxDigit2 = x.lastIndexOf(digit);
      digit2 = (index + 1).toString();
    }
  });
  const numArr = x.split("");
  const first = numArr.findIndex(x => !isNaN(x)) < idxDigit1 && numArr.findIndex(x => !isNaN(x)) > -1 ? numArr.find(x => !isNaN(x)) : digit1;
  const last = numArr.findLastIndex(x => !isNaN(x)) > idxDigit2 && numArr.findLastIndex(x => !isNaN(x)) > -1 ? numArr.findLast(x => !isNaN(x)) : digit2;
  return parseInt(first + last);
}

const calibrate = data.map(x => getNumberX(x)).reduce((a, b) => a + b, 0);
console.log(calibrate, "calibrate");
