function buyFunc(d, item, n, price, freight) {

  addto(n * price + freight, balance.currentAssets, 'Varelager');
  addto(n * price + freight, balance.currentLiabilities, 'Leverandørgjeld');
  addto(n, inventory.count, item);
  //console.log('Buying: ' + dateToString2(d));
  payDate = new Date(d.getFullYear(), d.getMonth() + 3, 0);
  //console.log('Pay date: ' + dateToString2(payDate));
  paymentsDue['order' + dateToString(d)  + item] = {
                          Date: {d: payDate.getDate(), m: payDate.getMonth() + 1, y: payDate.getFullYear()},
                          amount: n * price + freight,
                          add1_obj: balance.currentLiabilities,
                          add1_name: 'Leverandørgjeld',
                          add1_sign: -1,
                          add2_obj: balance.currentAssets,
                          add2_name: 'Bankinnskudd',
                          add2_sign: -1,
                          cfobj_obj: cashFlowStatement.operatingActivities,
                          cfobj_name: 'Utbetaling varekjøp',
                          cfobj_sign: -1
  };
  inventory.detailed['order' + dateToString(d) + item] = {
    name: item,
    n: n,
    p: price + freight/n
  };

  return(dateToString2(payDate) + ':' + n + ' stk. ' + item + ' bestilt for kroner ' + price + ' per stk. <br>');
}

function sellFunc(d, item, n, price) {
  n = Math.max( 0, Math.min(n, inventory.count[item]) );

  addto(-n, inventory.count, item);
  addto(n * price, balance.currentAssets, 'Kundefordringer');
  addto(n * price, result.operatingIncome, 'Salgsinntekt');

  payDate = new Date(d.getFullYear(), d.getMonth() + 3, 0);
  paymentsDue['sale' + dateToString(d) + item] = {
                          Date: {d: payDate.getDate(), m: payDate.getMonth() + 1, y: payDate.getFullYear()},
                          amount: n * price,
                          add1_obj: balance.currentAssets,
                          add1_name: 'Kundefordringer',
                          add1_sign: -1,
                          add2_obj: balance.currentAssets,
                          add2_name: 'Bankinnskudd',
                          add2_sign: 1,
                          cfobj_obj: cashFlowStatement.operatingActivities,
                          cfobj_name: 'Innbetaling fra kunder',
                          cfobj_sign: 1
  };

  return(dateToString2(payDate) + ':' + n + ' stk. ' + item + ' ble solgt for kroner ' + price + 'per stk.<br>');
}


function finishResult() {

  var trs = document.getElementById("tbResult").getElementsByTagName('tr');
  trs[trs.length - 1].cells[0].innerHTML = 'Resultat for ' + dateToday.getFullYear();

  var key, res = 0;
  // Make res from result object.
  for(key in result.operatingIncome)res += result.operatingIncome[key];
  for(key in result.operatingCosts)res -= result.operatingCosts[key];
  for(key in result.financeCosts)res -= result.financeCosts[key];


  document.getElementById("divAssingment").innerHTML +=
    '<br><br>Resultatet ble ' + Math.abs(parseInt2(res)).toLocaleString() + ' kroner i '
    + (res>0?'overskudd':'underskudd') + '.';

  // Updata equity in balance
  if(balance.shareholdersEquity['Udekket tap'] === 0) {
    // Check for negative equity
    var neg_eq = balance.shareholdersEquity['Annen egenkapital'] + res;
    if(neg_eq < 0) {
      addto(neg_eq, balance.shareholdersEquity, 'Udekket tap');
      addto(res - neg_eq, balance.shareholdersEquity, 'Annen egenkapital'); // = 0
    }else {
      addto(res, balance.shareholdersEquity, 'Annen egenkapital');
    }

  }else {
    // Check for positive equity
    var pos_eq = balance.shareholdersEquity['Udekket tap'] + res
    if(pos_eq > 0){
      addto(pos_eq, balance.shareholdersEquity, 'Annen egenkapital');
      addto(res - pos_eq, balance.shareholdersEquity, 'Udekket tap');
    }else {
      addto(res, balance.shareholdersEquity, 'Udekket tap');
    }
  }
}


