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

  for (var i = 1; i <= testCases; i++) {
    answers.push("Case #" + i + ": " + solveCase(inputs[i]));
  }

  writeArrToFile(answers);
}

function solveCase(input) {
  var input = input.split(" "),
       max = input.shift(),
      levels = input.shift().split(""),
      totalAudience = 0,
      friendsNeeded = 0,
      audience;

  for (var i = 1; i <= max; i++) {
    audience = parseInt(levels[i-1], 10);

    totalAudience += audience;
    if (totalAudience < i) {
      friendsNeeded += (i - totalAudience);
      totalAudience += (i - totalAudience);
    }
  }

  return friendsNeeded;
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

