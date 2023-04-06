const numberButtons = document.querySelectorAll("[data-Number]");
const operatorsButtons = document.querySelectorAll("[data-Operator]");
const allClearButtons = document.querySelector("[data-all-clear]");
const DelButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");

const previousTextElement = document.querySelector("[data-previous]");
const currentTextElement = document.querySelector("[data-current]");

class Calculator {
  constructor(currentTextElement, previousTextElement) {
    this.previousTextElement = previousTextElement;
    this.currentTextElement = currentTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
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

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previous = parseFloat(this.previous);
    const _current = parseFloat(this.current);

    if (isNaN(_previous) || isNaN(_current)) return;

    switch (this.operation) {
      case "+":
        result = _previous + _current;
        break;
      case "-":
        result = _previous - _current;
        break;
      case "÷":
        result = _previous / _current;
        break;
      case "*":
        result = _previous * _current;
        break;
      default:
        return;
    }

    this.current = result;
    this.operation = undefined;
    this.previous = "";
  }

  chooseOperation(operation) {
    if (this.current === "") return;

    if (this.previous != "") {
      this.calculate();
    }

    this.operation = operation;

    this.previous = this.current;
    this.current = "";
  }

  appendNumber(number) {
    if (this.current.includes(".") && number === ".") return;

    this.current = `${this.current}${number.toString()}`;
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }
  updateDisplay() {
    this.previousTextElement.innerText = `${this.formatDisplayNumber(
      this.previous
    )} ${this.operation || ""}`;
    this.currentTextElement.innerText = this.formatDisplayNumber(this.current);
  }
}

const calculator = new Calculator(previousTextElement, currentTextElement);

for (const numberbutton of numberButtons) {
  numberbutton.addEventListener("click", () => {
    calculator.appendNumber(numberbutton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationbutton of operatorsButtons) {
  operationbutton.addEventListener("click", () => {
    calculator.chooseOperation(operationbutton.innerText);
    calculator.updateDisplay();
  });
}

allClearButtons.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

DelButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
