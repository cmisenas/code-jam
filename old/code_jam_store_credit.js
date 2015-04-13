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
      testCases = inputs.shift(),
      storeCredits = 0,
      itemCount = 0,
      items = [],
      answers = [];

  for (var i = 1; i <= testCases; i++) {
    storeCredits = inputs[i * 3 - 3];
    itemCount = inputs[i * 3 - 2];
    items = inputs[i * 3 - 1].split(' ');

    answers.push('Case #' + i + ': ' + findItemIndices(storeCredits, itemCount, items).join(' '));
  }

  writeArrToFile(answers);
}

function findItemIndices(credits, count, items) {
  var indices = [],
      index = -1,
      remaining = 0;
  for (var i = 0; i < count; i++) {
    remaining = credits - parseInt(items[i], 10);
    index = items.indexOf(remaining + '', i + 1);
    if (index > -1) {
      indices.push(i + 1, index + 1);
      return indices;
    }
  }
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

