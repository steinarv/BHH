function updateFinStat() {
  var val, nDays = daysSinceUpdatingFinStat;
  for(var key1 in runningCosts) {
    val = runningCosts[key1].perDay() * nDays;

    addto(val * runningCosts[key1].add1_sign,
          runningCosts[key1].add1_obj,
          runningCosts[key1].add1_name);
    addto(val * runningCosts[key1].add2_sign,
          runningCosts[key1].add2_obj,
          runningCosts[key1].add2_name);

  }
  daysSinceUpdatingFinStat = 0;
}

function corFunc() {
  updateFinStat();
  makeResult();
  makeBalance();
}





function makeResult() {
  tbl = document.getElementById("tbResult");
  var trs = tbl.getElementsByTagName('tr');
  var nr = trs.length;

  var i, n, rw, td, val, sumIncome = 0, sumCost = 0;
  // delete old rows
  for(i = 1; i < nr; i++)tbl.deleteRow(-1);

  // make new table
  // Operational income ---------------------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Driftsinntekter</b>';
  td.colSpan = 3

  for(var key in result.operatingIncome){
    rw = tbl.insertRow(-1);

    val = parseInt(result.operatingIncome[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1)
    rw.insertCell(-1).innerHTML = val.toLocaleString();

    sumIncome += val;
  }
  // Operational costs----------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Driftskostnader</b>';
  td.colSpan = 3

  for(var key in result.operatingCosts){
    rw = tbl.insertRow(-1);

    val = parseInt(result.operatingCosts[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1).innerHTML = val.toLocaleString();
    rw.insertCell(-1)

    sumCost += val;
  }
  // Financial income ---------------------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Finansinntekter</b>';
  td.colSpan = 3

  for(var key in result.financeIncome){
    rw = tbl.insertRow(-1);

    val = parseInt(result.financeIncome[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1)
    rw.insertCell(-1).innerHTML = val.toLocaleString();

    sumIncome += val;
  }
  // Financial costs----------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Finanskostnader</b>';
  td.colSpan = 3

  for(var key in result.financeCosts){
    rw = tbl.insertRow(-1);

    val = parseInt(result.financeCosts[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1).innerHTML = val.toLocaleString();
    rw.insertCell(-1);

    sumCost += val;
  }
  // Result -------------------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = 'Forløpig resultat for ' +
    new Date(theDate.getFullYear(), theDate.getMonth(), theDate.getDate() + dayNr).getFullYear();
  var res = sumIncome - sumCost;
  if(res > 0) {
    rw.insertCell(-1).innerHTML = res;
    rw.insertCell(-1);
  }else {
    rw.insertCell(-1)
    rw.insertCell(-1).innerHTML = res * -1;
  }
}





function addto(val, obj, s) {
  if(typeof obj[s] === "undefined"){
    obj[s] = val;
  }else{
    obj[s] += val;
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





function makeCashFlowStat() {
  tbl = document.getElementById("tbCashFlow");
  var trs = tbl.getElementsByTagName('tr');
  var nr = trs.length;

  var i, n, rw, td, val, sum1 = 0, sum2 = 0;
  var boolOA = false; boolIF = false;
  // delete old rows
  for(i = 0; i < nr; i++)tbl.deleteRow(-1);

  // make new table
  rw = tbl.insertRow(-1);
  rw.insertCell(-1).innerHTML = '<b>IB Bankinnskudd</b>';
  rw.insertCell(-1);
  rw.insertCell(-1).innerHTML = cashFlowStatement.ibBank.toString();

  // Operating activites ----------------------------------------------------
  for(var key in cashFlowStatement.operatingActivites){
    rw = tbl.insertRow(-1);

    val = parseInt(cashFlowStatement.operatingActivites[key]);
    rw.insertCell(-1).innerHTML = key.toString();
    rw.insertCell(-1).innerHTML = val.toLocaleString();


    sum1 += val;
    boolOA = true;
  }
  if(boolOA){
    // Sum if any acitivites
    rw = tbl.insertRow(-1);
    rw.insertCell(-1).innerHTML = '<b>= Kontantoverskudd fra drift</b>'
    rw.insertCell(-1);
    rw.insertCell(-1).innerHTML = sum1.toLocaleString();
  }



  // Operating activites ----------------------------------------------------
  for(var key in cashFlowStatement.investingActivities){
    rw = tbl.insertRow(-1);

    val = parseInt(cashFlowStatement.investingActivities[key]);
    rw.insertCell(-1).innerHTML = (val > 0 ? '+ ' : '- ') + key.toString();
    rw.insertCell(-1).innerHTML = Math.abs(val).toLocaleString();
    rw.insertCell(-1);

    sum2 += val;
    boolIF = true;
  }
  // Investing and financing activites -----------------------------------------
  for(var key in cashFlowStatement.financingActivities){
    rw = tbl.insertRow(-1);

    val = parseInt(cashFlowStatement.financingActivities[key]);
    rw.insertCell(-1).innerHTML = (val > 0 ? '+ ' : '- ') + key.toString();
    rw.insertCell(-1).innerHTML = Math.abs(val).toLocaleString();
    rw.insertCell(-1);

    sum2 += val;
    boolIF = true;
  }
  if(boolIF){
    // Sum if any acitivites
    rw = tbl.insertRow(-1);
    rw.insertCell(-1).innerHTML = '<b>= Kontantoverskudd fra eiere, lån og investeringer</b>'
    rw.insertCell(-1);
    rw.insertCell(-1).innerHTML = sum2.toLocaleString();
  }



  rw = tbl.insertRow(-1);
  rw.insertCell(-1).innerHTML = '<b>UB Bankinnskudd</b>'
  rw.insertCell(-1);
  rw.insertCell(-1).innerHTML = (cashFlowStatement.ibBank + sum1 + sum2).toLocaleString();
}
