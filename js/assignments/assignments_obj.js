function anyIn(arr, x) {
  boolOut = false;
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === x) {boolOut = true;}
  }
  return(boolOut);
}

function makeAlt(n, ans, min_i, max_i) {
  var tmp0, tmp1 = [ans];
  var i = 1;

  while(i < n) {
    tmp0 = rb(min_i, max_i);
    // tmp0 not in tmp1
    if(!anyIn(tmp1, tmp0)) {
      Math.random() > 0.5 ? tmp1.push(tmp0) : tmp1.unshift(tmp0);
      i++;
    }
  }
  return(tmp1);
}

function rb(min_i, max_i) {
  return( Math.round(Math.random()*(max_i - min_i) + min_i) );
}

var ch0 = [
  function(){
    this.vars = [rb(1,10), rb(1, 10)];
    this.html = 'Hva blir ' + this.vars[0] + ' + ' + this.vars[1] + '?';
    this.ansv = this.vars[0] + this.vars[1];
    this.alt = makeAlt(5, this.ansv, 0, 20);
    this.hint = 'Se læreboka side 4 - 7 og oppgave 3 i oppgaveboka';
  }
];

var ch1 = [
	function() {
		this.vars = [rb(6,10) * 1000, rb(10,40) * 1, rb(5, 15) * 100];
		this.html = 'Karl & Co kjøper inn ' + this.vars[0].toLocaleString() 
		+ ' kg råverer den 10.oktover 2011 til kr ' + this.vars[1].toLocaleString()
		+ ' pr. kg. <br> De betaler halvparten av innkjøpet 1.desember 2011 og resten '
		+ ' 5. januar 2012. Ved slutten av året har Karl & Co ' + this.vars[2].toLocaleString()
		+ ' kg av råvarene igjen på lager.<br>'
		+ ' Hva blir firmaets råvare<u>utgift</u> for partiet i 2011?';
		this.ansv = this.vars[0] * this.vars[1];
		this.alt = shuffle( [(this.vars[0] * this.vars[1]) / 2, 
												0, 
												(this.vars[0] - this.vars[2]) * this.vars[1], 
												this.ansv] );
		this.hint = 'Se læreboka side 42 samt oppgave 2.2 i oppgaveboka';
	
	},
	function() {
		this.vars = [rb(6,10) * 1000, rb(10,40) * 1, rb(5, 15) * 100];
		this.html = 'Karl & Co kjøper inn ' + this.vars[0].toLocaleString() 
		+ ' kg råverer den 10.oktover 2011 til kr ' + this.vars[1].toLocaleString()
		+ ' pr. kg. <br> De betaler halvparten av innkjøpet 1.desember 2011 og resten '
		+ ' 5. januar 2012. Ved slutten av året har Karl & Co ' + this.vars[2].toLocaleString()
		+ ' kg av råvarene igjen på lager.<br>'
		+ ' Hva blir firmaets råvare<u>kostnad</u> knyttet til dette partiet i 2011?';
		this.ansv = Math.round((this.vars[0] - this.vars[2]) * this.vars[1]);
		this.alt = shuffle(	[this.vars[0] * this.vars[1], 
												0, 
												(this.vars[0] - this.vars[2]) / 2, 
												this.ansv]);
		this.hint = 'Se læreboka side 42 samt oppgave 2.2 i oppgaveboka';
	
	},
	function() {
		vars = [rb(3,10) * 1000000, rb(2,6)/100];
		this.html = 'En bedrift har et lån på kr ' + vars[0].toLocaleString() + '.<br>'
		+ 'Lånerenten er på ' + (vars[1] * 100).toLocaleString() + ' % p.a. '
		+ 'Renter og avdag betales to ganger per år.<br>'
		+ 'I slutten av mars betaler bedriften kr ' 
		+ (vars[0] * vars[1] / 2).toLocaleString() + ' i renter'
		+ ' (' + vars[0].toLocaleString() + ' * ' + vars[1].toLocaleString() + ' * 1/2)'
		+ ' og kr 500 000 i avdrag.<br>'
		+ 'I balansen pr. 31.12 forrige år var skyldige renter for lånet'
		+ ' oppført med ' + (vars[0] * vars[1] / 4).toLocaleString() 
		+ ' (' + vars[0].toLocaleString() + ' * ' + vars[1].toLocaleString() + ' * 3/12).<br>'
		+ 'Hvilket beløp skal lånet oppføres med i balansen pr 30.4?';
		this.ansv = Math.round(vars[0] - 500000);
		this.alt = shuffle(	[vars[0] - 500000 - vars[0] * vars[1], 
												vars[0] - vars[0] * vars[1], 
												vars[0], 
												this.ansv]);
		this.hint = 'Se læreboka side 38 samt oppgave 2.3 i oppgaveboka';
	},
	function() {
		vars = [rb(3,10) * 1000000, rb(2,6)/100];
		this.html = 'En bedrift har et lån på kr ' + vars[0].toLocaleString() + '.<br>'
		+ 'Lånerenten er på ' + (vars[1] * 100).toLocaleString() + ' % p.a. '
		+ 'Renter og avdag betales to ganger per år.<br>'
		+ 'I slutten av mars betaler bedriften kr ' 
		+ (vars[0] * vars[1] / 2).toLocaleString() + ' i renter'
		+ ' (' + vars[0].toLocaleString() + ' * ' + vars[1].toLocaleString() + ' * 1/2)'
		+ ' og kr 500 000 i avdrag.<br>'
		+ 'I balansen pr. 31.12 forrige år var skyldige renter for lånet'
		+ ' oppført med ' + (vars[0] * vars[1] / 4).toLocaleString() 
		+ ' (' + vars[0].toLocaleString() + ' * ' + vars[1].toLocaleString() + ' * 3/12).<br>'
		+ 'Hvilket beløp skal skyldige renter oppføres med i balansen pr 30.4?';
		this.ansv = Math.round((vars[0] - 500000) * vars[1] / 12);
		this.alt = shuffle(	[vars[0] * vars[1]/12, 
												(vars[0] - 500000) * vars[1], 
												(vars[0] - 500000) * vars[1] / 2, 
												this.ansv]);
		this.hint = 'Se oppgave 2.3 i oppgaveboka (løsning finnes på'
		+ '<a href="https://www.universitetsforlaget.no/kostnads-og-inntektsanalyse">'
		+ 'bokens hjemmeside</a>';
	},
	function() {
		vars = [rb(3,10) * 1000000, rb(2,6)/100];
		this.html = 'En bedrift har et lån på kr ' + vars[0].toLocaleString() + '.<br>'
		+ 'Lånerenten er på ' + (vars[1] * 100).toLocaleString() + ' % p.a. '
		+ 'Renter og avdag betales to ganger per år.<br>'
		+ 'I slutten av mars betaler bedriften kr ' 
		+ (vars[0] * vars[1] / 2).toLocaleString() + ' i renter'
		+ ' (' + vars[0].toLocaleString() + ' * ' + vars[1].toLocaleString() + ' * 1/2)'
		+ ' og kr 500 000 i avdrag.<br>'
		+ 'I balansen pr. 31.12 forrige år var skyldige renter for lånet'
		+ ' oppført med ' + (vars[0] * vars[1] / 4).toLocaleString() 
		+ ' (' + vars[0].toLocaleString() + ' * ' + vars[1].toLocaleString() + ' * 3/12).<br>'
		+ 'Hvilken rentekostnad vil du belaste resultatregnskapet pr. 30.4 med?';
		this.ansv = Math.round(vars[0] * vars[1] / 4 + (vars[0] - 500000) * vars[1] / 12);
		this.alt = shuffle(	[vars[0] * vars[1] / 4 + vars[0] * vars[1]/12, 
												(vars[0] * vars[1] / 4 + vars[0] - 500000) * vars[1], 
												(vars[0] * vars[1] / 4 + vars[0] - 500000) * vars[1] / 2, 
												this.ansv]);
		this.hint = 'Se oppgave 2.3 i oppgaveboka (løsning finnes på'
		+ '<a href="https://www.universitetsforlaget.no/kostnads-og-inntektsanalyse">'
		+ 'bokens hjemmeside</a>';
	},
	function() {
		vars = [rb(2,5) * 100000, rb(5,10) * 10000];
		this.html = 'En bedrift har anskaffet en bil til kr ' + vars[0].toLocaleString() + '.<br>'
		+ 'Bilen antas å kunne nyttes i 3 år.'
		+ 'Anslått salgspris etter 3 år er kr ' + vars[1].toLocaleString() + ' (= utrangeringsverdi).<br>'
		+ 'Beregn gjennomsnittlig årlig kapitalforbruk.';
		this.ansv = Math.round((vars[0] - vars[1]) / 3);
		this.alt = shuffle(	[vars[0] / 3, 
												(vars[0] / 3) * 1.1, 
												((vars[0] - vars[1]) / 3) * 1.1, 
												this.ansv]);
		this.hint = 'Se læreboka side 44 samt oppgave 2.6 i oppgaveboka';
	}
	
]

var allChaptersArray = [ch0, ch1];

