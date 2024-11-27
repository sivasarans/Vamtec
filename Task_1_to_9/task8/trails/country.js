document.addEventListener("DOMContentLoaded", () => {
    const countrySelect = document.getElementById("country");
    const stateSelect = document.getElementById("state");
    const citySelect = document.getElementById("city");

    const data = {
        "India": {
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
            "Karnataka": ["Bangalore", "Mysore"]
        },
        "USA": {
            "California": ["Los Angeles", "San Francisco"],
            "New York": ["New York City", "Buffalo"]
        }
    };

    // Populate country dropdown
    Object.keys(data).forEach(country => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    // Load saved values from localStorage
    const savedCountry = localStorage.getItem("selectedCountry");
    const savedState = localStorage.getItem("selectedState");
    const savedCity = localStorage.getItem("selectedCity");

    if (savedCountry) {
        countrySelect.value = savedCountry;
        // Populate states based on saved country
        populateStates(savedCountry);
    }
    if (savedState) {
        stateSelect.value = savedState;
        // Populate cities based on saved state
        populateCities(savedCountry, savedState);
    }
    if (savedCity) {
        citySelect.value = savedCity;
    }

    // Function to populate states
    function populateStates(country) {
        stateSelect.innerHTML = "<option>Select State</option>";
        const states = data[country];
        Object.keys(states).forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    // Function to populate cities
    function populateCities(country, state) {
        citySelect.innerHTML = "<option>Select City</option>";
        const cities = data[country][state];
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    // Event listeners to populate state and city based on selected values
    countrySelect.addEventListener("change", () => {
        populateStates(countrySelect.value);
        citySelect.innerHTML = "<option>Select City</option>"; // Reset city
    });

    stateSelect.addEventListener("change", () => {
        populateCities(countrySelect.value, stateSelect.value);
    });

    // Redirect with selected values as query parameters
    document.getElementById("locationForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const country = countrySelect.value;
        const state = stateSelect.value;
        const city = citySelect.value;

        // Save the selected values to localStorage
        localStorage.setItem("selectedCountry", country);
        localStorage.setItem("selectedState", state);
        localStorage.setItem("selectedCity", city);

        // Redirect to registration.html with query parameters
        window.location.href = `regist.html?country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`;
    });
});
