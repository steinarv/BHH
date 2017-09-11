// Random variabes for cost function
var a1 = 400; //380 + Math.random() * 40
var a2 = 1.5; //1.4 + Math.random() * 0.2
var a3 = 0.002; // 0.0025 + Math.random() * 0.0001
var fc = 12000; // 11000 + Math.random() * 2000

var results = [];
var results1 = [];

var norders = 3;
var orders = [];

function order() {
  this.price = 50 + Math.floor(Math.random() * 5 + 1) * 10;
  this.n = 100 + Math.floor(Math.random() * 5 + 1) * 100;
}

function varcostFunc(n) {
  return(a1 * n - a2 * Math.pow(n, 2) + a3 * Math.pow(n, 3));
}


function onLoadFunc(){
  //create orders
  for(var j = 1; j <= norders; j++) {
    nord = new order();
    orders.push(nord);

    var newrow = document.getElementById("ordertbl").insertRow(-1);
    newrow.insertCell(-1).innerHTML = '<input type="checkbox" name="order" value="1">';
    newrow.insertCell(-1).innerHTML = nord.n;
    newrow.insertCell(-1).innerHTML = nord.price;
  }

  tbl = document.getElementById('costInfo');
  trs = tbl.getElementsByTagName('tr');
  for(var i = 1; i < 7; i++){
    var amnt = i * 100;
    var fc = 12000;
    var vc = varcostFunc(i * 100);

    var tmp0 = trs[0].insertCell(-1);
    tmp0.innerHTML  = amnt;

    var tmp0 = trs[1].insertCell(-1);
    tmp0.innerHTML  = fc;

    var tmp0 = trs[2].insertCell(-1);
    tmp0.innerHTML  = vc.toLocaleString();
  }
}


function nextFunc(){
  var income = 0;
  var prodn = 0;
  var cumres = 0;

  var cbs = document.getElementsByName('order');

  for(var i = 0; i < norders; i++){
    if(cbs[i].checked){
      income += orders[i].n * orders[i].price;;
      prodn += orders[i].n;
    }
  }

  var varcost = prodn * 60 - Math.pow(prodn/100, 2) * 100;
  var res = income - fc - varcost;
  results.push(res);

  tbl = document.getElementById('finStmnt');
  trs = tbl.getElementsByTagName('tr');

  var ncol = trs[0].cells.length;
  var tmp0 = trs[0].insertCell(-1);
  tmp0.innerHTML  = ncol > 1 ? Number(trs[0].cells[ncol - 1].innerHTML) + 1 : 1;

  var tmp0 = trs[1].insertCell(-1);
  tmp0.innerHTML  = income.toLocaleString();

  var tmp0 = trs[2].insertCell(-1);
  tmp0.innerHTML  = fc.toLocaleString();

  var tmp0 = trs[3].insertCell(-1);
  tmp0.innerHTML  = varcost.toLocaleString();

  var tmp0 = trs[4].insertCell(-1);
  tmp0.innerHTML  = res.toLocaleString();

  var tmp0 = trs[5].insertCell(-1);
  for(j = 0; j < results.length; j++)cumres += results[j];
  //cumres  = ncol > 1 ? Number(trs[5].cells[ncol - 1].innerHTML) + res : res;
  tmp0.innerHTML = cumres.toLocaleString();

  if(ncol == 10){
    alert("Ditt samlede overskudd ble " + cumres.toLocaleString());
    var tmp0 = document.getElementById('nxtBtn');
    tmp0.parentNode.removeChild(tmp0);
  }else{
    // New orders
    trs = document.getElementById("ordertbl").rows;
    for(var i = 1; i < trs.length; i++){
      nord = new order();
      orders[i - 1] = nord;
      trs[i].cells[0].innerHTML =  '<input type="checkbox" name="order" value="1">';
      trs[i].cells[1].innerHTML = nord.n;
      trs[i].cells[2].innerHTML = nord.price;
    }
  }

}
