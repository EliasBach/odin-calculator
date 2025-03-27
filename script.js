// Global Variables and initialisation
allclear()
const display = document.querySelector("#display")

// ALL CLEAR (ie reset everything and initialised variables)
const allclear_btn = document.querySelector("#all-clear")
allclear_btn.addEventListener("click", () => allclear())

function allclear() {
    display.textContent = ""
    //reset any other variables
    let decimal_used = false //TODO decimals
    let numA = null
    let numB = null
    let current_operation = false
    let next_number_input_flag = false
}

// Button Functionality
// OPERANDS (ie numbers)
const operand_btns = document.querySelectorAll(".operand")
operand_btns.forEach(button => button.addEventListener("click", 
    () => operand_press(button)))

function operand_press(button) {
    if (next_number_input_flag) {
        // if previous button press was operator (+-*/):
        // reset display and store current number A in B
        // so that numA can be stored when equals is pressed
        display.textContent = ""
        next_number_input_flag = false
        numB = numA
        numA = null
    }
    display.textContent += button.value
}

// OPERATORS (ie plus, minus, times, divide)
const operator_btns = document.querySelectorAll(".operator")
operator_btns.forEach(button => button.addEventListener("click", 
    () => operator_press(button)))

function operator_press(button) {
    // store the operation (+-*/) that needs to be performed
    // as well the first number
    current_operation = button.value
    numA = parseFloat(display.textContent)
    //boolean is used to to clear the display when the next number is pressed
    next_number_input_flag = true
}

// EQUALS (ie calculate)
const equals_btn = document.querySelector("#equals")
equals_btn.addEventListener("click", () => operate(current_operation, numA, numB))

function operate(operation, numA, numB) {
    // if no second number is stored: do nothing
    if (current_operation) {
        numA = parseFloat(display.textContent)
        display.textContent = ""
        let AB = 0
        if (operation == "+") {
            AB = (numB + numA)
        }
        if (operation == "-") {
            AB = (numB - numA)
        }
        if (operation == "*") {
            AB = (numB * numA)
        }
        if (operation == "/") {
            AB = (numB / numA)
        }
        display.textContent = AB.toString()
        current_operation = null
        next_number_input_flag = true
    }
}

// MODIFIERS
// TO DO add modifiers, simply operate on the current number on the display

// TO DO add code to allow use of floating point numbers