var fs = require("fs"),
    TABLE= {
      '1': {
        '1': '1',
        'i': 'i',
        'j': 'j',
        'k': 'k'
      },
      'i': {
        '1': 'i',
        'i': '-1',
        'j': 'k',
        'k': '-j'
      },
      'j': {
        '1': 'j',
        'i': '-k',
        'j': '-1',
        'k': 'i'
      },
      'k': {
        '1': 'k',
        'i': 'j',
        'j': '-i',
        'k': '-1'
      }
    };


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
  for (var i=1, t=1; t <= testCases; t++, i+=2) {
    answers.push("Case #" + t + ": " + solveCase(inputs[i].split(' '), inputs[i+1]));
  }
  writeArrToFile(answers);
}

function solveCase(params, str) {
  var prodI=prodJ=prodK=strI=strJ=strK='',
      finalProd='',
      l = parseInt(params.shift(), 10),
      x = parseInt(params.shift(), 10);
  console.log(x);
  var str = new Array(x+1).join(str),
      strArr = str.split('');

  if(l===1 || str.length<3){return "NO";}
  if(str.length===3 && str==='ijk'){return "YES";}

  for(var i=0; i<strArr.length; i++){
    if(finalProd.length===0){finalProd=strArr[i];}else{finalProd=multiplyQuatStr(finalProd+strArr[i]);}
  }
  if(finalProd==='-1'){
    /*******BRUTE FORCE*******/
    for(var i=0; i<(strArr.length-2); i++){
      strI += strArr[i];
      if(prodI.length===0){prodI=strArr[i];}else{prodI=multiplyQuatStr(prodI+strArr[i]);}

      if(prodI==='i'){//i is found
        for(var j=i+1; j<(strArr.length-1); j++){
          strJ += strArr[j];
          prodJ = multiplyQuatStr(prodJ+strArr[j]);

          if(prodJ==='j'){//j is found
            strK += strArr.slice(j+1).join('');
            prodK=multiplyQuatStr(strK);
            if(prodK==='k'){return "YES";}
          }
        }
        strJ=strK='';
      }
    }
    /*****BRUTE FORCE END*****/
  }

  return "NO";
}

function multiplyQuatStr(str){
  var strArr=str.split(''),
      index=strArr.indexOf('-');
  if(index>-1){
    strArr.splice(index,1);
    strArr[index]='-'+strArr[index];
  }
  var prod=strArr.shift();
  for(var i = 0; i < strArr.length; i++){
    prod = multiplyQuat(prod, strArr[i]);
  }
  return prod;
}

function multiplyQuat(first, second){
  var absFirst=first.replace('-', ''),
      absSecond=second.replace('-', '');
  var product = TABLE[absFirst][absSecond];
  if((isNegative(first) && !isNegative(second)) || (isNegative(second) && !isNegative(first))){
    if(isNegative(product)){product=product.replace('-','');}else{product='-'+product;}
  }
  return product;
}

function isNegative(chr){
  return chr.indexOf('-') > -1;
}

function getNegatives(str) {
  return str.match(/(ii|jj|kk|ik|ji|kj)/g) || [];
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

