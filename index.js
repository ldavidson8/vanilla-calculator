class Calculator {
  constructor(previousOperatorTextElement, currentOperatorTextElement) {
    this.previousOperatorTextElement = previousOperatorTextElement;
    this.currentOperatorTextElement = currentOperatorTextElement;
    this.clear();
  }

  clear() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) return;
    this.currentOperation =
      this.currentOperation.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperation === "") return;
    if (this.previousOperation !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "*":
        computation = previous * current;
        break;
      case "÷":
        computation = previous / current;
        break;
      default:
        return;
    }
    this.currentOperation = computation;
    this.operation = undefined;
    this.previousOperation = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperatorTextElement.innerText = this.getDisplayNumber(
      this.currentOperation
    );
    if (this.operation != null) {
      this.previousOperatorTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperation
      )} ${this.operation}`;
    } else {
      this.previousOperatorTextElement.innerText = "";
    }
  }
}

const numberBtns = document.querySelectorAll("[data-number");
const operationBtns = document.querySelectorAll("[data-operation");
const equalsBtn = document.querySelector("[data-equals");
const deleteBtn = document.querySelector("[data-delete");
const allClearBtn = document.querySelector("[data-all-clear");
const previousOperatorTextElement = document.querySelector(
  "[data-previous-operator]"
);
const currentOperatorTextElement = document.querySelector(
  "[data-current-operator]"
);

const calculator = new Calculator(
  previousOperatorTextElement,
  currentOperatorTextElement
);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClearBtn.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsBtn.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
