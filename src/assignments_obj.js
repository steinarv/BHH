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
    this.hint = 'Se læreboka side 4 - 7 og oppgave 3 i læreboka';
  }
]
