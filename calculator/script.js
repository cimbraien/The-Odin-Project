const MAX_DIGITS = 13;

const digitElements = Array.from(document.querySelectorAll(".dig")).sort(
	(a, b) => {
		return a.classList[2] > b.classList[2] ? 1 : -1;
	}
);

let memory = [0, 0]; //[num1, operation]

const ac = document.querySelector(".ac");
const dot = document.querySelector(".dot");

const screen = document.querySelector(".scr p");

let isFirstNum = true;
let digits = "0";
refreshScreen();

const operatorElements = document.querySelectorAll(".key-op");
const OPERATOR = ["*", "/", "+", "-"];

const equal = document.querySelector(".equal");

digitElements.forEach((dig) => {
	dig.addEventListener("click", () => {
		if (digits.startsWith("ERR")) {
			return;
		}
		addDigit(dig.classList[2]);
	});
});

operatorElements.forEach((op, i) => {
	op.addEventListener("click", () => {
		if (digits.startsWith("ERR")) {
			return;
		}
		addOperator(i + 1);
	});
});

dot.addEventListener("click", () => {
	if (digits.startsWith("ERR")) {
		return;
	}
	addDigit(".");
});
ac.addEventListener("click", () => reset());
equal.addEventListener("click", () => {
	if (digits.startsWith("ERR")) {
		return;
	}
	calculate();
	isFirstNum = true;
});

function addDigit(dig) {
	if (OPERATOR.includes(digits)) {
		//TODO trigger when inputing number after operation
		clearDigits();
	}
	if (digits.length >= MAX_DIGITS) {
		return;
	}
	if (dig == ".") {
		if (digits.includes(".")) return;
		digits += dig.toString();
		refreshScreen();
		return;
	} else if (digits.match(/^0$|^0[^.]/)) {
		digits = dig.toString();
		refreshScreen();
		return;
	}
	digits += dig.toString();
	refreshScreen();
}

function reset() {
	memory = [0, 0];
	isFirstNum = true;
	clearDigits();
}

function clearDigits() {
	digits = "0";
	refreshScreen();
}

function addOperator(op) {
	// 0=null,1=mult,2=div,3=add,4=sub
	if (!isFirstNum) {
		calculate();
		memory[1] = op;
		digits = OPERATOR[op - 1];
		refreshScreen();
		return;
	}
	isFirstNum = false;
	saveDigitsToMem();
	memory[1] = op;
	digits = OPERATOR[op - 1];
	refreshScreen();
}

function saveDigitsToMem() {
	memory[0] = parseFloat(digits);
	clearDigits();
}

function calculate() {
	if (memory[1] == 0) {
		return;
	}
	let x = memory[0];
	let y = parseFloat(digits);
	let res;
	switch (memory[1]) {
		case 1:
			res = x * y;
			break;
		case 2:
			res = x / y;
			break;
		case 3:
			res = x + y;
			break;
		case 4:
			res = x - y;
			break;
	}
	digits = parseResult(res);
	memory[0] = res;

	refreshScreen();
}

function parseResult(res) {
	let out = res.toFixed(4);
	out = out.replace(/\.0000/, "");
	if (out.match(/\./)) out = out.replace(/0*$/, "");
	if (Math.floor(out).toString().length > MAX_DIGITS) {
		out = "ERR:TOO_LARGE";
	}
	if (out.length > MAX_DIGITS && out.includes(".")) {
		out = out.substr(0, 13);
	}
	out = out.replace(/\.0000/, "");
	if (out.match(/\./)) out = out.replace(/0*$/, "");
	return out;
}

function refreshScreen() {
	screen.textContent = digits;
}
