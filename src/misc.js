//http://techslides.com/convert-csv-to-json-in-javascript
//var csv is the CSV file with headers
function csvArr(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }

  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}


//https://stackoverflow.com/questions/11935175/sampling-a-random-subset-from-an-array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function dateDiff(d1, d2) {
  var out = Math.round((d2 - d1) / (1000*60*60*24)) ;
  return(out);
}

function tsd(x) {
  return( ('0' + x).slice(-2) );
}

function dateToString(d) {
  return(tsd(d.getDate())
          + tsd(d.getMonth() + 1 )
          + d.getFullYear().toString());
}
