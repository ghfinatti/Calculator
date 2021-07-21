let calcData = {displayNumber:"",
operator:""}
const calcDisplay = document.querySelector('#dispBot');
const numberPad = document.querySelectorAll('.numberButton');
const clearButton = document.querySelector('#clear');
const delButton = document.querySelector('#delete');

function add(a,b){
    return a + b
}

function subtract(a,b){
    return a - b
}

function multiply(a,b){
    return a * b
}

function divide(a,b){
    return a / b
}

function operate(operator, a, b){
    if (operator == "+") {return add(a,b)}
    if (operator == "-") {return subtract(a,b)}
    if (operator == "*") {return multiply(a,b)}
    if (operator == "/") {return divide(a,b)}
}

numberPad.forEach((number) => {
    number.addEventListener('click', () => {
        calcData.displayNumber = calcData.displayNumber + String(number.textContent);
        calcDisplay.textContent = calcData.displayNumber;
    })
})

clearButton.addEventListener('click', () => {
    calcData.displayNumber = ""
    calcDisplay.textContent = calcData.displayNumber
})

delButton.addEventListener('click', () => {
    let displayString = calcData.displayNumber.split("");
    displayString.splice(displayString.length - 1, 1);
    displayString = displayString.join("");
    calcData.displayNumber = displayString;
    calcDisplay.textContent = displayString;
})