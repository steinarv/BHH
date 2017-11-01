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
  function() {
    d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 1);
    console.log("Assignment 1: ", dateToString2(d));
    this.dayNr = this.dayNr = dateDiff(baseDate, d); // 1
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
    + '<br><br><br>Det er tid for å sende en bestilling til produsent, med levering'
    + ' neste dag og betalingsfrist ved utgangen av kvartalet.<br>'
    + 'Prisen fra Hong Kong (inntakskost) for <i>PP2000</i> er kr ' + unitPrice1.toLocaleString()
    + ' pr enhet. Flyfrakten koster kr ' + freightPrice1.toLocaleString() + ' pr flygning'
		+ ' og høyest mulig bestillingskvantum er 500 stk.<br>'
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

            var item1 = 'PP2000';
            var n_buy1 = document.getElementById('in_' + item1 + '_n').valueAsNumber;
            var p_sale1 = document.getElementById('in_' + item1 + '_p').valueAsNumber; //price
            var n_sale1 = Math.floor(demandFunc(p_sale1) * 0.9);
            // Register merchendise in! ..............................................................................
            sEventTxt += buyFunc(d, item1, n_buy1, unitPrice[item1], freightPrice1);

            // Register merchendise out! ..............................................................................
            sEventTxt = sellFunc(d, item1, n_sale1, p_sale1) + sEventTxt;

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
   function() {
    d = new Date(baseDate.getFullYear(), baseDate.getMonth() + 4, 1);
    this.dayNr = this.dayNr = dateDiff(baseDate, d);
    function sliderChange(x) {
      document.getElementById("sSliderVal").innerHTML = x.value.toLocaleString();
    }
    this.txtFunc = function() {
      outTxt =
      'Salget av <i>PP2000</i> ble noe lavere enn forventet dette kvartalet.'
      + ' Spesielt merket man et brå nedgang i salget mot slutten av perioden.<br>'
      + 'Man regner med at dette skyldes den nyeste modellen peanøttpoleringsmaskin <i>P10000</i>.'
      + 'som har tatt markedet med storm. <br>Grunnet mer avansert teknologi er denne noe dyrere'
      + ' i innkjøp, ' + unitPrice["P10000"].toLocaleString() + ' kroner per stk., samtidig som'
			+ ' flyfrakten fra Hong Kong fortsatt koster kroner '
      + freightPrice1.toLocaleString() + ' pr flygning, med en begrensning på 500 enheter.<br><br>'
      + 'Etterspørselen gjennom neste kvartal forventes å være tilsvarende forrige modell<br><br>'
      + '<table class="table table"><tr><th>Pris</th><td>1500</td><td>500</td></tr>'
      + '<tr><th>Forventet salg</th><td>' + demandFunc(1500)
      + '</td><td>' + demandFunc(500) + '</td></tr></table>'
      + '<br> Hvor mange enhter <i>P10000</i> bør ErikH$EirikH bestille?<br><br>'
      + '<input id="in_P10000_n" type="range" min="0" max="500" value="0" name = "sldrBuy"'
      + 'step="10" onchange="sliderChange(this)" />'
      + '<p><span id="s_in_P10000_n">0</span> enheter <p>'
      + '<br> Markedsføringen av de bestilte peanøttpoleringsmakinene starter umiddelbart,'
      + ' og prisen må derfor også bestemmes: <br>'
      + '<input id="in_P10000_p" type="range" min="0" max="2000" value="0" name = "sldrPrice"'
      + ' step="50" onchange="sliderChange(this)" />'
      + '<p><span id="s_in_P10000_p">0</span> kr <p>';

      var inventoryTxt = '<br>';
      if(inventory.count["PP2000"] > 0) {
        inventoryTxt += '(Det er ' + inventory.count["PP2000"].toLocaleString()
        + ' enheter med <i>PP2000</i> igjen på lager.) <br>'
        + 'Lokal etterspørsel etter disse er nå nærmest fraværende, men noen steder i Afrika'
        + ' er disse fortsatt veldig populære grunnet holdbarhet og tilgang på reservedeler.<br>'
        + 'Betalingsviligheten er likevel lav, da det ryktes at flere grossister sitter inne med store'
        + 'overskuddslagere.<br>For øyeblikket er eksportørene villige til å betale 75 kroner per stk.'
        + ' for så mange enheter de klarer å få tak i. Bør ErikH&EirikH selge resten av lageret til denne prisen?<br>'
        + '<input type="radio" name="selRest" id="rbYes"> Ja <br>'
        + '<input type="radio" name="selRest" > Nei';
      }

      return(outTxt + inventoryTxt)
    };
    this.mainFunc = function() {
      sEventTxt = '';

      var item1 = 'P10000';
      var n_buy1 = document.getElementById('in_' + item1 + '_n').valueAsNumber;
      var p_sale1 = document.getElementById('in_' + item1 + '_p').valueAsNumber; //price
      var n_sale1 = demandFunc(p_sale1);
      // Register merchendise in! ..............................................................................
      sEventTxt += buyFunc(d, item1, n_buy1, unitPrice[item1], freightPrice1);

      // Register merchendise out! ..............................................................................
      sEventTxt = sellFunc(d, item1, n_sale1, p_sale1) + sEventTxt;

		
			var rbYes = document.getElementById("rbYes");
      if(rbYes != null && rbYes.checked) {
        var item2 = 'PP2000'
        var p_sale2 = 75;
        var n_sale2 = inventory.count[item2];
        sEventTxt = sellFunc(d, item2, n_sale2, p_sale2) + sEventTxt;
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
  function() {
    d = new Date(baseDate.getFullYear(), baseDate.getMonth() + 7, 1);
    this.dayNr = this.dayNr = dateDiff(baseDate, d);
    function sliderChange(x) {
      document.getElementById("sSliderVal").innerHTML = x.value.toLocaleString();
    }
    this.txtFunc = function() {
      
	  var inventoryTxt = '<br>';
      if(inventory.count["P10000"] > 0) {
        inventoryTxt += '(Det er ' + inventory.count["P10000"].toLocaleString()
        + ' enheter med <i>P10000</i> igjen på lager.) <br>';
	  }
	  
	  outTxt =
      '<i>P10000</i> har solgt som forventet, og man regner med at etterspørselen vil være lik'
			+ ' også i neste periode. <br><br>' 
      + '<table class="table table"><tr><th>Pris</th><td>1500</td><td>500</td></tr>'
      + '<tr><th>Forventet salg</th><td>' + demandFunc(1500)
      + '</td><td>' + demandFunc(500) + '</td></tr></table>'
      + 'Stykkpris(' + unitPrice["P10000"].toLocaleString() + ') og flyfrakt ('
      + freightPrice1.toLocaleString() + ' pr flygning) har ikke endret seg.<br>'
			+ 'Imidlertid har det åpnet seg en mulighet for å selge disse peanøttpoleringsmakinene på Island.'
			+ ' Grunnet geografisk avstand og kundenens ønske om å prøve maskinene på egne peanøtter'
			+ ' før eventuelle kjøp vil ikke prissettingen her påvirke lokal etterspørsel.' 
			+ ' Forholdet mellom pris og etterspørsel på Island er som følger:<br><br>'
			+ '<table class="table table"><tr><th>Pris</th><td>1500</td><td>500</td></tr>'
      + '<tr><th>Forventet salg</th><td>' + demandFunc(1500)
      + '</td><td>' + demandFunc(500) + '</td></tr></table>'
			+ 'ErikH$EirikH må betale kroner ' + shippingIceland1.toLocaleString() + ' i frakt for hver peanøttpoleringsmakin som blir solgt til Island.'
			+ '<br><br>Hvor mange enheter <i>P10000</i> mener du ErikH$EirikH bør bestille, gitt forutsetningene over?'
			+ inventoryTxt
      + '<input id="in_P10000_n" type="range" min="0" max="500" value="0" name = "sldrBuy"'
      + 'step="10" onchange="sliderChange(this)" />'
      + '<p><span id="s_in_P10000_n">0</span> enheter <p>'
      + '<br> Nå må det settes en lokal pris og en pris for det islandske markedet. Merk at lokal etterspørsel'
			+ ' vil bli dekket først, og det er da eventuelt resternde lager som blir tilbudt på Island.<br>'
			+ 'Lokal pris: <br>'
      + '<input id="in_P10000_p1" type="range" min="0" max="2000" value="0" name = "sldrPrice1"'
      + ' step="50" onchange="sliderChange(this)" />'
      + '<p><span id="s_in_P10000_p1">0</span> kr <p>'
			+ 'Pris på island: <br>'
      + '<input id="in_P10000_p2" type="range" min="0" max="2000" value="0" name = "sldrPrice2"'
      + ' step="50" onchange="sliderChange(this)" />'
      + '<p><span id="s_in_P10000_p2">0</span> kr <p>';

      

      return(outTxt + inventoryTxt)
    };
    this.mainFunc = function() {
      sEventTxt = '';

      var item1 = 'P10000';
      var n_buy1 = document.getElementById('in_' + item1 + '_n').valueAsNumber;
      var p_sale1 = document.getElementById('in_' + item1 + '_p1').valueAsNumber; //price market 1
			var p_sale2 = document.getElementById('in_' + item1 + '_p2').valueAsNumber; //price market 2
      var n_sale1 = demandFunc(p_sale1);
			
      // Register merchendise in! ..............................................................................
      sEventTxt += buyFunc(d, item1, n_buy1, unitPrice[item1], freightPrice1);

      // Register merchendise out in market 1! ..................................................................
      sEventTxt = sellFunc(d, item1, n_sale1, p_sale1) + sEventTxt;
			// Register merchendise out in market 1! ..................................................................
      var n_sale2 = Math.min(inventory.count['P10000'], demandFunc(p_sale2));
			if(n_sale2 > 0){
				sEventTxt = sellFunc(d, item1, n_sale2, p_sale2) + sEventTxt;
				// Register shipmentcost to Iceland
				addto(n_sale2 * shippingIceland1, result.operatingCosts, 'Andre driftskostnader');
				addto(n_sale2 * shippingIceland1, balance.currentLiabilities, 'Leverandørgjeld');
				payDate = new Date(d.getFullYear(), d.getMonth() + 3, 0);
				paymentsDue['shipping' + dateToString(d)  + item1] = {
                          Date: {d: payDate.getDate(), m: payDate.getMonth() + 1, y: payDate.getFullYear()},
                          amount: n_sale2 * shippingIceland1,
                          add1_obj: balance.currentLiabilities,
                          add1_name: 'Leverandørgjeld',
                          add1_sign: -1,
                          add2_obj: balance.currentAssets,
                          add2_name: 'Bankinnskudd',
                          add2_sign: -1,
                          cfobj_obj: cashFlowStatement.operatingActivities,
                          cfobj_name: 'Betalt frakt Island',
                          cfobj_sign: -1
				};
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
  function() {
    d = new Date(baseDate.getFullYear(), baseDate.getMonth() + 10, 1);
    this.dayNr = this.dayNr = dateDiff(baseDate, d);
    function sliderChange(x) {
      document.getElementById("sSliderVal").innerHTML = x.value.toLocaleString();
    }
    this.txtFunc = function() {
      
	  var inventoryTxt = '<br>';
      if(inventory.count["P10000"] > 0) {
        inventoryTxt += '(Det er ' + inventory.count["P10000"].toLocaleString()
        + ' enheter med <i>P10000</i> igjen på lager.) <br>';
	  }
	  
	  outTxt =
      '<i>P10000</i> har solgt som forventet, og man regner med at etterspørselen vil være lik'
	  + ' i neste periode, både lokalt og på Island. <br><br>'
	  + 'Lokal etterspørsel:'
      + '<table class="table table"><tr><th>Pris</th><td>1500</td><td>500</td></tr>'
      + '<tr><th>Forventet salg</th><td>' + demandFunc(1500)
      + '</td><td>' + demandFunc(500) + '</td></tr></table>'
      + 'Etterspørsel på Island:'
	  + '<table class="table table"><tr><th>Pris</th><td>1500</td><td>500</td></tr>'
      + '<tr><th>Forventet salg</th><td>' + demandFunc(1500)
      + '</td><td>' + demandFunc(500) + '</td></tr></table>'
	  + 'Grunnet en brå økning i prisen på råoilje har fraktprisen på peanøttpoleringsmakiner økt dramatisk. <br>'
	  + 'ErikH$EirikH må nå betale kroner ' + shippingIceland2.toLocaleString() 
		+ ' i frakt for hver peanøttpoleringsmakin som blir solgt til Island og'
	  + ' flyfrakten fra Hong Kong har også økt til ' + freightPrice2.toLocaleString() + ' kr.'
	  + '<br><br>Hvor mange enheter <i>P10000</i> mener du ErikH$EirikH bør bestille, gitt de nye forutsetningene?'
	  + inventoryTxt
      + '<input id="in_P10000_n" type="range" min="0" max="500" value="0" name = "sldrBuy"'
      + 'step="10" onchange="sliderChange(this)" />'
      + '<p><span id="s_in_P10000_n">0</span> enheter <p>'
      + '<br> Nå må det settes en lokal pris og en pris for det islandske markedet. Merk at lokal etterspørsel'
	  + ' vil bli dekket først, og det er da eventuelt resternde lager som blir tilbudt på Island.<br>'
	  + 'Lokal pris: <br>'
      + '<input id="in_P10000_p1" type="range" min="0" max="2000" value="0" name = "sldrPrice1"'
      + ' step="50" onchange="sliderChange(this)" />'
      + '<p><span id="s_in_P10000_p1">0</span> kr <p>'
	  + 'Pris på island: <br>'
      + '<input id="in_P10000_p2" type="range" min="0" max="2000" value="0" name = "sldrPrice2"'
      + ' step="50" onchange="sliderChange(this)" />'
      + '<p><span id="s_in_P10000_p2">0</span> kr <p>';

      

      return(outTxt + inventoryTxt)
    };
    this.mainFunc = function() {
      sEventTxt = '';

      var item1 = 'P10000';
      var n_buy1 = document.getElementById('in_' + item1 + '_n').valueAsNumber;
      var p_sale1 = document.getElementById('in_' + item1 + '_p1').valueAsNumber; //price market 1
			var p_sale2 = document.getElementById('in_' + item1 + '_p2').valueAsNumber; //price market 2
      var n_sale1 = demandFunc(p_sale1);
      // Register merchendise in! ..............................................................................
      sEventTxt += buyFunc(d, item1, n_buy1, unitPrice[item1], freightPrice2);

      // Register merchendise out! ..............................................................................
      sEventTxt = sellFunc(d, item1, n_sale1, p_sale1) + sEventTxt;
			// Register merchendise out in market 1! ..................................................................
      var n_sale2 = Math.min(inventory.count['P10000'], demandFunc(p_sale2));
			if(n_sale2 > 0){
				sEventTxt = sellFunc(d, item1, n_sale2, p_sale2) + sEventTxt;
				// Register shipmentcost to Iceland
				addto(n_sale2 * shippingIceland2, result.operatingCosts, 'Andre driftskostnader');
				addto(n_sale2 * shippingIceland2, balance.currentLiabilities, 'Leverandørgjeld');
				payDate = new Date(d.getFullYear(), d.getMonth() + 3, 0);
				paymentsDue['shipping' + dateToString(d)  + item1] = {
                          Date: {d: payDate.getDate(), m: payDate.getMonth() + 1, y: payDate.getFullYear()},
                          amount: n_sale2 * shippingIceland2,
                          add1_obj: balance.currentLiabilities,
                          add1_name: 'Leverandørgjeld',
                          add1_sign: -1,
                          add2_obj: balance.currentAssets,
                          add2_name: 'Bankinnskudd',
                          add2_sign: -1,
                          cfobj_obj: cashFlowStatement.operatingActivities,
                          cfobj_name: 'Betalt frakt Island',
                          cfobj_sign: -1
				};
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

  }
];



var balance = { currentAssets: {"Bankinnskudd": 200000},
                longTermAssets: {},
                currentLiabilities: {},
                longTermLiabilities: {},
                shareholdersEquity: {"Aksjekapital": 200000,
                                     "Udekket tap": 0,
                                     "Annen egenkapital": 0},
								totAssests: 0
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
	res: 0
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
