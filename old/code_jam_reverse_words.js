var fs = require("fs");

function main() {
  var filename = process.argv[2];
  if (filename === undefined || filename === null) { throw "No file provided"; }

  fs.readFile(filename, "ascii", function (error, data) {
    if (error !== undefined && error !== null) { throw error; }
    getReverseWords(data);
  });
}

function getReverseWords(data) {
  var inputs = data.split("\n"),
      testCases = inputs.shift(),
      answers = [];

  for (var i = 1; i <= testCases; i++) {
    answers.push('Case #' + i + ': ' + reverseWords(inputs[i - 1].split(' ')).join(' '));
  }

  writeArrToFile(answers);
}

function reverseWords(arr) {
  return arr.reverse();
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

