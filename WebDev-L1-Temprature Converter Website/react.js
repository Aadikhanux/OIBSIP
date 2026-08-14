const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertBtn = document.getElementById("convertBtn");
const error = document.getElementById("error");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");


convertBtn.addEventListener("click", convertTemperature);


function convertTemperature() {

    const value = temperatureInput.value.trim();
    const unit = unitSelect.value;

    error.textContent = "";

    if (value === "") {
        showError("Please enter a temperature.");
        return;
    }

    const temperature = Number(value);

    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid number.");
        return;
    }

    let celsius;

    if (unit === "celsius") {
        celsius = temperature;
    } else if (unit === "fahrenheit") {
        celsius = (temperature - 32) * 5 / 9;
    } else {
        celsius = temperature - 273.15;
    }

    if (celsius < -273.15) {
        showError("Temperature cannot be below absolute zero.");
        clearResults();
        return;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    celsiusResult.textContent = `${formatValue(celsius)} °C`;
    fahrenheitResult.textContent = `${formatValue(fahrenheit)} °F`;
    kelvinResult.textContent = `${formatValue(kelvin)} K`;
}


function formatValue(value) {
    return value.toFixed(2);
}


function showError(message) {
    error.textContent = message;
}


function clearResults() {
    celsiusResult.textContent = "-- °C";
    fahrenheitResult.textContent = "-- °F";
    kelvinResult.textContent = "-- K";
}