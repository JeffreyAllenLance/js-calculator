const display = document.querySelector('#display');
let currentDisplay = display.textContent;
let firstNum = null, 
      secondNum = null, 
      result = null, 
      operator = null;
let displayRefresh = true;

function add (num1, num2) {
	return num1 + num2;
}

function subtract (num1, num2) {
  return num1 - num2;
}
  
function multiply (num1, num2) {
  return num1 * num2;
}

function divide (num1, num2) {
  return num2 == 0 ? 'err' : num1 / num2;
}

function percent() {
  // Divide by 100
  let num = Number(currentDisplay);
  num /= 100;
  num = num.toFixed(8) / 1;
  display.textContent = num;
  currentDisplay = num;
  decimalBtn.disabled = true;
}

function posNeg() {
  // Change sign
  let num = Number(currentDisplay);
  num *= -1;
  display.textContent = `${num}`;
  currentDisplay = `${num}`;
}

function operate (operator, num1, num2) {
  if (operator == "+") {
    return add(num1, num2);
  } else if (operator == "-") {
    return subtract(num1, num2);
  } else if (operator == "*") {
    return multiply(num1, num2);
  } else if (operator == "/") {
    return divide(num1, num2);
  }
}

function displayNumClick() {
  displayNumPress(this.textContent);
}

function displayNumPress(num) {
  // If display refreshed or displaying 0, replace content
  // otherwise concatenate
  if ((displayRefresh || display.textContent == '0') && num != '.') {
    display.textContent = num;
  } else if (currentDisplay.length < 11) {
    display.textContent = `${currentDisplay}${num}`;
  }
  currentDisplay = display.textContent;
  displayRefresh = false;
}

function backspace() {
  if (currentDisplay.length != 1) {
    if (currentDisplay.substr(currentDisplay.length - 1) == '.') {
      decimalBtn.disabled = false;
    }
    display.textContent = currentDisplay.slice(0, -1);
    currentDisplay = display.textContent;
  } else {
    display.textContent = 0;
    currentDisplay = display.textContent;
    displayRefresh = true;
  }
}

function clear() {
  // Clear all
  display.textContent = 0;
  currentDisplay = display.textContent;
  displayRefresh = true;
  decimalBtn.disabled = false;
  firstNum = null;
  secondNum = null;
  operator = null;
}

function decimalPress() {
  displayNumPress('.');
  decimalBtn.disabled = true;
}

function opSelect() {
  // Store numbers if none exist
  // Evaluate after second number
  if (!firstNum || !operator) {
    firstNum = Number(currentDisplay);
  } else if (!secondNum) {
    secondNum = Number(currentDisplay);
    evaluate();
  }
  operator = this.textContent;
  decimalBtn.disabled = false;
  displayRefresh = true;
}

function evaluate() {
  // Run operate function and update result
  if (operator){
    if (!secondNum) {
      secondNum = Number(display.textContent);
    }
    result = operate(operator, firstNum, secondNum);
    firstNum = result;
    result = result.toString();
    // Display only 10 digits of number
    if (result.length > 10) {
      result = result.slice(0, 11);
    }
    if (result.substr(result.length - 1) == '.') {
      result = result.slice(0,10);
    }
    display.textContent = result;
    currentDisplay = result;
    // Clean slate
    secondNum = null;
    operator = null;
    if (result.includes('.')) {
      decimalBtn.disabled = true;
    } else {
      decimalBtn.disabled = false;
    }
  }
}

function keyPress(e) {
  let key = `${e.code}`;
  if (key.startsWith('Digit')) {
    let num = key.slice(5);
    displayNumPress(num);
  } else if (key == 'Backspace') {
    backspace();
  } else if (key == 'Equal') {
    evaluate();
  } else if (key == 'Period' && !decimalBtn.disabled) {
    decimalPress();
  }
}

// Get array of digit buttons
const digits = document.querySelectorAll(".digits");
for (const digit of digits) {
  digit.addEventListener('click', displayNumClick);
}

// Get array of operator buttons
const operators = document.querySelectorAll(".operators");
for (const op of operators) {
  op.addEventListener('click', opSelect);
}

const equalBtn = document.querySelector('#equals');
equalBtn.addEventListener('click', evaluate);

const allClearBtn = document.querySelector('#AC');
allClearBtn.addEventListener('click', clear);

const clearBtn = document.querySelector('#backspace');
clearBtn.addEventListener('click', backspace);

const decimalBtn = document.querySelector('#decimal');
decimalBtn.addEventListener('click', decimalPress);

const percentBtn = document.querySelector('#percent');
percentBtn.addEventListener('click', percent);

const posNegBtn = document.querySelector('#pos-neg');
posNegBtn.addEventListener('click', posNeg);

document.addEventListener('keydown', keyPress);
