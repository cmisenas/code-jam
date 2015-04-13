var fs = require("fs");

function main() {
  var filename = process.argv[2];
  if (filename === undefined || filename === null) { throw "No file provided"; }

  fs.readFile(filename, "ascii", function (error, data) {
    if (error !== undefined && error !== null) { throw error; }
    greatDecision(data);
  });
}

function greatDecision(data) {
  var inputs = data.split("\n"),
      testCases = inputs.shift(),
      answers = [],
      acrobots = 0,
      bouncoids = 0,
      acroPercentage = 0,
      bounPercentage = 0,
      year = 0,
      currentCase = [];

  for (var i = 1; i <= testCases; i++) {
    currentCase = inputs[i - 1].split(' ');
    acrobots = parseInt(currentCase[0], 10);
    bouncoids = parseInt(currentCase[1], 10);
    acroPercentage = parseInt(currentCase[2], 10);
    bounPercentage = parseInt(currentCase[3], 10);
    year = parseInt(currentCase[4], 10);
    answers.push("Case #" + i + ": " + calculateDecision(acrobots, bouncoids, acroPercentage, bounPercentage, year));
  }

  writeArrToFile(answers);
}

function calculateDecision(acrobots, bouncoids, acroPercentage, bounPercentage, year) {
  var decomissioned = 0,
      reproduced = 0,
      acroTotalPopulation = acrobots,
      bounTotalPopulation = bouncoids;

  for (var i = 0; i < year; i++) {
    if(i + 1 === 5050) { break; }
    decomissioned = calculateDecomissioned(acroTotalPopulation, bounTotalPopulation);
    reproduced = calculateReproduced(acroTotalPopulation, bounTotalPopulation, acroPercentage, bounPercentage);
    acroTotalPopulation = acroTotalPopulation + reproduced['acrobots'] - decomissioned['acrobots'];
    bounTotalPopulation = bounTotalPopulation + reproduced['bouncoids'] - decomissioned['bouncoids'];
  }

  return acroTotalPopulation + ' ' + bounTotalPopulation;
}

function calculateDecomissioned(acro, boun) {
  var acroPart = Math.floor(acro * .01),
      bounPart = Math.floor(boun * .01);

  return {'acrobots': acroPart, 'bouncoids': bounPart};
}

function calculateReproduced(acro, boun, acroPercent, bounPercent) {
  var min = Math.min(acro, boun);
  var babies = Math.floor(min * .02);
  var acroPart = Math.floor(babies * (acroPercent/100));
  var bounPart = Math.floor(babies * (bounPercent/100));
  var remaining = babies - acroPart - bounPart;

  if (remaining % 2 === 1) {
    bounPart += 1;
    remaining -= 1;
  }
  acroPart += remaining/2;
  bounPart += remaining/2;

  return {'acrobots': acroPart, 'bouncoids': bounPart};
}

function writeArrToFile(arr) {
  fs.writeFile("./zathras.out", arr.join("\n"), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("The file was saved!");
    }
  });
}

main();