function updateFinStat() {
  var val, nDays = daysSinceUpdatingFinStat;
  for(var key1 in runningCosts) {
    val = runningCosts[key1].perDay() * nDays;
    //console.log(val + ' added to ' + runningCosts[key1].add1_obj + '.' + runningCosts[key1].add1_name);
    addto(val * runningCosts[key1].add1_sign,
          runningCosts[key1].add1_obj,
          runningCosts[key1].add1_name);
    addto(val * runningCosts[key1].add2_sign,
          runningCosts[key1].add2_obj,
          runningCosts[key1].add2_name);

  }
  daysSinceUpdatingFinStat = 0;

  //Cost of goods sold
  for(var key1 in inventory.count) {

    var n_now = inventory.count[key1];
    var n_before = 0;
    // Find inventory before recent period
    for(var key2 in inventory.detailed) {
      if(inventory.detailed[key2].name === key1) {
        n_before += inventory.detailed[key2].n
      }
    }
    // Find sales
    var n_sold = n_before - n_now;
    // Update inventory and calculate cost of goods sold
    if(n_sold > 0) {
      var costGoodsSold = 0; var n_calc = 0;
      for(var key2 in inventory.detailed) {
        if(inventory.detailed[key2].name === key1) {
          n_tmp = n_sold - n_calc;
          n_calc += Math.min(inventory.detailed[key2].n, n_sold);
          inventory.detailed[key2].n -= n_calc;
          costGoodsSold += n_calc * inventory.detailed[key2].p;
        }
      }
      addto(costGoodsSold, result.operatingCosts, "Varekostnad");
      addto(-costGoodsSold, balance.currentAssets, "Varelager");
    }

  }

}

function corFunc() {
  updateFinStat();
  makeResult();
  makeBalance();
}


function checkForPaymentsDue(d) {
  // Update balance for payable running costs (interests)
  updateFinStat();

  var dDate, obj, p, bool1 = false;

  for(key in paymentsDue){
    dDate = paymentsDue[key].Date
    if(dDate.d === d.getDate()){
      if(dDate.m === (d.getMonth() + 1) | dDate.m === 0){
        if(dDate.y === d.getFullYear() | dDate.y === 0){
          obj = paymentsDue[key];
          p = obj.amount;
          obj.add1_obj[obj.add1_name] += p * obj.add1_sign;
          obj.add2_obj[obj.add2_name] += p * obj.add2_sign;

          // Add to cashFlowStatement
          addto(p * parseInt2(obj.cfobj_sign), obj.cfobj_obj, obj.cfobj_name);

          document.getElementById('pEvent').innerHTML = dateToString2(dateToday) + ': '
                      + (obj.add2_sign > 0 ? 'Innbetalt' : 'Utbetalt')
                      + ' kroner ' + Math.round(p).toLocaleString() + '. Betalingen er knyttet til:  '
                      + obj.add1_name + ' og '
                      + obj.add2_name + '.'
                      + '<br>' + document.getElementById('pEvent').innerHTML;

          //If non repeating (no zeros) remove...            
          if(!bool1)bool1 = true;
        }
      }
    }
  }

  if(bool1){ makeBalance(); makeCashFlowStat();}
}


function makeResult() {
  var tbl = document.getElementById("tbResult");
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
    val = result.operatingIncome[key];
    if(val != 0){
      rw = tbl.insertRow(-1);
      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1)
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();

      sumIncome += val;
    }

  }
  // Operational costs----------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Driftskostnader</b>';
  td.colSpan = 3

  for(var key in result.operatingCosts){
    val = result.operatingCosts[key];
    if(val != 0){
      rw = tbl.insertRow(-1);
      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();
      rw.insertCell(-1)

      sumCost += val;
    }

  }
  // Financial income ---------------------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Finansinntekter</b>';
  td.colSpan = 3

  for(var key in result.financeIncome){
    val = result.financeIncome[key];
    if(val != 0){
      rw = tbl.insertRow(-1);
      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1)
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();

      sumIncome += val;
    }

  }
  // Financial costs----------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Finanskostnader</b>';
  td.colSpan = 3

  for(var key in result.financeCosts){
    val = result.financeCosts[key];

    if(val != 0){
      rw = tbl.insertRow(-1);
      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();
      rw.insertCell(-1);

      sumCost += val;
    }

  }
  // Result -------------------------------------------------------------
  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = 'Forløpig resultat for ' +
    new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + dayNr).getFullYear();
  var res = parseInt2(sumIncome - sumCost);
  if(res > 0) {
    rw.insertCell(-1).innerHTML = (res).toLocaleString();
    rw.insertCell(-1);
  }else {
    rw.insertCell(-1)
    rw.insertCell(-1).innerHTML = (res * -1).toLocaleString();
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
  //alert(id);
  document.getElementById('s_' + x.id).innerHTML = x.value.toLocaleString();
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
    val = balance.currentAssets[key];

    if(val != 0) {
      rw = tbl.insertRow(-1);

      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();
      sum1 += val;
    }

  }

  rw = tbl.insertRow(-1);
  td = rw.insertCell(-1);
  td.innerHTML = '<b>Anleggsmidler</b>';
  td.colSpan = 2
  for(key in balance.longTermAssets){
    val = balance.longTermAssets[key];

    if(val != 0) {
      rw = tbl.insertRow(-1);

      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();
      sum1 += val;
    }

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

    val = balance.currentLiabilities[key];

    if(val != 0) {
      j++;
      if(j < nr){
        rw = trs[j]
      }else{
        rw = tbl.insertRow(-1);
        rw.insertCell(-1);
        rw.insertCell(-1);
      }


      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();
      sum2 += val;
    }
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

    val = balance.longTermLiabilities[key];

    if(val != 0) {
      j++;
      if(j < nr){
        rw = trs[j]
      }else{
        rw = tbl.insertRow(-1);
        rw.insertCell(-1);
        rw.insertCell(-1);
      }


      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();
      sum2 += val;
    }
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
    val = balance.shareholdersEquity[key];

    if(val != 0) {
      j++;
      if(j < nr){
        rw = trs[j]
      }else{
        rw = tbl.insertRow(-1);
        rw.insertCell(-1);
        rw.insertCell(-1);
      }

      rw.insertCell(-1).innerHTML = key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(val).toLocaleString();
      sum2 += val;
    }
  }

  // Preliminery result --------------------------------------------------------
  if(Math.abs(sum1 - sum2) > 1) {
    j++;
    if(j < nr){
      rw = trs[j]
    }else{
      rw = tbl.insertRow(-1);
      rw.insertCell(-1);
      rw.insertCell(-1);
    }

    rw.insertCell(-1).innerHTML = 'Foreløpig resultat for ' + dateToday.getFullYear();
    rw.insertCell(-1).innerHTML = parseInt2(sum1 - sum2).toLocaleString();

    sum2 = sum1;
  }
  // ---------------------------------------------------------------------------

  // sum row at the end
  rw = tbl.insertRow(-1);
  rw.insertCell(-1); rw.insertCell(-1).innerHTML = '<u>' + parseInt2(sum1).toLocaleString() + '</u>';
  rw.insertCell(-1); rw.insertCell(-1).innerHTML = '<u>' + parseInt2(sum2).toLocaleString() + '</u>';
}





