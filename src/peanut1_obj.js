var assignments = [
  /*{
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
  },*/
  function(d) {
    this.dayNr = 1;
    function sliderChange(x) {
      document.getElementById("sSliderVal").innerHTML = x.value.toLocaleString();
    }
    this.txtFunc = function() {
      return(
      'Etter å ha forhørt seg litt i markedet, har ErikH&EirikH kommer frem til en tabell'
    + ' som de mener oppsumerer forholdet mellom etterspørsel og pris gjennom inneværende kvartal '
    + 'for den topp moderne peanøttpoleringsmakinen; <i>PP2000</i> . <br><br>'
    + '<table class="table table"><tr><th>Pris</th><td>1500</td><td>500</td></tr>'
    + '<tr><th>Forventet salg</th><td>' + demandFunc(1500)
    + '</td><td>' + demandFunc(500) + '</td></tr></table>'
    + 'Lengre frem i tid er det knyttet større usikkerhet til etterspørselen da det er en rivende '
    + 'utvikling i peanøttpoleringsmaskinteknologien, og nye modeller kommer stadig på markedet.<br>'
    + '<br><br>Det er tid for å sende en bestilling til produsent, med levering'
    + ' neste dag og betalingsfrist ved utgangen av kvartalet.<br>'
    + 'Prisen fra Hong Kong (inntakskost) for <i>PP2000</i> er kr ' + unitPrice1.toLocaleString()
    + ' pr enhet. Flyfrakten koster kr ' + freightPrice.toLocaleString() + ' pr flygning.<br>'
    + 'Hvor mange eksemplarer anbefaler du at ErikH$EirikH bestiller?'
    + '<input id="in_PP2000_n" type="range" min="0" max="500" value="0" name = "sldrBuy"'
    + 'step="10" onchange="sliderChange(this)" />'
    + '<p><span id="s_in_PP2000_n">0</span> enheter <p>'
    + '<br> Markedsføringen av de bestilte peanøttpoleringsmakinene starter umiddelbart,'
    + ' og prisen må derfor også bestemmes: <br>'
    + '<input id="in_PP2000_p" type="range" min="0" max="2000" value="0" name = "sldrPrice"'
    + ' step="50" onchange="sliderChange(this)" />'
    + '<p><span id="s_in_PP2000_p">0</span> kr <p>'
    + '<br>Når du nå trykker neste, vil vi bevege oss tre måneder frem i tid for å se resultatet av dine beslutnigner...<br>'
      )};
    this.mainFunc = function() {
            sEventTxt = '';
            // Register merchendise in! ..............................................................................
            var sldrs = document.getElementsByName('sldrBuy');
            for(var i = 0; i < sldrs.length; i++){
              var item = sldrs[i].id.split('_')[1];
              var n_buy = document.getElementById('in_' + item + '_n').valueAsNumber;

              sEventTxt += buyFunc(d, item, n_buy, unitPrice[item], freightPrice);
            }

            // Register merchendise out! ..............................................................................
            var sldrs = document.getElementsByName('sldrPrice');
            for(var i = 0; i < sldrs.length; i++){
              var item = sldrs[i].id.split('_')[1];
              var p_sale = document.getElementById('in_' + item + '_p').valueAsNumber; //price
              var n_sale = demandFunc(p_sale);

              sEventTxt += sellFunc(d, item, n_sale, p_sale)
            }

            // Event report..............................................................................................
            this.eventTxt = function(){
              // Date reported here should be more carefully decided
              return(sEventTxt);
            };
            // Update financial statement after first quarter
            corFunc();
    };
    this.eventTxt = function(){return(0);}

  },
  //salget gikk dårligere enn forventet pga dårlig vær hard vinter, etterspørselen ser ut til å ta seg opp ---> lik etterspørselsfunksjon
  function(d) {
    this.dayNr = dateDiff(baseDate, new Date(baseDate.getFullYear(), baseDate.getMonth() + 4, 1));
    function sliderChange(x) {
      document.getElementById("sSliderVal").innerHTML = x.value.toLocaleString();
    }
    this.txtFunc = function() {
      return(
      'Salget av <i>PP2000</i> ble som forventet, hele dette kvartalet sett under ett.'
    + 'Likevel merket man et brå nedgang i salget mot slutten av perioden.<br>'
    + 'Man regner med at dette skyldes den nyeste modellen peanøttpoleringsmaskin <i>P10000</i>.'
    + 'som har tatt markedet med storm. <br>Grunnet mer avansert teknologi er denne noe dyrere'
    + ' i innkjøp (' + unitPrice2.toLocaleString() + '<br>'
    + ' kroner per stk.). Etterspørselen gjennom neste kvartal forventes å være tilsvarende forrige modell<br><br>'
    + '<table class="table table"><tr><th>Pris</th><td>1500</td><td>500</td></tr>'
    + '<tr><th>Forventet salg</th><td>' + demandFunc(1500)
    + '</td><td>' + demandFunc(500) + '</td></tr></table>'
    + 'Flyfrakten fra Hong Kong for <i>P10000</i> er lik fortsatt '
    + freightPrice.toLocaleString() + ' pr flygning.<br>'
    + 'Hvor mange eksemplarer anbefaler du at ErikH$EirikH bestiller av denne?'
    + '<input id="inSldr" type="range" min="0" max="500" value="0" '
    + 'step="10" onchange="sliderChange(this, &quot;sSliderVal&quot;)" />'
    + '<p><span id="sSliderVal">0</span> enheter <p>'
      )};
    this.mainFunc = function() {
            var n = parseInt(document.getElementById("inSldr").value);
            addto(n * unitPrice2 + freightPrice, balance.currentAssets, 'Varelager');
            addto(n * unitPrice2 + freightPrice, balance.currentLiabilities, 'Leverandørgjeld');
            addto(n, inventory.count, 'P10000');
            payDate = new Date(d.getFullYear(), d.getMonth() + 3, 0);
            console.log(payDate);
            paymentsDue['order' + dateToString(d)] = {
                                    Date: {d: payDate.getDate(), m: payDate.getMonth() + 1, y: payDate.getFullYear()},
                                    amount: function(){return(n * unitPrice2 + freightPrice);},
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
            inventory.detailed['order' + dateToString(d)] = {
              name: 'P10000',
              n: n,
              p: unitPrice2 + freightPrice/n
            };
            this.eventTxt = function(){
              return(dateToString2(d) + ': ' + n + ' peanøttpoleringsmaskiner bestilt fra Hong Kong.')
            };
    };
    this.eventTxt = function(){return(0);}

  },
  // Mulighet til å selge i differensiert marked................................................................................................
  function(d) {
    this.dayNr = dateDiff(baseDate, new Date(baseDate.getFullYear(), baseDate.getMonth() + 4, 2));
    this.txtFunc = function() {
      //var n = 0;
      //for(var key in inventory)
      var outTxt =
      'Nye varer er ankommet og utsalgspris må bestemmes.<br>'
    + 'Forholdet mellom pris og etterspørsel (per kvartal) for <i>P10000</i>: <br>'
    + '<table class="table table"><tr><th>Pris</th><td>1500</td><td>500</td></tr>'
    + '<tr><th>Forventet salg</th><td>' + demandFunc(1500)
    + '</td><td>' + demandFunc(500) + '</td></tr></table>'
    + 'For enkelhets skyld så setter vi betalingfrist ved utløpet av kvartalet for alle som kjøper i løpet'
    + ' av en kvartalet.<br>'
    + 'Utsalgspris for  <i>P10000</i>:'
    + '<input id="inSldr" type="range" min="0" max="2000" value="0" name="sldrs"'
    + ' step="50" onchange="sliderChange(this, &quot;sSliderVal&quot;)" />'
    + '<p><span id="sSliderVal">0</span> kr <p>'
    + '<br>(Det finnes '+  inventory.count.P10000.toLocaleString() + ' varer på lager)';

      return(outTxt)
      };
    //+ '<br>(Det finnes '+ balance.currentAssets['Varelager'].toLocaleString() + ' varer på lager)',
    this.mainFunc = function(){

        //for(sldr in document.getElementsByTagName('sldrs'))
      var p = parseInt(document.getElementById("inSldr").value); //price

      var n = demandFunc(p); n = Math.max( 0, Math.min(n, parseInt2(inventory.count.PeanutPolishMachine)) );

      addto(-n, inventory.count, 'PeanutPolishMachine');
      addto(n * p, balance.currentAssets, 'Kundefordringer');
      addto(n * p, result.operatingIncome, 'Salgsinntekt');

      payDate = new Date(d.getFullYear(), 3, 0);
      paymentsDue['sale' + dateToString(d)] = {
                              Date: {d: payDate.getDate(), m: payDate.getMonth() + 1, y: payDate.getFullYear()},
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

      this.eventTxt = function(){
        var d_ = new Date(d.getFullYear(), d.getMonth() + 3, 0);
        return(dateToString2(d_) + ': ' + n
          + " peanøttpoleringsmaskiner ble i løpet av kvartalet solgt for " + p
          + " kroner per stk."
        );
      }

    };
    this.eventTxt = function(){return('');};

  }/*,
  function(d) {
    this.dayNr = dateDiff(baseDate, new Date(baseDate.getFullYear(), baseDate.getMonth() + 3, 1)) + 1;
    this.txtFunc = function() {
      return(
        'Spillet er over. Du kan utforske resultat og balanse under. <br>'
    )};
    this.mainFunc = function(){
      // Maybe some scoring and vizualisation here
      document.getElementById('nxtBtn').disabled = true;
      //document.getElementById("pEvent").innerHTML = '<br>';
    };
    this.eventTxt = function(){return(' ');};

  }*/
];



var balance = { currentAssets: {"Bankinnskudd": 200000},
                longTermAssets: {},
                currentLiabilities: {},
                longTermLiabilities: {},
                shareholdersEquity: {"Aksjekapital": 200000,
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
  ibBank: 200000,
  operatingActivities: {},
  investingActivities: {},
  financingActivities: {}
};
