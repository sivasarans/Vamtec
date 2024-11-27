window.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const countrySelect = document.getElementById("country");
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");

    // Default options for Country, State, and City dropdowns
    const defaultCountry = "Select Country";
    const defaultState = "Select State";
    const defaultCity = "Select City";

    // Check for saved values in localStorage, otherwise use defaults
    const savedCountry = sessionStorage.getItem("country") || defaultCountry;
    const savedState = sessionStorage.getItem("state") || defaultState;
    const savedCity = sessionStorage.getItem("city") || defaultCity;

    // Set the selected values if available or default
    countrySelect.value = savedCountry;
    stateSelect.value = savedState;
    citySelect.value = savedCity;

    // Form submission handler to save selections to localStorage
    document.getElementById("locationForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the selected values from dropdowns
        const country = countrySelect.value;
        const state = stateSelect.value;
        const city = citySelect.value;

        // Save selections in localStorage
        sessionStorage.setItem("country", country);
        sessionStorage.setItem("state", state);
        sessionStorage.setItem("city", city);

        // Redirect to display.html
        window.location.href = "regist.html";
    });
});
