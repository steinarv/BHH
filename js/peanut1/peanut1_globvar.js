var assignmentNr = 0;
var assignment;

var dayNr = 0;
var baseDate = new Date();
baseDate = new Date(baseDate.getFullYear() + 1, 0, 0);
var dateToday;

var daysSinceUpdatingFinStat = 0;

var evaluateAssingment = false;
var evaluatePeriod = false;

var unitPrice = {
  PP2000: 100,
  P10000: 200
}
var unitPrice1 = 100;
var unitPrice2 = 200;
var freightPrice1 = 200000;
var freightPrice2 = 400000;
function demandFunc(p) {return(500 - 0.2 * p);};
var shippingIceland1 = 50;
var shippingIceland2 = 150;


var result0; // Result when last reported
var result_1; // Result last accounting period
var balance0; // Balance when last reported
var balance_1; // Balance in last accounting period
var cashFlowStatement0; 
var cashFlowStatement1;