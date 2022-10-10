class Calculator {
  constructor(typed, typing) {
    this.typedOperandsText = typed;
    this.typingOperandText = typing;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperands = "";
    this.openedBracket = 0;
    this.computed = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString();
    if (this.currentOperand === "" && this.previousOperands !== "") {
      this.previousOperands = this.previousOperands.slice(0, -1);
    }
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "," && this.currentOperand.includes(",")) return;

    if (this.computed) {
      this.currentOperand = number;
      this.previousOperands = "";
      this.computed = false;
    } else {
      this.currentOperand = this.currentOperand + number;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand[0] === "" && this.previousOperands === "") return;
    if(this.computed){
      this.previousOperands = ""
      this.computed = false
    }
    this.previousOperands += `${this.currentOperand}${operation}`;
    this.currentOperand = "";
  }
  compute() {
    const prev = this.previousOperands.replace(",", ".");
    const current = this.currentOperand.replace(",", ".");
    const computation = prev + current;
    if (prev === "" || current === "") return;
    try {
      this.currentOperand = eval(computation.replace("÷", "/"))
        .toString()
        .replace(".", ",");
    } catch (e) {
      alert(`You have an ${e.name}`);
    }
    this.previousOperands = computation;
    this.computed = true;
  }
  // getDisplayNummber(number) {
  //   const stringNumber = number.toString();
  //   const integerDigits = parseFloat(stringNumber.split(",")[0]);
  //   const decimalDigits = stringNumber.split(",")[1];
  //   let integerDisplay;
  //   if (isNaN(integerDigits)) {
  //     integerDisplay = "";
  //   } else {
  //     integerDisplay = integerDigits.toLocaleString("de", {
  //       maximumFractionDigits: 0,
  //     });
  //   }
  //   if (decimalDigits !== undefined) {
  //     return `${integerDisplay},${decimalDigits}`;
  //   } else {
  //     return integerDisplay;
  //   }
  // }
  updateDisplay() {
    this.typingOperandText.innerText = this.currentOperand;
    this.typedOperandsText.innerText = this.previousOperands;
  }
  addBracket() {
    if (
      this.currentOperand === "" ||
      this.currentOperand.charAt(this.currentOperand.length - 1) === "+"
    ) {
      this.openedBracket++;
      this.currentOperand = this.currentOperand + "(";
    } else {
      if (this.openedBracket > 0) {
        this.openedBracket--;
        this.currentOperand = this.currentOperand + ")";
      }
    }
  }
}

const numbersButtons = document.querySelectorAll(".number");
const operatorsButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const deleteButton = document.querySelector("#delete");
const clearButton = document.querySelector("#clear");
const bracketButton = document.querySelector("#bracket");
const typedOperandsText = document.querySelector("#typed");
const typingOperandText = document.querySelector("#typing");

const calculator = new Calculator(typedOperandsText, typingOperandText);

numbersButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

bracketButton.addEventListener("click", () => {
  calculator.addBracket();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
