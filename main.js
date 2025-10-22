// HTML element for the calculator display
var display = document.getElementById("display");
// Current input value (as string for easier manipulation)
var currentInput = "0";
// Previous value and operator for calculations
var previousValue = "";
var currentOperator = null;
// Function: Handle digit input (0–9)
function inputDigit(digit) {
    if (currentInput === "0") {
        currentInput = digit;
    }
    else {
        currentInput += digit;
    }
    updateDisplay();
}
// Function: Handle decimal point
function inputDot() {
    if (typeof currentInput === "string" && !currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}
// Function: Handle operator (+, -, *, /)
function inputOperator(operator) {
    // If an operator already exists, calculate first
    if (currentOperator !== null) {
        calculateResult();
    }
    previousValue = currentInput;
    currentInput = "0";
    currentOperator = operator;
}
// Function: Clear everything
function clearDisplay() {
    currentInput = "0";
    previousValue = "";
    currentOperator = null;
    updateDisplay();
}
// Function: Perform calculation
function calculateResult() {
    if (!currentOperator || previousValue === "")
        return;
    var prev = parseFloat(previousValue);
    var current = parseFloat(currentInput);
    var result;
    switch (currentOperator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = current !== 0 ? prev / current : NaN;
            break;
        default:
            return;
    }
    // Show result
    currentInput = isNaN(result) ? "Error" : result.toString();
    currentOperator = null;
    previousValue = "";
    updateDisplay();
}
// Function: Update display
function updateDisplay() {
    display.textContent = currentInput;
}
// Expose functions to HTML (browser global scope)
window.inputDigit = inputDigit;
window.inputOperator = inputOperator;
window.inputDot = inputDot;
window.clearDisplay = clearDisplay;
window.calculateResult = calculateResult;
