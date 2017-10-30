nAssignments = Object.keys(assignments).length;


function onLoadFunc() {

  dateToday = baseDate;
  makeBalance();

  nxtFunc();

}


function nxtFunc() {

  do {

    // If new period, clean up result and cash flow statement
    if(evaluatePeriod) {

      for(var key1 in result)for(var key2 in result[key1])result[key1][key2] = 0;

      for(var key1 in cashFlowStatement)
        for(var key2 in cashFlowStatement[key1])
          cashFlowStatement[key1][key2] = 0;

      cashFlowStatement.ibBank = balance.currentAssets.Bankinnskudd;

      makeResult();
      makeCashFlowStat();

      evaluatePeriod = false;
      //document.getElementById('corBtn').disabled = false;
    }

    // Implement and evaluate user input
    if(evaluateAssingment){

      assignment.mainFunc();
      document.getElementById("pEvent").innerHTML = assignment.eventTxt(dateToday)
                      + '<br>' + document.getElementById("pEvent").innerHTML;

      // Pop up question ----------------------------------------------------------?

      makeResult();
      makeBalance();
      makeCashFlowStat();

      assignmentNr++;
      console.log("Creating new assignment: ", dateToString2(dateToday));
      if(assignmentNr < nAssignments)assignment = new assignments[assignmentNr](dateToday);
      evaluateAssingment = false;
    }


    dayNr ++;

    dateToday = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + dayNr);
    document.getElementById("tdDate").innerHTML = "Dato: " + dateFormat(dateToday);

    // Check of any paymentsDue or raporting dates
    checkForPaymentsDue(dateToday);
    daysSinceUpdatingFinStat ++;

    // Should user unput be requested
    if(assignment === undefined)assignment = new assignments[assignmentNr](dateToday);
    if(assignment.dayNr === dayNr){
      evaluateAssingment = true;

      document.getElementById("divAssingment").innerHTML = assignment.txtFunc(dateToday);
      // above function may disable next button and set evaluateAssingment to false if lasst.
    }



    // New year --- Evaluate last years result
    if(/*(dateToday.getDate() === 31 & dateToday.getMonth() === 2) |
        (dateToday.getDate() === 30 & dateToday.getMonth() === 6) |
        (dateToday.getDate() === 30 & dateToday.getMonth() === 8) |*/
        (dateToday.getDate() === 31 & dateToday.getMonth() === 11)){
      document.getElementById("divAssingment").innerHTML =
                'Perioden er omme, endelig resultat og kontantstrømoversikt er nå klart.'
                + 'Alle korrigeringer skal være implementert i regnskapet.';


      updateFinStat();
      makeResult();
      finishResult();
      makeBalance();
      makeCashFlowStat();


      //document.getElementById("sEvent").innerHTML = '';
      evaluatePeriod = true;
      // document.getElementById('corBtn').disabled = true;
    }

  } while(!evaluatePeriod & !evaluateAssingment & assignmentNr < nAssignments)

}
