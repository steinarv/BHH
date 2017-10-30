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
var freightPrice = 200000;
function demandFunc(p) {return(500 - 0.2 * p);};


var result0 // Result when last reported
var result_1 // Result last period
var balance0 // Balance when last reported
var balance_1 // Balance in last period
