window.addEventListener("DOMContentLoaded", function() {
    // Get saved values from sessionStorage
    const country = sessionStorage.getItem("country");
    const state = sessionStorage.getItem("state");
    const city = sessionStorage.getItem("city");

    // Display values in table if they exist
    if (country && state && city) {
        document.getElementById("countryCell").textContent = country;
        document.getElementById("stateCell").textContent = state;
        document.getElementById("cityCell").textContent = city;
        document.getElementById("locationTable").classList.remove("hidden");

        // Set button text to "Edit"
        document.getElementById("actionButton").textContent = "Edit";
    } else {
        // Set button text to "Create" and hide table if no values exist
        document.getElementById("locationTable").classList.add("hidden");
        document.getElementById("actionButton").textContent = "Create";
    }

    // Add event listener for the action button to redirect to country.html
    document.getElementById("actionButton").addEventListener("click", function() {
        window.location.href = "country.html";
    });

    // Add event listener for the remove button to clear sessionStorage
    document.getElementById("removeButton").addEventListener("click", function() {
        // Clear sessionStorage
        sessionStorage.removeItem("country");
        sessionStorage.removeItem("state");
        sessionStorage.removeItem("city");

        // Reload the page
        window.location.reload();
    });
});

