// Global Variables and initialisation
const display = document.querySelector("#display")
let numCurrent = null
let numStored = null
let operationCurrent = null
let last_press = null

// Button Functionality
// OPERANDS (ie numbers)
const operand_btns = document.querySelectorAll(".operand")
operand_btns.forEach(button => button.addEventListener("click", 
    () => operand_press(button)))

function operand_press(button) {
    if (last_press == "operator"|| last_press == "equals") {
        // if previous button press was an operator (+-*/=):
        // reset display, so that new number can be entered
        display.textContent = ""
    }
    display.textContent += button.value
    numCurrent = parseFloat(display.textContent)
    last_press = "operand"
}

// OPERATORS (ie plus, minus, times, divide)
const operator_btns = document.querySelectorAll(".operator")
operator_btns.forEach(button => button.addEventListener("click", 
    () => operator_press(button)))

function operator_press(button) {
    // when chaining operations, e.g. 1 + 2 -3
    // the first two numbers are operated on first
    // this can't be done at the beginning when no number is stored
    if (numStored != null) {
        calculate(operationCurrent, numStored, numCurrent)
    }
    if (last_press == "operand" || last_press == "equals") {
         numStored = numCurrent
    }
    operationCurrent = button.value
    last_press = "operator"
}

// EQUALS (ie calculate)
const equals_btn = document.querySelector("#equals")
equals_btn.addEventListener("click", () => calculate(operationCurrent, numStored, numCurrent))

function calculate(operation, numA, numB) {
    if (last_press == "operand") {
        if (operation == "+") {
            numCurrent = numA + numB
        } else if (operation == "-") {
            numCurrent = numA - numB
        } else if (operation == "*") {
            numCurrent = numA * numB
        } else if (operation == "/") {
            numCurrent = numA / numB
        }
        display.textContent = Math.round(numCurrent*1000000)/1000000
        operationCurrent = null // prevents previous operation being applied 
        // if equals is pressed again after entering a number
        last_press = "equals"
    }
}
    
// MODIFIERS
const percentage_btn = document.querySelector("#percentage")
percentage_btn.addEventListener("click", () => percentage())
function percentage() {
    numCurrent /= 100
    display.textContent = numCurrent.toString()
}
const changesign_btn = document.querySelector("#change-sign")
changesign_btn.addEventListener("click", () => changesign())
function changesign() {
    numCurrent *= -1
    display.textContent = numCurrent.toString()
}

// DECIMAL
const decimal_btn = document.querySelector("#decimal") 
decimal_btn.addEventListener("click", () => decimal())
function decimal () {
    if (!display.textContent.includes(".")) {
        operand_press(decimal_btn)
    }
}

//DELETE 
const del_btn = document.querySelector("#delete") 
del_btn.addEventListener("click", () => del())
function del () {
    display.textContent = numCurrent.toString().slice(0,-1)
    numCurrent = parseFloat(display.textContent)
}

// ALL CLEAR (ie reset everything)
const allclear_btn = document.querySelector("#all-clear")
allclear_btn.addEventListener("click", () => allclear())
function allclear() {
    display.textContent = ""
    numCurrent = null
    numStored = null
    operationCurrent = null
    last_press = null
}