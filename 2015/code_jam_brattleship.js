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
  for (var i=1; i <= testCases; i++) {
    answers.push("Case #" + i + ": " + solveCase(inputs[i].split(' ')));
  }
  writeArrToFile(answers);
}

function solveCase(params) {
  var r=parseInt(params[0], 10),
      c=parseInt(params[1], 10),
      w=parseInt(params[2], 10),
      y=0;

  if(c===w){return w;}
  if(w===1){return r*c;}

  y+=Math.floor(c/w);
  y*=r;

  // you can move it but only one extra move would make a difference
  if(c%w>0){y++;}

  y+=(w-1);

  return y;
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
