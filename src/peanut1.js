nAssignments = Object.keys(assignments).length;


function onLoadFunc() {
	result0 = clone(result);
	balance0 = clone(balance);
	cashFlowStatement0 = clone(cashFlowStatement);
	
  dateToday = baseDate;

  nxtFunc();

}


function nxtFunc() {

  do {

    // If new period, clean up result and cash flow statement
    if(evaluatePeriod) {
			// Start with fresh result
      for(var key1 in result)for(var key2 in result[key1])result[key1][key2] = 0;
			// Start with fresh cash flow statement
      for(var key1 in cashFlowStatement)
        for(var key2 in cashFlowStatement[key1])
          cashFlowStatement[key1][key2] = 0;
			// Initial cash holding
      cashFlowStatement.ibBank = balance.currentAssets.Bankinnskudd;
			// Print empty result and cahs flow statement
      makeResult();
      makeCashFlowStat();

      evaluatePeriod = false;
      //document.getElementById('corBtn').disabled = false;
    }

    // Implement and evaluate user input
    if(evaluateAssingment){

      assignment.mainFunc();
      document.getElementById("pEvent").innerHTML = assignment.eventTxt()
                      + '<br>' + document.getElementById("pEvent").innerHTML;

      // Pop up question ----------------------------------------------------------?

      makeResult();
      makeBalance();
      makeCashFlowStat();

      assignmentNr++;
      //console.log("Creating new assignment: ", dateToString2(dateToday));
      if(assignmentNr < nAssignments)assignment = new assignments[assignmentNr]();
      evaluateAssingment = false;
    }


    dayNr ++;

    dateToday = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + dayNr);
    document.getElementById("tdDate").innerHTML = "Dato: " + dateFormat(dateToday);
		
    // Check of any paymentsDue or raporting dates
    checkForPaymentsDue(dateToday);
    daysSinceUpdatingFinStat ++;

    // Should user unput be requested
    if(assignment === undefined)assignment = new assignments[assignmentNr]();
    if(assignment.dayNr === dayNr){
      // Make sure user input gets evaluated when next button is pressed
			evaluateAssingment = true;
			
			//Update and present (temporary) financial statement
			updateFinStat();
      finishResult(false);
			// Print result
			makeResult();
      // Print balance
			makeBalance();
			// Print cash flow statement
			makeCashFlowStat();
			
			// Save current cash flow statement
			cashFlowStatement0 = clone(cashFlowStatement);
			// Calculate value of equity and save current balance
			balance.totAssets = calcTotAssets();
			balance0 = clone(balance);
			// Save this periods result
			result0 = clone(result);
			
			// Present new assignment
      document.getElementById("divAssingment").innerHTML = assignment.txtFunc();
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
			document.getElementById('nxtBtn').disabled = true;
      // document.getElementById('corBtn').disabled = true;
    }

  } while(!evaluatePeriod & !evaluateAssingment & assignmentNr <= nAssignments) // last condition means it will run to end of period

}
