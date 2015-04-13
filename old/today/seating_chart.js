var fs = require("fs");

function main() {
  var filename = process.argv[2];
  if (filename === undefined || filename === null) { throw "No file provided"; }

  fs.readFile(filename, "ascii", function (error, data) {
    if (error !== null) { throw error; }
    seatingChart(data);
  });
}

function seatingChart(data) {
  var inputs = data.split("\n"),
      testCases = inputs.shift(),
      numberOfPeople = 0,
      numberOfTable = 0,
      currentCase = [],
      answers = [];

  for (var i = 1; i <= testCases; i++) {
    currentCase = inputs[i - 1].split(' ');
    numberOfPeople = parseInt(currentCase[0], 10);
    numberOfTables = parseInt(currentCase[1], 10);
    console.log(numberOfPeople, numberOfTables);
    answers.push("Case #" + i + ":\n" + calculateSeatingArrangements(numberOfPeople, numberOfTables));
  }

  writeArrToFile(answers);
}

function getAllPermutations(people, tables) {
  var startPerm = initializePermutationAsString(people),
      resultPerm = [],
      per = [];

  function permutations(arrp) {
    for (var i = 0; i < arrp.length; i++) {
      var elem = arrp.splice(i, 1)[0];
      resultPerm.push(elem);
      if (arrp.length === 0)
        per.push(resultPerm.slice());
      permutations(arrp);
      arrp.splice(i, 0, elem);
      resultPerm.pop();
    }
    return per;
  }

  return permutations(startPerm.split(''));
}

function calculateSeatingArrangements(people, tables) {
  var minNumberOfPeople = Math.round(people/tables),
      arrangements = initializeNestedArr(people),
      totalArrangements = 0,
      currentArrangement = [],
      allPermutations = getAllPermutations(people, tables);

  for (var i = 0; i < allPermutations.length; i++) {
    currentArrangement = divideStringEvenly(allPermutations[i], tables);
    if (isExistingArrangement(arrangements, currentArrangement)) {
      continue;
    }
    totalArrangements++;
  }
}

function divideStringEvenly(str, divisor) {
  var max = Math.round(str.length/divisor);
  var strArr = [];
  var currentDivision = [];

  for (var i = 1; i <= divisor; i++) {
    currentDivision.push(str.substring(i * max - 2, i * max));
    strArr.push(currentDivision);
  }
  return strArr;
}

function isExistingArrangement(arrangements, arrangementToCompare) {
  for (var i = 0; i < arrangements.length; i++) {
    return true;
  }
  return false;
}

function initializePermutationAsString(n) {
  var permStr = '';
  for (var i = 0; i < n; i++) {
    permStr += i;
  }
  console.log(permStr);
  return permStr;
}

function initializeNumArr(n) {
  var arr = [];
  while(n--) { arr.push(n); }
  return arr;
}

function initializeNestedArr(n) {
  var arr = [];
  while(n--) { arr.push([]); }
  return arr;
}

function writeArrToFile(arr) {
  fs.writeFile("./seating_chart.out", arr.join("\n"), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
}

main();

