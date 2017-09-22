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

var nxtBtn = document.getElementById("nxtBtn");

var numericInput = document.createElement("INPUT");
numericInput.setAttribute("type", "number");
numericInput.setAttribute("value", "0");

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
    nxtBtn.disabled = false;
  }else{
    document.getElementById("pBank").innerHTML = "Dette har du ikke råd til...";
    nxtBtn.disabled = true;
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

      //console.log(itemName + " ---- " + invInd);
      if(invInd >= 0){
        inventoryList[invInd]['n'] += n;
      }else{
        inventoryList.push( {name: itemName, n: n} );
      }
    }
  }

  // update table
  var tbl = document.getElementById("tbInventory");
  trs = tbl.getElementsByTagName('tr');

  for(i = 1; i < trs.length; i++)tbl.deleteRow(-1);

  for(i = 0; i < inventoryList.length; i++) {
    n = parseInt(inventoryList[i]['n']);
    if(n > 0){
      rw = tbl.insertRow(-1);

      rw.insertCell(-1).innerHTML = itemList[i]['name'];
      rw.insertCell(-1).innerHTML = n.toString();

      var tmpInp = numericInput.cloneNode(true);
      tmpInp.setAttribute("id", "s_" + orderList[i]['name']);
      tmpInp.setAttribute("name", "salesPrice");
      rw.insertCell(-1).appendChild(tmpInp);
    }
  }


}

nxtFunc = function() {
  var i = 3;
}
