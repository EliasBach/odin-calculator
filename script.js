// Global Variables and initialisation
const display = document.querySelector("#display")
let numA = null // current number
let numB = null // stored number
let current_operation = false
let next_number_input_flag = false

// Button Functionality
// OPERANDS (ie numbers)
const operand_btns = document.querySelectorAll(".operand")
operand_btns.forEach(button => button.addEventListener("click", 
    () => operand_press(button)))

function operand_press(button) {
    if (next_number_input_flag) {
        // if previous button press was operator (+-*/=):
        // reset display and store number
        numA = display.textContent
        display.textContent = ""
        next_number_input_flag = false
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
    numB = parseFloat(display.textContent)
    //boolean is used to to clear the display when the next number is pressed
    next_number_input_flag = true
}

// EQUALS (ie calculate)
const equals_btn = document.querySelector("#equals")
equals_btn.addEventListener("click", () => calculate(current_operation, numA, numB))

function calculate(operation, numA, numB) {
    // if no operation is stored: do nothing
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
        numB = numA
        numA = null
    }
}

// MODIFIERS
const percentage_btn = document.querySelector("#percentage")
percentage_btn.addEventListener("click", () => percentage())
function percentage() {
    display.textContent = parseFloat(display.textContent) / 100
}
const changesign_btn = document.querySelector("#change-sign")
changesign_btn.addEventListener("click", () => changesign())
function changesign() {
    display.textContent = parseFloat(display.textContent) * -1
}

const decimal_btn = document.querySelector("#decimal") 
decimal_btn.addEventListener("click", () => decimal())
function decimal () {
    // checks if number is an interger, if yes, the decimal is added to display
    if (parseFloat(display.textContent)%1 == 0) {
        operand_press(decimal_btn)
     }
}

// ALL CLEAR (ie reset everything)
const allclear_btn = document.querySelector("#all-clear")
allclear_btn.addEventListener("click", () => allclear())

function allclear() {
    display.textContent = ""
    numA = null
    numB = null
    current_operation = false
    next_number_input_flag = false
}

// TO DO floating point number sometimes causes inaccuarys with many decimals
// pressing equals =, then operator then equals again, makes it that numB is operatred on itself,
// even though I want to use numA to redo the previous operation