class Calculator {
    constructor(previousOperandDOM, currentOperandDOM) {
        this.previousOperandDOM = previousOperandDOM;
        this.currentOperandDOM = currentOperandDOM;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number == '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand += number.toString();
    }

    updateDisplay() {
        this.currentOperandDOM.innerText = this.currentOperand;
        this.previousOperandDOM.innerText = this.previousOperand;
    }

    chooseOperation(operation) {
        if (this.currentOperand == '') {
            return;
        }
        if (this.previousOperand != '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.previousOperand += this.operation.toString();
        this.currentOperand = '';
    }

    compute() {
        let computation;
        let previous = parseFloat(this.previousOperand);
        let current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case 'x':
                computation = previous * current;
                break;
            case '÷':
                computation = previous / current;
                break;
            default:
                return;
        }
        console.log(computation);
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
}


const numberButtons = Array.from(document.getElementsByClassName("numberButton"));
const previousOperandDOM = document.getElementById('previousOperand');
const currentOperandDOM = document.getElementById('currentOperand');
const operationButtons = Array.from(document.getElementsByClassName("operationButton"));
const equalsButton = document.getElementById("equalsButton");
const acButton = document.getElementById("ACButton");
const delButton = document.getElementById("DELButton");

const calculator = new Calculator(previousOperandDOM, currentOperandDOM);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText);
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.innerText);
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

acButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

delButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})