var assingments = [
  {txt: 'De har valgt selskapsformen <i>aksjeselskap</i> og spytter inn 50 000 kroner hver ved oppstart av driften.<br>'
      + 'For å hente peanøttpoleringsmaskinene ved Oslo Havn, samt oppebavere og levere til kunder trenger de en varebil.<br>'
      + 'Valget har falt på en Ford Transit, 2005 modell til 50 000 kroner. Antatt gjenværende levetid for denne bilen er 10 år <br>.'
      + 'De trenger i den forbindelse hjelp til å avgjøre hvor mye av kjøpet som skal finansieres ved opptak av lån.<br>'
      + 'Renten på det aktuelle lånet er 5% per år med nedbetalingstid på 5 år. '
      + 'Renter og avdrag betales etterskuddsvis den 1.januar <br><br>'
      + 'Størelse på lån: '
      + '<input id="inSldr" type="range" min="0" max="50000" value="0" step="1000" onchange="sliderChange(this)" />'
      + '<p id="pSliderVal">0 kroner<p>',
  timeStp: function(){return(1)},
  mainFunc: function() {
          var loan = parseInt(document.getElementById("inSldr").value);
          addto(50000, balance.longTermAssets, 'Varebil');
          addto(loan, balance.longTermLiabilities, 'Billaan');
          addto(loan - 50000, balance.currentAssets, 'Bankinnskudd');
          addto(loan * 0.05/356, runningCosts.financeCosts, 'Billaan');
          addto((50000/10)/356, runningCosts.operatingCosts, 'Avskrivninger');
      },
  eventTxt: function() {
          var loan = parseInt(document.getElementById("inSldr").value);
          return("Varebilen ble finansiert med et lån på kroner " + loan.toLocaleString());
    }
  }
];



var balance = { currentAssets: {Bankinnskudd: 100000},
                longTermAssets: {},
                currentLiabilities: {},
                longTermLiabilities: {},
                shareholdersEquity: {Aksjekapital: 100000}
              };



var runningCosts = {
  // named objects with properties: cost_per_day
  operatingCosts: {},
  financeCosts: {}
};



var financialStatement = {
  operatingIncome: {},
  operatingCosts: {},
  financeCosts: {}
};


var paymentsDue = {
  // named objects with properties: due_date, amount
};


var cashFlowStatement = {
  ibBank: 0,
  operatingActivities: {},
  investingActivities: {},
  financingActivities: {}
};
