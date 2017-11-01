function anyIn(arr, x) {
  boolOut = false;
  for(var i = 0; i < arr.length; i++) {
    if(arr[i] === x) {boolOut = true;}
  }
  return(boolOut);
}

function rb(min_i, max_i) {
  return( Math.round(Math.random()*(max_i - min_i) + min_i) );
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

assObj = [
  function(){
    this.vars = [rb(1,10), rb(1, 10)];
    this.html = 'Hva blir ' + this.vars[0] + ' + ' + this.vars[1] + '?';
    this.ansv = this.vars[0] + this.vars[1];
    this.alt = function() {
      return( makeAlt(5, this.ansv, 0, 20) );
    };
    this.hint = 'Se læreboka side 4 - 7 og oppgave 3 i oppgaveboka';
  },
	function() {
		this.vars = [rb(6,10) * 1000, rb(10,40) * 1, rb(5, 15) * 100];
		this.html = 'Karl & Co kjøper inn ' + this.vars[0].toLocaleString() 
		+ ' kg råverer den 10.oktover 2011 til kr ' + this.vars[1].toLocaleString()
		+ ' pr. kg. <br> De betaler halvparten av innkjøpet 1.desember 2011 og resten '
		+ ' 5. januar 2012. Ved slutten av året har Karl & Co ' + this.vars[2].toLocaleString()
		+ ' kg av råvarene igjen på lager.<br>'
		+ ' Hva blir firmaets råvareutgift for partiet i 2011?';
		this.ansv = (this.vars[0] * this.vars[1])/2;
		this.alt = function() {
			return([this.vars[0] * this.vars[1], 0, (this.vars[0] - this.vars[2]) * this.vars[1], (this.vars[0] * this.vars[1])/2]);
		}
		this.hint = 'Se læreboka side 42 samt oppgave 2.2 i oppgaveboka';
	
	}
]
