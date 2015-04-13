var fs = require("fs");

function main() {
  var filename = process.argv[2];
  if (filename === undefined || filename === null) { throw "No file provided"; }

  fs.readFile(filename, "ascii", function (error, data) {
    if (error !== undefined && error !== null) { throw error; }
    findMinScalarProd(data);
  });
}

function findMinScalarProd(data) {
  var inputs = data.split("\n"),
      testCases = inputs.shift(),
      answers = [],
      n,
      scalar1,
      scalar2;


  for (var i = 1; i <= testCases; i++) {
    n = inputs[i * 3 - 3];
    scalar1 = inputs[i * 3 - 2];
    scalar2 = inputs[i * 3 - 1];
    answers.push('Case #' + i + ': ' + calculateMinProd(n, scalar1.split(' '), scalar2.split(' ')));
  }

  writeArrToFile(answers);
}

function calculateMinProd(n, scalar1, scalar2) {
  var numScalar1 = sortScalar(scalar1),
      numScalar2 = sortScalar(scalar2).reverse(),
      sum = 0;

  for (var i = 0; i < n; i++) {
    sum += (numScalar1[i] * numScalar2[i]);
  }

  return sum;
}

function sortScalar(arr) {
  return turnToNum(arr.sort(function(a,b){return parseInt(a, 10) - parseInt(b, 10)}));
}

function turnToNum(arr) {
  var numArr = [];
  for (var i = 0; i < arr.length; i++) {
    numArr[i] = parseInt(arr[i], 10);
  }
  return numArr;
}

function writeArrToFile(arr) {
  fs.writeFile("./output.out", arr.join("\n"), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
}

main();

