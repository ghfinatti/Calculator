let calcData = {displayNumber:"",
operator:"",
operandOne:"",
operandTwo:"",
}
const calcDisplay = document.querySelector('#dispBot');
const calcOperatorDisplay = document.querySelector('.displaytop');
const numberPad = document.querySelectorAll('.numberButton');
const clearButton = document.querySelector('#clear');
const delButton = document.querySelector('#delete');
const dotButton = document.querySelector('#dot');
const operatorButtons = document.querySelectorAll('.operators');
const equalButton = document.querySelector('#equals');

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
    if (operator == "x") {return multiply(a,b)}
    if (operator == "/") {return divide(a,b)}
}

function resetCalculator(){
    calcData.displayNumber = "";
    calcData.operator = "";
    calcData.operandOne = "";
    calcData.operandTwo = "";
    calcDisplay.textContent = calcData.displayNumber;
    calcOperatorDisplay.textContent = calcData.operator;
}

function calcResult(){
    result = operate(calcData.operator, parseFloat(calcData.operandOne), parseFloat(calcData.displayNumber));
    result = Math.round((result + Number.EPSILON) * 10000) / 10000
    console.log(result)
    if (result.length > 11){
        result = result.toExponential(2)
    }
    resetCalculator();
    calcData.displayNumber = result.toString();
    calcDisplay.textContent = result.toString();
}

numberPad.forEach((number) => {
    number.addEventListener('click', () => {
        if (calcData.displayNumber.length < 11){
            calcData.displayNumber = calcData.displayNumber + String(number.textContent);
            calcDisplay.textContent = calcData.displayNumber;
        };
    });
});

clearButton.addEventListener('click', resetCalculator);

delButton.addEventListener('click', () => {
    let displayString = calcData.displayNumber.split("");
    displayString.splice(displayString.length - 1, 1);
    displayString = displayString.join("");
    calcData.displayNumber = displayString;
    calcDisplay.textContent = displayString;
})

dotButton.addEventListener('click', () => {
    if (calcData.displayNumber != "" && calcData.displayNumber.includes(".") == false){
        calcData.displayNumber = calcData.displayNumber + ".";
        calcDisplay.textContent = calcData.displayNumber 
    };
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (calcData.operandOne != ""){
            calcData.operandTwo = calcData.displayNumber
        }else{
            calcData.operandOne = calcData.displayNumber
        }
        if (calcData.operator == ""){
            calcData.operator = button.textContent;
            calcOperatorDisplay.textContent = calcData.displayNumber + ' ' + calcData.operator;
            calcData.displayNumber = "";
        }
        if (calcData.operator == "/" && parseInt(calcData.operandTwo) == 0){
            resetCalculator();
            calcDisplay.textContent = "Error";
        }
        if (calcData.operator != "" && calcData.operandTwo != ""){
            calcResult();
        }
    })
})

equalButton.addEventListener('click', () => {
    if (calcData.operator == "/" && parseInt(calcData.displayNumber) == 0){
        resetCalculator();
        calcDisplay.textContent = "Error";
    }
    if (calcData.operandOne != "" && calcData.operator != ""){
        calcResult();
    }
})