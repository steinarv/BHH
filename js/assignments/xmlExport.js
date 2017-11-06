function makeRandomString(lngth) {
	v1 = ('abcdefghijklmnopqrstuvwxyz123456789').split('');
	sOut = '';
	
	for(var i = 0; i < lngth; i++) {
		sOut += v1[Math.round(Math.random() * (v1.length - 1))];
	}
	
	return(sOut);	
}

function modString(s){
	s = '<div><p>' + s + '</p></div>';
	s = s.replace(/&/g, '&amp;'); //Needs to come first as it removes all ampersands
	s = s.replace(/<u>/g, '&lt;span style="text-decoration: underline;"&gt;');
	s = s.replace(/<\/u>/g, '&lt;/span&gt;');
	s = s.replace(/<br>/g, '</p><p>');
	s = s.replace(/</g, '&lt;');
	s = s.replace(/>/g, '&gt;');
	
	
	return(s);
}

function rndF(){ return(Math.round(Math.random() * 10000)); }

function fXML(obj) {
	for(var i = 0; i < obj.alt.length; i++){ if(obj.alt[i] == obj.ansv){ break; } }
	respId = [rndF(), rndF(), rndF(), rndF()];
var sXML = 
'<?xml version="1.0" encoding="UTF-8"?>'
+ '<questestinterop xmlns="http://www.imsglobal.org/xsd/ims_qtiasiv1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.imsglobal.org/xsd/ims_qtiasiv1p2 http://www.imsglobal.org/xsd/ims_qtiasiv1p2p1.xsd">'
  + '<assessment ident="' + makeRandomString(33) +'" title="Oppgave knyttet til Kostnads og Inntektsanalyse">'
    + '<qtimetadata>'
      + '<qtimetadatafield>'
        + '<fieldlabel>cc_maxattempts</fieldlabel>'
        + '<fieldentry>1</fieldentry>'
      + '</qtimetadatafield>'
    + '</qtimetadata>'
    + '<section ident="root_section">'
      + '<item ident="' + makeRandomString(33) +'" title="Velg riktig alternativ">'
        + '<itemmetadata>'
          + '<qtimetadata>'
            + '<qtimetadatafield>'
              + '<fieldlabel>question_type</fieldlabel>'
              + '<fieldentry>multiple_choice_question</fieldentry>'
            + '</qtimetadatafield>'
            + '<qtimetadatafield>'
              + '<fieldlabel>points_possible</fieldlabel>'
              + '<fieldentry>1.0</fieldentry>'
            + '</qtimetadatafield>'
            + '<qtimetadatafield>'
              + '<fieldlabel>assessment_question_identifierref</fieldlabel>'
              + '<fieldentry>' + makeRandomString(33) + '</fieldentry>'
            + '</qtimetadatafield>'
          + '</qtimetadata>'
        + '</itemmetadata>'
        + '<presentation>'
          + '<material>'
            + '<mattext texttype="text/html">' + modString(obj.html) + '</mattext>'
          + '</material>'
          + '<response_lid ident="response1" rcardinality="Single">'
            + '<render_choice>'
              + '<response_label ident="' + respId[0] + '">'
                + '<material>'
                  + '<mattext texttype="text/plain">' + obj.alt[0] + '</mattext>'
                + '</material>'
              + '</response_label>'
              + '<response_label ident="' + respId[1] + '">'
                + '<material>'
                  + '<mattext texttype="text/plain">' + obj.alt[1] + '</mattext>'
                + '</material>'
              + '</response_label>'
              + '<response_label ident="' + respId[2] + '">'
                + '<material>'
                  + '<mattext texttype="text/plain">' + obj.alt[2] + '</mattext>'
                + '</material>'
              + '</response_label>'
              + '<response_label ident="' + respId[3] + '">'
                + '<material>'
                  + '<mattext texttype="text/plain">' + obj.alt[3] + '</mattext>'
                + '</material>'
              + '</response_label>'
            + '</render_choice>'
          + '</response_lid>'
        + '</presentation>'
        + '<resprocessing>'
          + '<outcomes>'
            + '<decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/>'
          + '</outcomes>'
          + '<respcondition continue="No">'
            + '<conditionvar>'
              + '<varequal respident="response1">' + respId[i] + '</varequal>'
            + '</conditionvar>'
            + '<setvar action="Set" varname="SCORE">100</setvar>'
          + '</respcondition>'
        + '</resprocessing>'
      + '</item>'
      + '<item ident="' + makeRandomString(33) +'" title="Fyll inn riktig tall">'
        + '<itemmetadata>'
          + '<qtimetadata>'
            + '<qtimetadatafield>'
              + '<fieldlabel>question_type</fieldlabel>'
              + '<fieldentry>numerical_question</fieldentry>'
            + '</qtimetadatafield>'
            + '<qtimetadatafield>'
              + '<fieldlabel>points_possible</fieldlabel>'
              + '<fieldentry>1.0</fieldentry>'
            + '</qtimetadatafield>'
            + '<qtimetadatafield>'
              + '<fieldlabel>assessment_question_identifierref</fieldlabel>'
              + '<fieldentry>' + makeRandomString(33) + '</fieldentry>'
            + '</qtimetadatafield>'
          + '</qtimetadata>'
        + '</itemmetadata>'
        + '<presentation>'
          + '<material>'
            + '<mattext texttype="text/html">' + modString(obj.html) + '</mattext>'
          + '</material>'
          + '<response_str ident="response1" rcardinality="Single">'
						+ '<render_fib fibtype="Decimal">'
							+ '<response_label ident="answer1"/>'
						+ '</render_fib>'
					+ '</response_str>'
				+ '</presentation>'
        + '<resprocessing>'
          + '<outcomes>'
            + '<decvar maxvalue="100" minvalue="0" varname="SCORE" vartype="Decimal"/>'
          + '</outcomes>'
          + '<respcondition continue="No">'
						+ '<conditionvar>'
              + '<or>'
                + '<varequal respident="response1">' + obj.ansv + '</varequal>'
                + '<and>'
                  + '<vargte respident="response1">' + (obj.ansv - 1) + '</vargte>'
                  + '<varlte respident="response1">' + (obj.ansv + 1) + '</varlte>'
                + '</and>'
              + '</or>'
            + '</conditionvar>'
            + '<setvar action="Set" varname="SCORE">100</setvar>'
          + '</respcondition>'
        + '</resprocessing>'
      + '</item>'
    + '</section>'
  + '</assessment>'
+ '</questestinterop>';

return(sXML);
}