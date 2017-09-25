var itemList = [ {name: "Kano", mInPrice: 2000, outPrice0: 10000, outPrice1: 10},
                  {name: "Hockypuck", mInPrice: 30, outPrice0: 300, outPrice1: 5},
                  {name: "Fiskestang", mInPrice: 100, outPrice0: 1000, outPrice1: 4},
                  {name: "El-scooter", mInPrice: 3000, outPrice0: 6000, outPrice1: 0.001},
                  {name: "Tastatur", mInPrice: 50, outPrice0: 400, outPrice1: 0.01},
                  {name: "Proteinpulver", mInPrice: 30, outPrice0: 200, outPrice1: 0.05},
                  {name: "Drone", mInPrice: 1000, outPrice0: 3000, outPrice1: 0.0001},
                  {name: "Hodelykt", mInPrice: 100, outPrice0: 1000, outPrice1: 0.001}
                ];

var orderList = [];
var inventoryList = [];
var bankValue = 100000;
var period = 1;

var nxtBtn = document.getElementById("nxtBtn");

var numericInput = document.createElement("INPUT");
numericInput.setAttribute("type", "number");
numericInput.setAttribute("value", "0");
numericInput.min = 0;

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
}

function purchFunc(){
  var orderCountArr = document.getElementsByName("purchaseCount");
  var totalCost = 0;
  for(var i = 0; i < orderCountArr.length; i++){
    totalCost += orderList[i]['mInPrice'] * orderCountArr[i].value;
  }

  if(totalCost <= bankValue){
    document.getElementById("pBank").innerHTML = "Du har "
    + (bankValue - totalCost).toLocaleString() + "kr å handle for";
    buyBtn.disabled = false;
  }else{
    document.getElementById("pBank").innerHTML = "Dette har du ikke råd til...";
    buyBtn.disabled = true;
  }

}

function onLoadFunc() {
  document.getElementById("pBank").innerHTML = "Du har " + bankValue.toLocaleString() + "kr å handle for";

  makeOrderList();
  var tbl = document.getElementById("tbOrders");

  for(var i = 0; i < orderList.length; i++) {
    var rw = tbl.insertRow(-1);

    rw.insertCell(-1).innerHTML = orderList[i]['name'];
    rw.insertCell(-1).innerHTML = orderList[i]['mInPrice'];
    rw.insertCell(-1);

    var tmpInp = numericInput.cloneNode(true);
    tmpInp.setAttribute("id", "o_" + orderList[i]['name']);
    tmpInp.setAttribute("oninput", "purchFunc()");
    tmpInp.setAttribute("name", "purchaseCount");
    rw.insertCell(-1).appendChild(tmpInp);

  }

}

buyFunc = function() {

  // update inventoryList
  var itemName, n, invInd;

  var orderCountArr = document.getElementsByName("purchaseCount");
  for(var i = 0; i < orderCountArr.length; i++){

    n = parseInt(orderCountArr[i].value);
    if(orderCountArr[i].value > 0) {
      //check if item allready is in storage
      itemName = orderCountArr[i].id.substr(2);
      invInd = findItemInInventoryList(itemName);

      // If allready in inventoryList add to, else push
      if(invInd >= 0){
        inventoryList[invInd]['n'] += n;
      }else{
        inventoryList.push( {name: itemName, n: n, q0:  orderList[i]['outPrice0'], q1: orderList[i]['outPrice1']} );
      }
      // update bank roll
      bankValue -= n * orderList[i]['mInPrice'];
      // set table element to zero
      orderCountArr[i].value = 0;
    }
  }

  // update table
  var tbl = document.getElementById("tbInventory");
  trs = tbl.getElementsByTagName('tr');

  // delete old table
  for(i = 1; i < trs.length; i++)tbl.deleteRow(-1);

  // make new table
  for(i = 0; i < inventoryList.length; i++) {
    n = parseInt(inventoryList[i]['n']);
    if(n > 0){
      rw = tbl.insertRow(-1);

      rw.insertCell(-1).innerHTML = inventoryList[i]['name'];
      rw.insertCell(-1).innerHTML = n.toString();

      var tmpInp = numericInput.cloneNode(true);
      tmpInp.setAttribute("id", "s_" + orderList[i]['name']);
      tmpInp.setAttribute("name", "salesPrice");
      rw.insertCell(-1).appendChild(tmpInp);
    }
  }


}

nxtFunc = function() {
  // array with same order as inventoryList
  var salesPriceArr = document.getElementsByName("salesPrice");
  // Turnover table
  var tbl = document.getElementById("tbTurnover");

  var j, Qp, nSold, salesPrice;

  for(var i = 0; i < salesPriceArr.length; i++){
    salesPrice = parseInt(salesPriceArr[i].value);
    // Find index of inventoryList
    j = findItemInInventoryList(salesPriceArr[i].id.substr(2));
    console.log(inventoryList[j].name);
    // Demand
    Qp = inventoryList[j].q0 - inventoryList[j].q1 * salesPrice;
    // Number sold
    nSold = Math.min(Math.max(Qp, 0), parseInt(inventoryList[i]['n']));
    console.log(nSold)
    if(nSold > 0) {
      bankValue += nSold * salesPrice;
      // remove from inventory table

      // add to to turnover table
      rw = tbl.insertRow(-1);

      rw.insertCell(-1).innerHTML = period.toString();
      rw.insertCell(-1).innerHTML = inventoryList[j].name;
      rw.insertCell(-1).innerHTML = salesPrice.toLocaleString();
      rw.insertCell(-1).innerHTML = nSold.toLocaleString();
    }

  }

  period++;
}
