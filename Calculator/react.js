const screen = document.getElementById("screen");
const history = document.getElementById("history");
const buttons = document.querySelectorAll("button");

let currentValue = "";
let previousValue = "";
let operator = "";
let resultShown = false;
let errorState = false;


buttons.forEach(button => {
    button.addEventListener("click", () => {

        if (button.dataset.number !== undefined) {
            addNumber(button.dataset.number);
            return;
        }

        if (button.dataset.operator !== undefined) {
            chooseOperator(button.dataset.operator);
            return;
        }

        const action = button.dataset.action;

        if (action === "clear") {
            clearCalculator();
        }

        if (action === "delete") {
            deleteNumber();
        }

        if (action === "equals") {
            calculate();
        }
    });
});


function addNumber(number) {

    if (errorState) {
        clearCalculator();
    }

    if (resultShown) {
        currentValue = "";
        history.textContent = "";
        resultShown = false;
    }

    if (number === "." && currentValue.includes(".")) {
        return;
    }

    if (number === "." && currentValue === "") {
        currentValue = "0";
    }

    currentValue += number;

    updateScreen();
}


function chooseOperator(selectedOperator) {

    if (errorState) {
        return;
    }

    if (currentValue === "" && previousValue === "") {
        return;
    }

    if (currentValue !== "" && previousValue !== "") {
        calculate();
    }

    if (currentValue !== "") {
        previousValue = currentValue;
        currentValue = "";
    }

    operator = selectedOperator;
    history.textContent = `${formatNumber(previousValue)} ${getOperatorSymbol(operator)}`;
    resultShown = false;
}


function calculate() {

    if (previousValue === "" || currentValue === "" || operator === "") {
        return;
    }

    const firstNumber = parseFloat(previousValue);
    const secondNumber = parseFloat(currentValue);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                showError("Cannot divide by zero");
                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    result = roundResult(result);

    history.textContent =
        `${formatNumber(firstNumber)} ${getOperatorSymbol(operator)} ${formatNumber(secondNumber)} =`;

    currentValue = String(result);
    previousValue = "";
    operator = "";
    resultShown = true;

    updateScreen();
}


function deleteNumber() {

    if (errorState) {
        clearCalculator();
        return;
    }

    if (resultShown) {
        return;
    }

    currentValue = currentValue.slice(0, -1);

    updateScreen();
}


function clearCalculator() {

    currentValue = "";
    previousValue = "";
    operator = "";
    resultShown = false;
    errorState = false;

    history.textContent = "";
    screen.textContent = "0";
}


function showError(message) {

    screen.textContent = message;
    history.textContent = "";

    currentValue = "";
    previousValue = "";
    operator = "";

    errorState = true;
}


function updateScreen() {

    if (currentValue === "") {
        screen.textContent = "0";
    } else {
        screen.textContent = currentValue;
    }
}


function getOperatorSymbol(operator) {

    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    };

    return symbols[operator];
}


function formatNumber(number) {

    return Number(number).toLocaleString("en-US", {
        maximumFractionDigits: 10
    });
}


function roundResult(number) {

    return Number(number.toFixed(10));
}