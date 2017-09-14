// Random variabes for cost function
var a1 = 400; //380 + Math.random() * 40
var a2 = 1.5; //1.4 + Math.random() * 0.2
var a3 = 0.002; // 0.0025 + Math.random() * 0.0001
var fc = 12000; // 11000 + Math.random() * 2000

var results = [];
var results1 = []; // Result if optimal order mix is choosen

var norders = 3;
var orders = [];

var ctx = document.getElementById("resChart").getContext('2d');
Chart.defaults.global.defaultFontColor = '#ffffff';

var nxtTxt = 'Under følger en oversikt over tilgjenglige ordere.'
+ ' Velg hvilke ordre du vil aksepter og '
+ 'trykk "neste" for å gå et år frem i tid';

function order() {
  this.price = 90 + Math.floor(Math.random() * 11 + 1) * 10;
  this.n = Math.floor(Math.random() * 4 + 1) * 100;
}

function varcostFunc(n) {
  return(a1 * n - a2 * Math.pow(n, 2) + a3 * Math.pow(n, 3));
}

var allComb = function(n) {
    var a = [];
    for(var i = 1; i <= n; i++)a.push(i);

    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = 1; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}

function onLoadFunc(){
  //create orders
  for(var j = 1; j <= norders; j++) {
    nord = new order();
    orders.push(nord);

    var newrow = document.getElementById("ordertbl").insertRow(-1);
    newrow.insertCell(-1).innerHTML = '<input type="checkbox" name="orderCB" value="1">';
    newrow.insertCell(-1).innerHTML = nord.n;
    newrow.insertCell(-1).innerHTML = nord.price;
  }

  tbl = document.getElementById('costInfo');
  trs = tbl.getElementsByTagName('tr');
  prod_amount = [100, 200, 300, 400, 500, 600, 1000];
  for(var i = 0; i < prod_amount.length; i++){
    var amnt = prod_amount[i];
    var fc = 12000;
    var vc = varcostFunc(prod_amount[i]);

    var tmp0 = trs[0].insertCell(-1);
    tmp0.innerHTML  = amnt;

    var tmp0 = trs[1].insertCell(-1);
    tmp0.innerHTML  = fc;

    var tmp0 = trs[2].insertCell(-1);
    tmp0.innerHTML  = vc.toLocaleString();
  }

  document.getElementById('orderTxt').innerHTML = nxtTxt;
}


function nextFunc(){
  var income = 0;
  var prodn = 0;
  var cumres = 0;

  // Find optimal prod mix
  var j, prodNum, totInc, contMarg, optOrderInd, optNum;
  var optMarg = 0, optOrderInd = [];

  var arr0, k;
  var arr = allComb(norders);

  for(var i = 0; i < arr.length; i++) {
    arr0 = arr[i]
    prodNum = 0;
    totInc = 0;

    for(j = 0; j < arr0.length; j++) {
      k = arr0[j] - 1;
      prodNum += orders[k].n;
      totInc += orders[k].n * orders[k].price
      contMarg = totInc - varcostFunc(prodNum);

    }
    if(contMarg > optMarg) {optMarg = contMarg; optNum = prodNum; optOrderInd = arr0}
  }
  results1.push(optMarg - fc);
  console.log(optOrderInd);
  if(optOrderInd.length > 0) {

    var tbl = document.getElementById('ordertbl');
    var trs = tbl.getElementsByTagName('tr');
    for(var i = 0; i < optOrderInd.length; i++) {

      trs[optOrderInd[i]].style.backgroundColor = "blue";
    }
  }


  var cbs = document.getElementsByName('orderCB');

  for(var i = 0; i < norders; i++){
    if(cbs[i].checked){
      income += orders[i].n * orders[i].price;
      prodn += orders[i].n;
    }
  }

  var varcost = varcostFunc(prodn);
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

  document.getElementById('orderTxt').innerHTML =
    'Dine valge ordre ga et dekningsbidrag på '
    + (income - varcost).toLocaleString()
    + '.<br> Optimal ordremix er markert med blått, dette ville gitt et dekningsbidrag på '
    + optMarg.toLocaleString() + ".<br>";

  if(ncol == 5){
    alert("Ditt samlede overskudd ble " + cumres.toLocaleString());

    //var tmp0 = document.getElementById('nxtBtn');
    //tmp0.parentNode.removeChild(tmp0);
  }else{
    document.getElementById('moveonBtn').style.display = "inline";

    document.getElementById('orderTxt').innerHTML +=
      'Trykk "Videre" for å se tilgjengelige ordre for år ' + (ncol + 1) + ".";
  }

  // cumulative results
  var chartLabels = ["0"];
  for(var i = 1; i <= results.length; i++)chartLabels.push(i.toString());

  var chartData = []; var chartData1 = [];
  results.reduce(function(a,b,i) { return chartData[i] = a+b; },0);
  results1.reduce(function(a,b,i) { return chartData1[i] = a+b; },0);
  chartData.unshift(0); chartData1.unshift(0); //start at 0

  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
                labels: chartLabels,
                datasets: [{
                    label: "Dine valg",
                    backgroundColor: '#00ff00',
                    borderColor: '#00ff00',
                    data: chartData,
                    fill: false,
                }, {
                    label: "Optimal ordremix",
                    backgroundColor: '#0ffff0',
                    borderColor: '#0ffff0',
                    data: chartData1,
                    fill: false,
                }]
      },
      options: {
                responsive: true,
                maintainAspectRatio: true,
                title:{
                    display:false,
                    text:'Akumulert reultat'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                          display: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'År'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false
                        }
                    }]
                }
            }
  });


  document.getElementById('divRes').style.display = "inline";
  document.getElementById('nxtBtn').style.display = "none";
}


function moveonFunc() {

  nyear = document.getElementById('finStmnt').rows[0].children.length - 1;
  // New orders
  trs = document.getElementById("ordertbl").rows;
  for(var i = 1; i < trs.length; i++){
    trs[i].style.backgroundColor = "#2f2f2f";
    nord = new order();
    orders[i - 1] = nord;
    trs[i].cells[0].innerHTML =  '<input type="checkbox" name="orderCB" value="1">';
    trs[i].cells[1].innerHTML = nord.n;
    trs[i].cells[2].innerHTML = nord.price;
  }


  document.getElementById('orderHeading').innerHTML = "Ordreliste for år " + (nyear + 1);
  document.getElementById('nxtBtn').style.display = "inline";
  document.getElementById('orderTxt').innerHTML = nxtTxt;
  document.getElementById('moveonBtn').style.display = "none";
}
