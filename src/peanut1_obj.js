var assingments = [
  {
  dayNr:1,
  txtFunc: function() {
    return(
        'De har valgt selskapsformen <i>aksjeselskap</i> og spytter inn 50 000 kroner hver ved oppstart av driften.<br>'
      + 'For å hente peanøttpoleringsmaskinene ved Oslo Havn, samt oppebavere og levere til kunder trenger de en varebil.<br>'
      + 'Valget har falt på en Ford Transit, 2005 modell til 50 000 kroner. Antatt gjenværende levetid for denne bilen er 10 år <br>.'
      + 'De trenger i den forbindelse hjelp til å avgjøre hvor mye av kjøpet som skal finansieres ved opptak av lån.<br>'
      + 'Renten på det aktuelle lånet er 5% per år med nedbetalingstid på 5 år. '
      + 'Renter og avdrag betales etterskuddsvis den 1.januar <br><br>'
      + 'Størelse på lån: '
      + '<input id="inSldr" type="range" min="0" max="50000" value="0" step="1000" onchange="sliderChange(this)" />'
      + '<p><span id="sSliderVal">0</span> kroner<p>'
    )},
  mainFunc: function() {
          var loan = parseInt(document.getElementById("inSldr").value);
          addto(50000, balance.longTermAssets, 'Varebil');
          addto(loan, balance.longTermLiabilities, 'Billån');
          addto(loan - 50000, balance.currentAssets, 'Bankinnskudd');

          addto(-50000, cashFlowStatement.investingActivities, 'Varebil');
          addto(loan, cashFlowStatement.financingActivities, 'Opptak av lån');
          // addto(0, balance.currentLiabilities, 'Renter billån'); // Need to initialize object?
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
                                  amount: function(s){return( balance.currentLiabilities['Renter billån'] )},
                                  add1_obj: balance.currentLiabilities,
                                  add1_name: 'Renter billån',
                                  add1_sign: -1,
                                  add2_obj: balance.currentAssets,
                                  add2_name: 'Bankinnskudd',
                                  add2_sign: -1,
                                  cfobj_obj: cashFlowStatement.operatingActivities,
                                  cfobj_name: 'Renter',
                                  cfobj_sign: -1
          };
          paymentsDue.car_mortage_inst = {
                                  Date: {d: 1, m: 1, y: 0},
                                  amount: function(){return(loan/10);},
                                  add1_obj: balance.longTermLiabilities,
                                  add1_name: 'Billån',
                                  add1_sign: -1,
                                  add2_obj: balance.currentAssets,
                                  add2_name: 'Bankinnskudd',
                                  add2_sign: -1,
                                  cfobj_obj: cashFlowStatement.financingActivities,
                                  cfobj_name: 'Avdrag lån',
                                  cfobj_sign: -1
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
    txtFunc: function() {
      return(
      'Etter å ha forhørt seg litt i markedet, har ErikH&EirikH kommer frem til en tabell'
    + ' som de mener oppsumerer det månedlige forholdet mellom etterspørsel og pris for'
    + ' peanøttpoleringsmakiner i nærområdet.'
    + '<table class="table table"><tr><th>Pris</th><td>240</td><td>340</td></tr>'
    + '<th>Forventet salg</th><td>2500</td><td>1500</td></tr></table>'
    + 'Det er tid for å sende en bestilling til produsent, med levering i begynnelsen av'
    + ' neste måned og betalingsfrist i slutten av neste måned.<br>'
    + 'Hvor mange maskiner anbefaler du at ErikH$EirikH bestiller?'
    + '<input id="inSldr" type="range" min="0" max="400" value="0" step="10" onchange="sliderChange(this)" />'
    + '<p><span id="sSliderVal">0</span> enheter <p>'
  )},
    mainFunc: function() {
            var n = parseInt(document.getElementById("inSldr").value);
            addto(n * 100 + 100000, balance.currentAssets, 'Varelager');
            addto(n * 100 + 100000, balance.currentLiabilities, 'Leverandørgjeld');
            addto(n, inventory.count, 'PeanutPolishMachine');
            payDate = new Date(dateToday.getFullYear(), dateToday.getMonth() + 2, 1);
            paymentsDue['order' + dateToString(dateToday)] = {
                                    Date: {d: 1, m: payDate.getMonth() + 1, y: payDate.getFullYear()},
                                    amount: function(){return(n * 100 + 100000);},
                                    add1_obj: balance.currentLiabilities,
                                    add1_name: 'Leverandørgjeld',
                                    add1_sign: -1,
                                    add2_obj: balance.currentAssets,
                                    add2_name: 'Bankinnskudd',
                                    add2_sign: -1,
                                    cfobj_obj: cashFlowStatement.operatingActivities,
                                    cfobj_name: 'Utbetaling varekjøp',
                                    cfobj_sign: -1
            };
            inventory.detailed['order' + dateToString(dateToday)] = {
              name: 'PeanutPolishMachine',
              n: n,
              p: 100 + 100000/n
            };
            this.eventTxt = function(){return(n + ' peanøttpoleringsmaskiner bestilt fra Kina.')};
    },
    eventTxt: function(){return(0);}

  },
  {
    dayNr: dateDiff(baseDate, new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1)) + 1,
    txtFunc: function() {
      var n = 0;
      for(var key in inventory)
      return(
      'Da er varene ankommet og du skal nå bestemme en utsalgspris.<br>'
    + 'Vi gjentar forholdet mellom pris og etterspørsel (per måned) i tabllen under: <br>'
    + '<table class="table table"><tr><th>Pris</th><td>240</td><td>340</td></tr>'
    + '<th>Forventet salg</th><td>2500</td><td>1500</td></tr></table>'
    + 'For enkelhets skyld så setter vi betalingfrist den 15 i påfølgende måned for alle som kjøper i løpet'
    + ' av en måned.'
    + 'Utsalgspris for peanøttpoleringsmakinene:'
    + '<input id="inSldr" type="range" min="0" max="1000" value="0" step="10" onchange="sliderChange(this)" />'
    + '<p><span id="sSliderVal">0</span> kr <p>'
    + '<br>(Det finnes '+  inventory.count.PeanutPolishMachine.toLocaleString() + ' varer på lager)'
  )},
    //+ '<br>(Det finnes '+ balance.currentAssets['Varelager'].toLocaleString() + ' varer på lager)',
    mainFunc: function(){
      var p = parseInt(document.getElementById("inSldr").value); //price
      var b = (1500 - 2500)/(340 - 240); var a = 2500 - b * 240;
      var n = a + b * p; n = Math.max( 0, Math.min(n, parseInt2(inventory.count.PeanutPolishMachine)) );

      addto(-n, inventory.count, 'PeanutPolishMachine');
      addto(n * p, balance.currentAssets, 'Kundefordringer');
      addto(n * p, result.operatingIncome, 'Salgsinntekt');

      payDate = new Date(dateToday.getFullYear(), dateToday.getMonth() + 2, 1);
      paymentsDue['sale' + dateToString(dateToday)] = {
                              Date: {d: 1, m: payDate.getMonth() + 1, y: payDate.getFullYear()},
                              amount: function(){return(n * p);},
                              add1_obj: balance.currentAssets,
                              add1_name: 'Kundefordringer',
                              add1_sign: -1,
                              add2_obj: balance.currentAssets,
                              add2_name: 'Bankinnskudd',
                              add2_sign: 1,
                              cfobj_obj: cashFlowStatement.operatingActivities,
                              cfobj_name: 'Innbetaling fra kunder',
                              cfobj_sign: 1
      };
      this.eventTxt = function(){return(n + " varer ble solgt for " + p + "kroner per stk.");}

    },
    eventTxt: function(){return('');}

  },
  {
    dayNr: dateDiff(baseDate, new Date(baseDate.getFullYear(), baseDate.getMonth() + 3, 1)) + 1,
    txtFunc: function() {
      return(
        'Spillet er over. Du kan utforske resultat og balanse under. <br>'
      )},
    mainFunc: function(){
      // Maybe some scoring and vizualisation here
      document.getElementById('nxtBtn').disabled = true;
      //document.getElementById("pEvent").innerHTML = '<br>';
    },
    eventTxt: function(){return(' ');}

  }
];



var balance = { currentAssets: {"Bankinnskudd": 100000},
                longTermAssets: {},
                currentLiabilities: {},
                longTermLiabilities: {},
                shareholdersEquity: {"Aksjekapital": 100000,
                                     "Udekket tap": 0,
                                     "Annen egenkapital": 0}
              };

var inventory = {
  count: {
    // named objects with propertie n
  },
  detailed: {
    // objects with properties: name, n, price
  }
}


var runningCosts = {
  // named objects with properties: cost_per_day
};



var result = {
  operatingIncome: {},
  operatingCosts: {},
  financeCosts: {},
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
