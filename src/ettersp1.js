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

var numericInput = document.createElement("INPUT");
numericInput.setAttribute("type", "number");
numericInput.setAttribute("value", "0");


function makeOrderList() {
    orderList = getRandomSubarray(itemList, 3);
}

function onLoadFunc() {
  makeOrderList();
  var tbl = document.getElementById("tbOrders");

  for(var i = 0; i < orderList.length; i++) {
    var rw = tbl.insertRow(-1);

    rw.insertCell(-1).innerHTML = orderList[i]['name'];
    rw.insertCell(-1).innerHTML = orderList[i]['mInPrice'];
    rw.insertCell(-1);

    var tmpInp = numericInput.cloneNode(true);
    tmpInp.setAttribute("id", "purchase" + i);
    rw.insertCell(-1).appendChild(tmpInp);

    var tmpInp = numericInput.cloneNode(true);
    tmpInp.setAttribute("id", "salesprice" + i);
    tmpInp.setAttribute("value", (orderList[i]['mInPrice'] * 1.5));
    rw.insertCell(-1).appendChild(tmpInp);
    /*for(var j = 0; j < n; j++) {
      var cl = rw.insertCell(-1);
    }*/
  }
}
