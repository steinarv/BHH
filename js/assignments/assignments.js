
$(function () { 
		$('#lstCh').multiselect({
			buttonText: function(options, select) { return("Kapitler: "); },
			buttonWContainer: '<div class="panel panel-default">'
		});
    $('#lstCh').multiselect('selectAll', false);
		$("#lstCh").multiselect('updateButtonText');
		
		newAssign();
});



function newAssign() {
  var tbl = document.getElementById("tblAssign");
  var trs = tbl.getElementsByTagName('tr');
  var ntr = trs.length;
  // delete old rows
  for(i = 1; i <= ntr; i++)tbl.deleteRow(-1);
  // row variable
  var rw;

	// Make array with chapters from selected arrays
  var selCh = document.getElementById('lstCh');
	var tmpArr, assignArray = [];
	for(var i = 0; i < selCh.length; i++) { 
		if(selCh[i].selected) {
			tmpArr = allChaptersArray[i];
			for(var j = 0; j < tmpArr.length; j++) { assignArray.push(tmpArr[j]); }
		}
	}
	//------------------------------------------------

	var r = rb(0, assignArray.length - 1);
  var obj = new assignArray[r]();
  document.getElementById('pAssign').innerHTML = '<b>Oppgavetekst</b><br>' + obj.html;
  var alt  = obj.alt, ans = obj.ansv;

  var pHint = document.getElementById('pHint');
  pHint.innerHTML = 'Hint: ' + obj.hint;
  pHint.style.display = 'none';

	var input;
  for(var i = 0; i < alt.length; i++){
    rw = tbl.insertRow(-1);

    input = document.createElement("input");
    input.type = "radio";
    input.name = "ans";
    input.value = alt[i] == ans;

    rw.insertCell(-1).appendChild(input);
    rw.insertCell(-1).innerHTML = alt[i];
  }
}

function onLoadFunc() {
  //newAssign();
}


function checkSolutionFunc() {
  var rbs = document.getElementsByName("ans");
  var fdBck = document.getElementById('pFeedBack');
  var sScr = document.getElementById('sScr');
  if(sScr.innerHTML === ''){ sScr.innerHTML = 0; }

  var pHint = document.getElementById('pHint');
  var pPrevAssign = document.getElementById('pPrevAssign');
  var ansTxt;

  for(var i = 0; i < rbs.length; i++) {
    if(rbs[i].checked)if(rbs[i].value === "true") {
      fdBck.innerHTML = 'Riktig! Ny oppgave..';
      sScr.innerHTML = parseInt(sScr.innerHTML) + 1;

      ansTxt = '<b>Forige oppgave:</b> <br>' + document.getElementById('pAssign').innerHTML
            +  '<br> <b>Svar på denne oppgaven var:</b> <br>'
            + document.getElementById("tblAssign").getElementsByTagName('tr')[i].cells[1].innerHTML;
      pPrevAssign.innerHTML = ansTxt;

      newAssign();
    }else {
      fdBck.innerHTML = 'Galt, prøv igjen!';
      sScr.innerHTML = parseInt(sScr.innerHTML) - 1;
      pHint.style.display = 'inline';
      pPrevAssign.innerHTML = '';
    }
  }

}
