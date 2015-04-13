var fs = require("fs");

function main() {
  var filename = process.argv[2];
  if (filename === undefined || filename === null) { throw "No file provided"; }

  fs.readFile(filename, "ascii", function (error, data) {
    if (error !== undefined && error !== null) { throw error; }
    doSomethingWithInput(data);
  });
}

function doSomethingWithInput(data) {
  var inputs = data.split("\n"),
      testCases = inputs[0],
      answers = [];

  for (var i = 1; i <= testCases; i+=2) {
    answers.push("Case #" + i + ": " + solveCase(inputs[i], inputs[i+1]));
  }

  writeArrToFile(answers);
}

function solveCase(diners, pancakes) {
  var minutes = 1,
      pancakes = pancakes.split('');

  return minutes;
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

