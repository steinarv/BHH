function newAssign() {
  var frm = document.getElementById('frmAssign');

  while (frm.firstChild) {
    frm.removeChild(frm.firstChild);
  }

  var input, tmptxt;
  var obj = new assObj[0]();
  document.getElementById('pAssign').innerHTML = obj.html;
  var alt  = obj.alt(), ans = obj.ansv;

  var pSol = document.getElementById('pSolution');
  pSol.innerHTML = 'Hint: ' + obj.hint;
  pSol.style.display = 'none';

  for(var i = 0; i < alt.length; i++){
    input = document.createElement("input");
    input.type = "radio";
    input.name = "ans";
    input.value = alt[i] == ans;
    frm.appendChild(input);
    frm.appendChild(document.createTextNode(' ' + alt[i]));
    frm.appendChild(document.createElement('br'));
  }
}

function onLoadFunc() {
  newAssign();
}


function ssFunc() {
  var rbs = document.getElementsByName("ans");
  var fdBck = document.getElementById('pFeedBack');
  var sScr = document.getElementById('sScr');
  if(sScr.innerHTML === ''){ sScr.innerHTML = 0; }

  var pSol = document.getElementById('pSolution');
  var ansTxt;

  for(var i = 0; i < rbs.length; i++) {
    if(rbs[i].checked)if(rbs[i].value === "true") {
      fdBck.innerHTML = 'Riktig! Ny oppgave..';
      sScr.innerHTML = parseInt(sScr.innerHTML) + 1;

      ansTxt = document.getElementById('pAssign').innerHTML
            +  '<br>' + pSol.innerHTML;
      pSol.innerHTML = ansTxt;
      pSol.style.display = 'inline';

      newAssign();
    }else {
      fdBck.innerHTML = 'Galt, prøv igjen!';
      sScr.innerHTML = parseInt(sScr.innerHTML) - 1;
      pSol.style.display = 'inline';
    }
  }

}
