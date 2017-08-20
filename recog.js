// HTML5 Speech Recognition API -->
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


var rawTable = {
	a: ['a', 'alpha', 'alfa'],
	b: ['b', 'bravo', 'baker'],
	c: ['c', 'charlie'],
	d: ['d', 'delta'],
	e: ['e', 'echo'],
	f: ['f', 'fox', 'foxtrot'],
	g: ['g', 'golf'],
	h: ['h', 'hotel'],
	i: ['i', 'india'],
	j: ['j', 'juliet'],
	k: ['k', 'kilo', 'hilo'],
	l: ['l', 'lima'],
	m: ['m', 'mike'],
	n: ['n', 'november'],
	o: ['o', 'oscar'],
	p: ['p', 'papa'],
	q: ['q', 'quebec'],
	r: ['r', 'romeo'],
	s: ['s', 'sierra'],
	t: ['t', 'tango'],
	u: ['u', 'uniform'],
	v: ['v', 'victor'],
	w: ['w', 'whiskey'],
	x: ['x', 'xray'],
	y: ['y', 'yankee'],
	z: ['z', 'zed', 'zulu', 'zebra'],
	0: ['0'],
	1: ['1'],
	2: ['2'],
	3: ['3'],
	4: ['4'],
	5: ['5'],
	6: ['6'],
	7: ['7'],
	8: ['8'],
	9: ['9', 'niner'],
}

var transtable = {};

Object.keys(rawTable).forEach(function(k) {
	var arr = rawTable[k];
	arr.forEach(function(def) {
		transtable[def] = k;
	});
});

function translate(str) {
  var words = str.split(' ');
  words = words.map(function(w) {
	return w.toLowerCase();
  });
  var out = "";
  words.forEach(function(w) {
	var s = transtable[w];
	if (s === undefined) {
	  s = w.charAt(0);
	}
	out += s;
  });
  return out;
}

function startDictation() {


  var interimTxt = document.getElementById('interim');
  var finalTxt = document.getElementById('final');

  var finalTranscript = "";

	if (SpeechRecognition) {
		var recog = new SpeechRecognition();
		recog.continuous = false;
		recog.interimResults = true;
		recog.lang = "en-US";
		recog.start();
		recog.onstart = function(e) {
		  finalTranscript = "";
		  interimTxt.textContent = "";
		  finalTxt.textContent = "";
		};
		recog.onresult = function(e) {
		  var interimTranscript = "";

		   for (var i = e.resultIndex; i < e.results.length; ++i) {
			 var r = e.results[i];
			 if (r.isFinal) {
			   finalTranscript += r[0].transcript;
			 } else {
			   interimTranscript += r[0].transcript;
			 }
		   }
		   finalTxt.textContent = finalTranscript;
		   interimTxt.textContent = interimTranscript;
		 };
		recog.onerror = function(e) {
			console.log("error: " + e);
		};
		recog.onend = function(e) {

		};
	}
}