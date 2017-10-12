nAssignments = Object.keys(assingments).length;


function onLoadFunc() {

  document.getElementById("tdDate").innerHTML = "Dato: " + dateFormat(baseDate);

  document.getElementById("divAssingment").innerHTML = assingments[0].txt;

  makeBalance();

  addto(100000, cashFlowStatement.financingActivities, 'Aksjonærinnskudd')

  makeCashFlowStat();
}


function nxtFunc() {

  do {
    dateToday = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + dayNr);

    // Check of any paymentsDue or raporting dates

    document.getElementById("tdDate").innerHTML = "Dato: "
    + dateFormat(dateToday);

    if(evaluateAssingment){

      assingments[assignmentNr].mainFunc();
      document.getElementById("pEvent").innerHTML = assingments[assignmentNr].eventTxt();

      // Pop up question ----------------------------------------------------------

      makeResult();
      makeBalance();
      makeCashFlowStat();

      assignmentNr++;
      evaluateAssingment = false;
    }

    dayNr ++;
    daysSinceUpdatingFinStat ++;

    if(assignmentNr < nAssignments)if(assingments[assignmentNr].dayNr === dayNr){
      document.getElementById("divAssingment").innerHTML = assingments[assignmentNr].txt;
      evaluateAssingment = true;
    }
  } while(!evaluateAssingment & assignmentNr < nAssignments)

}
