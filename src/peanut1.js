nAssignments = Object.keys(assingments).length;


function onLoadFunc() {

  document.getElementById("tdDate").innerHTML = "Dato: " + dateFormat(baseDate);

  document.getElementById("divAssingment").innerHTML = assingments[0].txtFunc();

  makeBalance();

  addto(100000, cashFlowStatement.financingActivities, 'Aksjonærinnskudd')

  makeCashFlowStat();
}


function nxtFunc() {

  do {
    dateToday = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + dayNr);

    document.getElementById("tdDate").innerHTML = "Dato: "
    + dateFormat(dateToday);

    // New year (implement changes)
    if(evaluateYear) {

      for(var key1 in result)for(var key2 in result[key1])result[key1][key2] = 0;

      for(var key1 in cashFlowStatement)
        for(var key2 in cashFlowStatement[key1])
          cashFlowStatement[key1][key2] = 0;

      cashFlowStatement.ibBank = balance.currentAssets.Bankinnskudd;

      makeResult();
      makeCashFlowStat();

      evaluateYear = false;
      document.getElementById('corBtn').disabled = false;
    }

    // Implement and evaluate user input
    if(evaluateAssingment){

      assingments[assignmentNr].mainFunc();
      document.getElementById("pEvent").innerHTML = dateToString2(dateToday) + ': '
      + assingments[assignmentNr].eventTxt() + '<br>' + document.getElementById("pEvent").innerHTML;

      // Pop up question ----------------------------------------------------------

      makeResult();
      makeBalance();
      makeCashFlowStat();

      assignmentNr++;
      evaluateAssingment = false;
    }

    // Check of any paymentsDue or raporting dates
    checkForPaymentsDue(dateToday);

    dayNr ++;
    daysSinceUpdatingFinStat ++;

    // Should user unput be requested
    if(assignmentNr < nAssignments)if(assingments[assignmentNr].dayNr === dayNr){
      document.getElementById("divAssingment").innerHTML = assingments[assignmentNr].txtFunc();
      evaluateAssingment = true;
    }

    // New year --- Evaluate last years result
    if(dateToday.getDate() === 31 & dateToday.getMonth() === 11){
      document.getElementById("divAssingment").innerHTML =
                'Året er omme, endelig resultat og kontantstrømoversikt er nå klart.'
                + 'Alle korrigeringer skal være implementert i regnskapet.';


      updateFinStat();
      makeResult();
      finishResult();
      makeBalance();
      makeCashFlowStat();


      //document.getElementById("sEvent").innerHTML = '';
      evaluateYear = true;
      document.getElementById('corBtn').disabled = true;
    }

  } while(!evaluateYear & !evaluateAssingment & assignmentNr < nAssignments)

}