function makeCashFlowStat() {
  tbl = document.getElementById("tbCashFlow");
  var trs = tbl.getElementsByTagName('tr');
  var nr = trs.length;

  var i, n, rw, td, val, ival, sum1 = 0, sum2 = 0;
  var boolOA = false; boolIF = false;
  // delete old rows
  for(i = 0; i < nr; i++)tbl.deleteRow(-1);

  // make new table
  rw = tbl.insertRow(-1);
  rw.insertCell(-1).innerHTML = '<b>IB Bankinnskudd</b>';
  rw.insertCell(-1);
  rw.insertCell(-1).innerHTML = cashFlowStatement.ibBank.toLocaleString();

  // Operating activites ----------------------------------------------------
  for(var key in cashFlowStatement.operatingActivities){
    val = cashFlowStatement.operatingActivities[key];

    if(val != 0){
      rw = tbl.insertRow(-1);
      rw.insertCell(-1).innerHTML = (val > 0 ? '+ ' : '- ') + key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(Math.abs(val)).toLocaleString();
      rw.insertCell(-1);

      sum1 += val;
      boolOA = true;
    }

  }
  if(boolOA){
    // Sum if any acitivites
    rw = tbl.insertRow(-1);
    rw.insertCell(-1).innerHTML = '<b>= Kontantoverskudd fra drift</b>'
    rw.insertCell(-1);
    rw.insertCell(-1).innerHTML = parseInt2(sum1).toLocaleString();
  }



  // Investing and financing activites -----------------------------------------
  for(var key in cashFlowStatement.investingActivities){
    val = cashFlowStatement.investingActivities[key];

    if(val != 0){
      rw = tbl.insertRow(-1);
      rw.insertCell(-1).innerHTML = (val > 0 ? '+ ' : '- ') + key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(Math.abs(val)).toLocaleString();
      rw.insertCell(-1);

      sum2 += val;
      boolIF = true;
    }

  }
  // Investing and financing activites -----------------------------------------
  for(var key in cashFlowStatement.financingActivities){
    val = cashFlowStatement.financingActivities[key];
    if(val != 0){
      rw = tbl.insertRow(-1);
      rw.insertCell(-1).innerHTML = (val > 0 ? '+ ' : '- ') + key.toString();
      rw.insertCell(-1).innerHTML = parseInt2(Math.abs(val)).toLocaleString();
      rw.insertCell(-1);

      sum2 += val;
      boolIF = true;
    }

  }
  if(boolIF){
    // Sum if any acitivites
    rw = tbl.insertRow(-1);
    rw.insertCell(-1).innerHTML = '<b>= Kontantoverskudd fra eiere, lån og investeringer</b>'
    rw.insertCell(-1);
    rw.insertCell(-1).innerHTML = parseInt2(sum2).toLocaleString();
  }



  rw = tbl.insertRow(-1);
  rw.insertCell(-1).innerHTML = '<b>UB Bankinnskudd</b>'
  rw.insertCell(-1);
  rw.insertCell(-1).innerHTML = parseInt2(cashFlowStatement.ibBank + sum1 + sum2).toLocaleString();
}
