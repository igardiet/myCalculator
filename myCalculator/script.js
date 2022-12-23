class Calculator {
    constructor(screenHistoryTextElement, screenNumbersTextElement) {
        this.screenHistoryTextElement = screenHistoryTextElement
        this.screenNumbersTextElement = screenNumbersTextElement
        this.clear()
    }

clear() {
    this.screenNumbersTextElement = ''
    this.screenHistoryTextElement = ''
    this.operation = undefined
}

deleteSpace() {

}

appendNumber(number) {
    this.screenNumbersTextElement = this.screenNumbersTextElement.toString() + number.toString()
}

chooseOperation(operation) {

}

compute() {

}

updateDisplay() {
    this.screenNumbersTextElement.innerText = this.screenNumbersTextElement
}

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const screenHistoryTextElement = document.querySelector('[data-screen-history]');
const screenNumbersTextElement = document.querySelector('[data-screen-numbers]');

const calculator = new Calculator(screenHistoryTextElement, screenNumbersTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})