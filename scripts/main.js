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
  display.textContent = `${num}`;
  currentDisplay = `${num}`;
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

function displayNum() {
  // If displayRefersh is set start new number
  // otherwise, concatenate up to 9 digits
  if (displayRefresh) {
    display.textContent = this.textContent;
    displayRefresh = false;
  } else if (currentDisplay.length < 10) {
    display.textContent = `${currentDisplay}${this.textContent}`;
  }
  currentDisplay = display.textContent;
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
  decimalBtn.disabled = true;
}

function opSelect() {
  operator = this.textContent;
  decimalBtn.disabled = false;
  // Store numbers if none exist
  // Evaluate after second number
  if (!firstNum) {
    firstNum = Number(currentDisplay);
  } else if (!secondNum) {
    secondNum = Number(currentDisplay);
    evaluate();
  }
  displayRefresh = true;
}

function evaluate() {
  // Run operate function and update result
  if (operator){
    if (!secondNum) {
      secondNum = Number(display.textContent);
    }
    result = operate(operator, firstNum, secondNum);
    // Display precision according to large or small number
    if (`${result}`.length > 10) {
      if (result >= 1e10) {
        result.toPrecision(2)
      } else {
        result = Math.round((result + Number.EPSILON) * 1e8) / 1e8;
      }
    }
    display.textContent = result;
    currentDisplay = result;
    // Clean slate
    firstNum = null;
    secondNum = null;
    operator = null;
    decimalBtn.disabled = false;
  }
}

// Get array of digit buttons
const digits = document.querySelectorAll(".digits");
for (const digit of digits) {
  digit.addEventListener('click', displayNum);
}

// Get array of operator buttons
const operators = document.querySelectorAll(".operators");
for (const op of operators) {
  op.addEventListener('click', opSelect);
}

const equalBtn = document.querySelector('#equals');
equalBtn.addEventListener('click', evaluate);

const clearBtn = document.querySelector('#AC');
clearBtn.addEventListener('click', clear);

const decimalBtn = document.querySelector('#decimal');
decimalBtn.addEventListener('click', decimalPress);
decimalBtn.addEventListener('click', displayNum);

const percentBtn = document.querySelector('#percent');
percentBtn.addEventListener('click', percent);

const posNegBtn = document.querySelector('#pos-neg');
posNegBtn.addEventListener('click', posNeg);