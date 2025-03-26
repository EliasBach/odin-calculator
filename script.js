// Global Variables
const display = document.querySelector("#display")
let decimal_used = false
let numA = null
let numB = null
let current_operation = null

// Button Functionality
// OPERANDS (ie numbers)
const operand_btns = document.querySelectorAll(".operand")
operand_btns.forEach(button => button.addEventListener("click", 
    () => operand_press(button)))

function operand_press(button) {
    display.textContent += button.value
}

// OPERATORS (ie plus, minus, times, divide)
const operator_btns = document.querySelectorAll(".operator")
operator_btns.forEach(button => button.addEventListener("click", 
    () => operator_press(button)))

// need to complete operator functionality.
// when operator is pressed, number in display needs to be stored
// then the next number can be entered in the display
function operator_press(button) {
    current_operation = button.value
}

// EQUALS (ie calculate)
const equals_btn = document.querySelector("#equals")
equals_btn.addEventListener("click", () => operate(current_operation, numA, numB))

function operate(operation, operandA, operandB) {
    if (operation == "+") {
        return operandA + operandB
    }
    if (operation == "-") {
        return operandA - operandB
    }
    if (operation == "*") {
        return operandA * operandB
    }
    if (operation == "/") {
        return operandA / operandB
    }
}

// ALL CLEAR (ie reset everything)
const allclear_btn = document.querySelector("#all-clear")
allclear_btn.addEventListener("click", () => allclear())

function allclear() {
    display.textContent = ""
    //reset any other variables
    decimal_used = false
    numA = null
    numB = null
    current_operation = null
}