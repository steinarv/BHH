var assignmentNr = 0;
var nAssignments = 1;

var dayNr = 1;
var baseDate = new Date();
var theDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);


function onLoadFunc() {

  document.getElementById("tdDate").innerHTML = "Dato: " + dateFormat(theDate);

  document.getElementById("divAssingment").innerHTML = assingments[0].txt;

  makeBalance();

  addto(100000, cashFlowStatement.financingActivities, 'Aksjonærinnskudd')

  makeCashFlowStat();
}


function nxtFunc() {

  if(assignmentNr >= nAssignments)return;

  var timeStep = assingments[assignmentNr].timeStp();

  document.getElementById("tdDate").innerHTML = "Dato: "
    + dateFormat(new Date(theDate.getFullYear(), theDate.getMonth(), theDate.getDate() + dayNr));

  assingments[assignmentNr].mainFunc();
  document.getElementById("pEvent").innerHTML = assingments[assignmentNr].eventTxt();


  // only end of period ----- > updateFinStat(timeStep);
  makeResult();
  makeBalance();
  makeCashFlowStat();

  dayNr += timeStep;
  assignmentNr++;
}
