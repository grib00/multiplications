
var InputBuffer = "";
var DivQuestions;
var Questions;
var IndexQuestion;

function clickTableChoice(table) {
	DivQuestions.innerHTML = "";
	refreshDisplay();
	generateQuestions();
	askOneQuestion();
}

function generateQuestions() {
	questions = new Array();
	for (i = 2; i <= 9; i++) if (document.getElementById("t"+i).checked)
		for (j = 2; j <= 9; j++) {
			q = new Object();
			q.x = i;
			q.y = j;
			q.randomKey = Math.random();
			questions[questions.length] = q;
		}
	Questions = questions.sort(function(a,b){return a.randomKey - b.randomKey;});
	IndexQuestion = -1;
}

function clickOK() {
	if (InputBuffer == "") return;
	checkResult();
	askOneQuestion();
}

function init() {
	DivQuestions = document.getElementById("DivQuestions");
	document.onkeypress = keypressEvent;
	refreshDisplay();
	generateQuestions();
	askOneQuestion();
}

function askOneQuestion() {
	IndexQuestion++;
	if (IndexQuestion >= Questions.length) {
		msg = Questions.length == 0 ? "Choisis les tables que tu désires réviser" : "Exercice terminé...";
		DivQuestions.innerHTML += "<span>" + msg + "</span>";
		return;
	}
	x = Questions[IndexQuestion].x;
	y = Questions[IndexQuestion].y;
	DivQuestions.innerHTML += "<span style='background-color=yellow;'>" + x.toString() + " x " + y.toString() + "</span>";
}

function checkResult() {
	if (IndexQuestion >= Questions.length) return;
	r1 = parseInt(InputBuffer);
	r = Questions[IndexQuestion].x * Questions[IndexQuestion].y;
	ok = r1 == r;
	color = ok ? "lightgreen" : "red";
	e = DivQuestions.childNodes[DivQuestions.childNodes.length-1];
	e.innerHTML += " = ";
	if (!ok) e.innerHTML += "<s>" + r1 + "</s> ";
	e.innerHTML += r.toString();
	e.style.backgroundColor = color;
	DivQuestions.innerHTML += "<br>";
	InputBuffer = "";
	refreshDisplay();
}

function refreshDisplay() {
	document.getElementById("result_dsp").innerHTML =
		InputBuffer == "" ? "&nbsp;" : InputBuffer + "_";
}

function clickDigit(n) {
	InputBuffer += n;
	refreshDisplay();
}

function clickBackspace() {
	if (InputBuffer != "") InputBuffer = InputBuffer.substring(0, InputBuffer.length-1);
	refreshDisplay();
}

function keypressEvent() {
	event.returnValue = false;
	var c = event.keyCode;
	if (48 <= c && c <= 57) {
		return clickDigit((c - 48).toString());
	}
	var cs = String.fromCharCode(c);
	switch (cs) {
		case "b":
		case "B": clickBackspace(); break;
		case "\r": clickOK(); break;
	}
}
