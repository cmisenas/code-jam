var fs = require("fs");

function main() {
  var filename = process.argv[2];
  if (filename === undefined || filename === null) { throw "No file provided"; }

  fs.readFile(filename, "ascii", function (error, data) {
    if (error !== undefined && error !== null) { throw error; }
    boxSentences(data);
  });
}

function boxSentences(data) {
  var inputs = data.split("\n"),
      testCases = inputs.shift(),
      answers = [];

  for (var i = 1; i <= testCases; i++) {
    answers.push("Case #" + i + ":\n" + boxSentence(inputs[i - 1]));
  }

  writeArrToFile(answers);
}

function boxSentence(sentence) {
  var sentenceLength = sentence.length + 2,
      borderLength = sentenceLength + 2,
      prettyNote = [noteEdges(sentenceLength),
        "| " + sentence + " |",
        noteEdges(sentenceLength)];
  return prettyNote.join("\n");
}

function noteEdges(length) {
  return "+" + Array(length + 1).join("-") + "+";
}

function writeArrToFile(arr) {
  fs.writeFile("./saturnalia.out", arr.join("\n"), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
}

main();

