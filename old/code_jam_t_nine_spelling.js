var fs = require("fs"),
    tNineEquivs = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'],
    keyOffset = 2,
    pressOffset = 1;

function main() {
  var filename = process.argv[2];
  if (filename === undefined || filename === null) { throw "No file provided"; }

  fs.readFile(filename, "ascii", function (error, data) {
    if (error !== undefined && error !== null) { throw error; }
    getTNineSpelling(data);
  });
}

function letter(num) {
  return String.fromCharCode(97 + num);
}

function getTNineSpelling(data) {
  var inputs = data.split("\n"),
      testCases = inputs.shift(),
      answers = [];

  for (var i = 1; i <= testCases; i++) {
    answers.push('Case #' + i + ': ' + tNineSpelling(inputs[i - 1].split('')));
  }

  writeArrToFile(answers);
}

function tNineSpelling(letters) {
  var memoized = memoized || [],
      tNineLetters = [];

  for (var i = 0; i < letters.length; i++) {
    tNineLetters.push(spellingLetter(letters[i]));
  }

  return joinTNineWord(tNineLetters);

  function spellingLetter(letter) {
    var index = -1;
    if (memoized[letter] !== undefined && memoized[letter] !== null) { return memoized[letter]; }
    for (var i = 0; i < tNineEquivs.length; i++) {
      if (letter === ' ') { return '0'; }
      index = tNineEquivs[i].indexOf(letter);
      if (index > -1) {
        return memoized[letter] = Array(index + pressOffset + 1).join(i + keyOffset + '');
      }
    }
  }
}

function joinTNineWord(tNineArr) {
  var tNineArrCopy = tNineArr.slice(0);
  for (var i = 1; i < tNineArr.length; i++) {
    if (tNineArr[i].indexOf(tNineArr[i - 1][0]) > -1) { tNineArrCopy[i - 1] = tNineArr[i - 1] + ' '; }
  }
  return tNineArrCopy.join('');
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

