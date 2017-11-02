var itemList = [ {name: "Kano", mInPrice: 2000, q0: 50, q1: 1/50},
                  {name: "Hockypuck", mInPrice: 30, q0: 10000, q1: 100},
                  {name: "Fiskestang", mInPrice: 100, q0: 1000, q1: 3},
                  {name: "El-scooter", mInPrice: 3000, q0: 200, q1: 1/20},
                  {name: "Tastatur", mInPrice: 50, q0: 200, q1: 1/2},
                  {name: "Proteinpulver", mInPrice: 30, q0: 100, q1: 1/3},
                  {name: "Drone", mInPrice: 1000, q0: 300, q1: 1/15},
                  {name: "Hodelykt", mInPrice: 100, q0: 1000, q1: 5}
                ];

var orderList = [];
var inventoryList = [];
var bankValue = 100000;
var period = 1;
var baseDate = new Date();
var theDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + period, 1);

var nxtBtn = document.getElementById("nxtBtn");

var numericInput = document.createElement("INPUT");
numericInput.setAttribute("type", "number");
numericInput.setAttribute("value", "0");
numericInput.min = 0;

function dateFormat(d) {
  var str = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();

  return(str);
}

findItemInInventoryList = function(itemName) {
    for(var i = 0; i < inventoryList.length; i++) {
      if(inventoryList[i]['name'] === itemName) {
        return i;
      }
    }
    return(-1);
}

function makeOrderList() {
    orderList = getRandomSubarray(itemList, 3);
    // Herer we can alter porperties
    for(var i = 0; i < orderList.length; i++) {
      orderList[i].q0 *= (Math.random() * 0.2 + 0.9);
    }
}

function purchFunc(){
  var orderCountArr = document.getElementsByName("purchaseCount");
  var pSaldo = document.getElementById("tdBank");
  var totalCost = 0;
  for(var i = 0; i < orderCountArr.length; i++){
    totalCost += orderList[i]['mInPrice'] * orderCountArr[i].value;
  }


  pSaldo.innerHTML = "Saldo: " + (bankValue - totalCost).toLocaleString();
  if(totalCost <= bankValue){
    pSaldo.style.color = "#ffffff";
    buyBtn.disabled = false;
  }else{
    pSaldo.style.color = "#ff333f";
    buyBtn.disabled = true;
  }

}

function updateInventoryTable() {

  var tbl = document.getElementById("tbInventory");
  var trs = tbl.getElementsByTagName('tr');
  var nr = trs.length;

  var i, n, rw, tmpInp;
  // delete old table
  for(i = 1; i < nr; i++)tbl.deleteRow(-1);

  // make new table
  for(i = 0; i < inventoryList.length; i++) {
    n = parseInt(inventoryList[i]['n']);
    if(n > 0){
      rw = tbl.insertRow(-1);

      rw.insertCell(-1).innerHTML = inventoryList[i]['name'];
      rw.insertCell(-1).innerHTML = n.toString();
      rw.insertCell(-1).innerHTML = inventoryList[i]['inPrice'];

      tmpInp = numericInput.cloneNode(true);
      tmpInp.setAttribute("id", "s_" + inventoryList[i]['name']);
      tmpInp.setAttribute("name", "salesPrice");
      rw.insertCell(-1).appendChild(tmpInp);
    }
  }
}

function onLoadFunc() {
  document.getElementById("tdBank").innerHTML = "Saldo: " + bankValue.toLocaleString();
  document.getElementById("tdDate").innerHTML = "Dato: " + dateFormat(theDate);

  makeOrderList();
  var tbl = document.getElementById("tbOrders");

  for(var i = 0; i < orderList.length; i++) {
    var rw = tbl.insertRow(-1);

    rw.insertCell(-1).innerHTML = orderList[i]['name'];
    rw.insertCell(-1).innerHTML = orderList[i]['mInPrice'];

    var tmpInp = numericInput.cloneNode(true);
    tmpInp.setAttribute("id", "o_" + orderList[i]['name']);
    tmpInp.setAttribute("oninput", "purchFunc()");
    tmpInp.setAttribute("name", "purchaseCount");
    rw.insertCell(-1).appendChild(tmpInp);

  }

}

buyFunc = function() {

  // update inventoryList
  var itemName, inPrice, n, j;
  var eventTxt = document.getElementById("pEvent");
  var orderCountArr = document.getElementsByName("purchaseCount");
  for(var i = 0; i < orderCountArr.length; i++){

    n = parseInt(orderCountArr[i].value);
    if(n > 0) {
      //check if item allready is in storage
      inPrice = orderList[i]['mInPrice'];
      itemName = orderCountArr[i].id.substr(2);
      j = findItemInInventoryList(itemName);

      eventTxt.innerHTML = n.toString() + " " + itemName + " kjøpt for " + inPrice.toString() + ".<br>"
                          + eventTxt.innerHTML;

      // If allready in inventoryList add to, else push
      if(j >= 0){
        inventoryList[j]['n'] += n;
      }else{
        inventoryList.push( {name: itemName, n: n, inPrice: inPrice,
                              q0:  orderList[i]['q0'], q1: orderList[i]['q1']} );
      }
      // update bank roll
      bankValue -= n * inPrice;
      // set table element to zero
      orderCountArr[i].value = 0;
    }
  }


  updateInventoryTable();
}

nxtFunc = function() {
  // array with same order as inventoryList
  var salesPriceArr = document.getElementsByName("salesPrice");
  // Turnover table
  var tbl = document.getElementById("tbTurnover");

  var eventTxt = document.getElementById("pEvent");
  var j, Qp, nSold, salesPrice, itemName;

  for(var i = 0; i < salesPriceArr.length; i++){
    salesPrice = parseInt(salesPriceArr[i].value);
    // Find index of inventoryList
    itemName = salesPriceArr[i].id.substr(2);
    j = findItemInInventoryList(itemName);
    // Demand
    Qp = inventoryList[j].q0 - inventoryList[j].q1 * salesPrice;
    // Number sold
    nSold = Math.min(Math.max(Qp, 0), parseInt(inventoryList[j]['n']));
    nSold = parseInt(nSold);

    if(nSold > 0) {
      // update bank balance
      bankValue += nSold * salesPrice;
      // remove from inventory list
      inventoryList[j].n -= nSold;
      // add to event text
      eventTxt.innerHTML = nSold.toString() + " " + itemName + " solgt for " + salesPrice.toString() + ".<br>"
                + eventTxt.innerHTML;
      // add to to turnover table
      rw = tbl.insertRow(-1);

      rw.insertCell(-1).innerHTML = theDate.getMonth() + 1 + "-" + theDate.getFullYear();
      rw.insertCell(-1).innerHTML = itemName;
      rw.insertCell(-1).innerHTML = salesPrice.toLocaleString();
      rw.insertCell(-1).innerHTML = nSold.toLocaleString();
    }
  }

  document.getElementById("tdBank").innerHTML = "Saldo: " + bankValue.toLocaleString();

  //document.getElementById("pEvent").innerHTML = eventTxt;
  updateInventoryTable();
  period++;
  theDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + period, 1);
  document.getElementById("tdDate").innerHTML = "Dato: " + dateFormat(theDate);

  if(bankValue >= 1000000){
    document.getElementById("pRes").innerHTML = "Gratulerer, du brukte "
      + period + " måneder på å bli millionær!";
  }
}
