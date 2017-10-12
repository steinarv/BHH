var assingments = [
  {
  dayNr:1,
  txt: 'De har valgt selskapsformen <i>aksjeselskap</i> og spytter inn 50 000 kroner hver ved oppstart av driften.<br>'
      + 'For å hente peanøttpoleringsmaskinene ved Oslo Havn, samt oppebavere og levere til kunder trenger de en varebil.<br>'
      + 'Valget har falt på en Ford Transit, 2005 modell til 50 000 kroner. Antatt gjenværende levetid for denne bilen er 10 år <br>.'
      + 'De trenger i den forbindelse hjelp til å avgjøre hvor mye av kjøpet som skal finansieres ved opptak av lån.<br>'
      + 'Renten på det aktuelle lånet er 5% per år med nedbetalingstid på 5 år. '
      + 'Renter og avdrag betales etterskuddsvis den 1.januar <br><br>'
      + 'Størelse på lån: '
      + '<input id="inSldr" type="range" min="0" max="50000" value="0" step="1000" onchange="sliderChange(this)" />'
      + '<p><span id="sSliderVal">0</span> kroner<p>',
  mainFunc: function() {
          var loan = parseInt(document.getElementById("inSldr").value);
          addto(50000, balance.longTermAssets, 'Varebil');
          addto(loan, balance.longTermLiabilities, 'Billån');
          addto(loan - 50000, balance.currentAssets, 'Bankinnskudd');
          //--------------------
          //addto(loan * 0.05/356, runningCosts.financeCosts, 'Billån'); // Debet
          // addto(loan * 0.05/356, balance.currentLiabilities, 'Billån'); // Kredit
          runningCosts.car_mortage = {perDay: function(){return(balance.longTermLiabilities.Billån * 0.05/356);},
                                  add1_obj: balance.currentLiabilities,
                                  add1_name: "Renter billån",
                                  add1_sign: 1,
                                  add2_obj: result.financeCosts,
                                  add2_name: "Renter billån",
                                  add2_sign: 1};

          runningCosts.amort_van = {perDay: function(){return((50000/10)/356);},
                                  add1_obj: balance.longTermAssets,
                                  add1_name: "Varebil",
                                  add1_sign: -1,
                                  add2_obj: result.operatingCosts,
                                  add2_name: "Avskrivning varebil",
                                  add2_sign: 1};

          paymentsDue.car_mortage_intrest = {
                                  Date: {d: 1, m: 1, y: 0},
                                  amount: function(){balance.currentLiabilities['Renter billån']},
                                  add1_obj: balance.currentLiabilities['Renter billån'],
                                  add1_sign: -1,
                                  add2_obj: balance.currentAssets['Bankinnskudd'],
                                  add1_sign: -1
          };
          paymentsDue.car_mortage_inst = {
                                  Date: {d: 1, m: 1, y: 0},
                                  amount: function(){return(loan/10);},
                                  add1_obj: balance.longTermLiabilities['Billån'],
                                  add1_sign: -1,
                                  add2_obj: balance.currentAssets['Bankinnskudd'],
                                  add1_sign: -1
          };
          //--------------------
          // addto((50000/10)/356, runningCosts.operatingCosts, 'Avskrivninger'); //Debet
          // addto( - (50000/10)/356, balance.longTermAssets, 'Varebil'); // Kredit
      },
  eventTxt: function() {
          var loan = parseInt(document.getElementById("inSldr").value);
          return("Varebilen ble finansiert med et lån på kroner " + loan.toLocaleString());
    }
  },
  {
    dayNr: 3,
    txt: 'Etter å ha forhørt seg litt i markedet, har ErikH&EirikH kommer frem til en tabell'
    + ' som de mener oppsumerer det månedlige forholdet mellom etterspørsel og pris for'
    + ' peanøttpoleringsmakiner i nærområdet.'
    + '<table class="table table"><tr><th>Pris</th><td>240</td><td>340</td></tr>'
    + '<th>Forventet salg</th><td>2500</td><td>1500</td></tr></table>'
    + 'Det er tid for å sende en bestilling til produsent, med levering i begynnelsen av'
    + ' neste måned og betalingsfrist i slutten av neste måned.<br>'
    + 'Hvor mange maskiner anbefaler du at ErikH$EirikH bestiller?'
    + '<input id="inSldr" type="range" min="0" max="400" value="0" step="10" onchange="sliderChange(this)" />'
    + '<p><span id="sSliderVal">0</span> enheter <p>',
    mainFunc: function() {
            var n = parseInt(document.getElementById("inSldr").value);
            addto(n * 400, balance.currentAssets, 'Varelager');
            addto(n * 400, balance.currentLiabilities, 'Leverandørgjeld');
            payDate = new Date(dateToday.getFullYear(), dateToday.getMonth() + 2, 1);
            paymentsDue['order' + dateToString(payDate)] = {
                                    Date: {d: 1, m: payDate.getMonth() + 1, y: payDate.getYear()},
                                    amount: function(){return(n * 400);},
                                    add1_obj: balance.currentLiabilities['Leverandørgjeld'],
                                    add1_sign: -1,
                                    add2_obj: balance.currentAssets['Bankinnskudd'],
                                    add1_sign: -1
            };
    },
    eventTxt: function(){return('Fikset på dag  ' + dateToday);}

  },
  {
    dayNr: dateDiff(baseDate, new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1)) + 1,
    txt: 'Denne oppgaven kommer en måned etter start av neste måned',
    mainFunc: function(){alert('hei2');},
    eventTxt: function(){return('Fikset på dag   ' + dateToday);}

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
};



var result = {
  operatingIncome: {},
  operatingCosts: {},
  financeCosts: {},
  res: 0
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
