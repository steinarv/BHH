var assingments = [
  {txt: 'De har valgt selskapsformen <i>aksjeselskap</i> og spytter inn 50 000 kroner hver ved oppstart av driften.<br>'
      + 'For å hente peanøttpoleringsmaskinene ved Oslo Havn, samt oppebavere og levere til kunder trenger de en varebil.<br>'
      + 'Valget har falt på en Ford Transit, 2005 modell til 50 000 kroner. Antatt gjenværende levetid for denne bilen er 10 år <br>.'
      + 'De trenger i den forbindelse hjelp til å avgjøre hvor mye av kjøpet som skal finansieres ved opptak av lån.<br>'
      + 'Renten på det aktuelle lånet er 5% per år med nedbetalingstid på 5 år. '
      + 'Renter og avdrag betales etterskuddsvis den 1.januar <br><br>'
      + 'Størelse på lån: '
      + '<input id="inSldr" type="range" min="0" max="50000" value="0" step="1000" onchange="sliderChange(this)" />'
      + '<p id="pSliderVal">0 kroner<p>',
  timeStp: function(){return(1)},
  mainFunc: function() {
          var loan = parseInt(document.getElementById("inSldr").value);
          addto(50000, balance, 'longTermAssets', 'Varebil');
          addto(loan, balance, 'longTermLiabilities', 'Billaan');
          addto(loan - 50000, balance, 'currentAssets', 'Bankinnskudd');
      },
  eventTxt: function() {
          var loan = parseInt(document.getElementById("inSldr").value);
          return("Varebilen ble finansiert med et lån på kroner " + loan.toLocaleString());
    }
  }
];



var balance = { currentAssets: {Bankinnskudd: 100000},
                longTermAssets: {},
                currentLiabilities: {},
                longTermLiabilities: {},
                shareholdersEquity: {Aksjekapital: 100000}
              };

var assignmentNr = 0;
var nAssignments = 1;

var dayNr = 1;
var baseDate = new Date();
var theDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);

function addto(val, obj, subcat, s) {
  if(typeof obj[subcat][s] === "undefined"){
    obj[subcat][s] = val;
  }else{
    obj[subcat][s] += val;
  }
}

function findInArray(s, arr){
  out = -1;
  for(var i = 0; i < arr.length; i++){
    if(arr[i] == s){
      out = i;
    }
  }

  return(out)
}


function dateFormat(d) {
  var str = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

  return(str);
}

function sliderChange(x) {

  document.getElementById("pSliderVal").innerHTML = x.value.toLocaleString() + " kr";
}

function makeBalance() {
  tbl = document.getElementById("tbBalance");
  var trs = tbl.getElementsByTagName('tr');
  var nr = trs.length;

  var i, n, rw, td, val, sum1 = 0, sum2 = 0;
  // delete old rows
  for(i = 0; i < nr; i++)tbl.deleteRow(-1);

  // make new table

  // Assets ---------------------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Omløpsmidler</b>';
  td.colSpan = 2
  for(key in balance.currentAssets){
    rw = tbl.insertRow(-1);

    val = parseInt(balance.currentAssets[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1).innerHTML = val.toLocaleString();
    sum1 += val;

  }

  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Anleggsmidler</b>';
  td.colSpan = 2
  for(key in balance.longTermAssets){
    rw = tbl.insertRow(-1);

    val = parseInt(balance.longTermAssets[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1).innerHTML = val.toLocaleString();
    sum1 += val;

  }


  // Liabilities and equity----------------------------------------------------
  var trs = tbl.getElementsByTagName('tr');
  var nr = trs.length;
  j = 0

  rw = trs[j]
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Kortsiktig gjeld</b>';
  td.colSpan = 2;
  for(key in balance.currentLiabilities){
    j++;
    if(j < nr){
      rw = trs[j]
    }else{
      rw = tbl.insertRow(-1);
      rw.insertCell(-1);
      rw.insertCell(-1);
    }

    val = parseInt(balance.currentLiabilities[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1).innerHTML = val.toLocaleString();
    sum2 += val;
  }

  j++;
  if(j < nr){
    rw = trs[j]
  }else{
    rw = tbl.insertRow(-1);
    rw.insertCell(-1);
    rw.insertCell(-1);
  }
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Langsiktig gjeld</b>';
  td.colSpan = 2;
  for(key in balance.longTermLiabilities){
    j++;
    if(j < nr){
      rw = trs[j]
    }else{
      rw = tbl.insertRow(-1);
      rw.insertCell(-1);
      rw.insertCell(-1);
    }

    val = parseInt(balance.longTermLiabilities[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1).innerHTML = val.toLocaleString();
    sum2 += val;
  }

  j++;
  if(j < nr){
    rw = trs[j]
  }else{
    rw = tbl.insertRow(-1);
    rw.insertCell(-1);
    rw.insertCell(-1);
  }
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Egenkapital</b>';
  td.colSpan = 2;
  for(key in balance.shareholdersEquity){
    j++;
    if(j < nr){
      rw = trs[j]
    }else{
      rw = tbl.insertRow(-1);
      rw.insertCell(-1);
      rw.insertCell(-1);
    }

    val = parseInt(balance.shareholdersEquity[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1).innerHTML = val.toLocaleString();
    sum2 += val;
  }


  // sum row at the end
  rw = tbl.insertRow(-1);
  rw.insertCell(-1); rw.insertCell(-1).innerHTML = '<u>' + sum1.toLocaleString() + '</u>';
  rw.insertCell(-1); rw.insertCell(-1).innerHTML = '<u>' + sum2.toLocaleString() + '</u>';
}


function onLoadFunc() {

  document.getElementById("tdDate").innerHTML = "Dato: " + dateFormat(theDate);

  document.getElementById("divAssingment").innerHTML = assingments[0].txt;

  makeBalance();
}


function nxtFunc() {

  if(assignmentNr >= nAssignments)return;

  document.getElementById("tdDate").innerHTML = "Dato: "
    + dateFormat(new Date(theDate.getFullYear(), theDate.getMonth(), theDate.getDate() + dayNr));

  assingments[assignmentNr].mainFunc();
  document.getElementById("pEvent").innerHTML = assingments[assignmentNr].eventTxt();
  makeBalance();

  dayNr += assingments[assignmentNr].timeStp();
  assignmentNr++;
}
