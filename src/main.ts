// HTML element for the calculator display
const display = document.getElementById("display") as HTMLDivElement;

// Current input value (as string for easier manipulation)
let currentInput: string = "0";

// Previous value and operator for calculations
let previousValue: string = "";
let currentOperator: string | null = null;

// Function: Handle digit input (0–9)
function inputDigit(digit: string): void {
  if (currentInput === "0") {
    currentInput = digit;
  } else {
    currentInput += digit;
  }
  updateDisplay();
}

// Function: Handle decimal point
function inputDot(): void {
  if (typeof currentInput === "string" && !currentInput.includes(".")) {
    currentInput += ".";
    updateDisplay();
  }
}

// Function: Handle operator (+, -, *, /)
function inputOperator(operator: string): void {
  // If an operator already exists, calculate first
  if (currentOperator !== null) {
    calculateResult();
  }
  previousValue = currentInput;
  currentInput = "0";
  currentOperator = operator;
}

// Function: Clear everything
function clearDisplay(): void {
  currentInput = "0";
  previousValue = "";
  currentOperator = null;
  updateDisplay();
}

// Function: Perform calculation
function calculateResult(): void {
  if (!currentOperator || previousValue === "") return;

  const prev = parseFloat(previousValue);
  const current = parseFloat(currentInput);
  let result: number;

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
function updateDisplay(): void {
  display.textContent = currentInput;
}

// Expose functions to HTML (browser global scope)
(window as any).inputDigit = inputDigit;
(window as any).inputOperator = inputOperator;
(window as any).inputDot = inputDot;
(window as any).clearDisplay = clearDisplay;
(window as any).calculateResult = calculateResult;
