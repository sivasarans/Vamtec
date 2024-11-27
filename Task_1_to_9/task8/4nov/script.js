class Database {
    constructor() {
        this.db = null;
        this.initDB();
    }

    initDB() {
        const request = indexedDB.open("AppDB", 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("countries", { keyPath: "id", autoIncrement: true });
            db.createObjectStore("states", { keyPath: "id", autoIncrement: true });
            db.createObjectStore("Users_list", { keyPath: "id", autoIncrement: true });
        };

        request.onsuccess = (event) => {
            this.db = event.target.result;
            this.loadCountries();
            this.loadStates();
            this.loadUsers();
        };

        request.onerror = (event) => {
            console.error("Database error: ", event.target.error);
        };
    }

    loadCountries() {
        const transaction = this.db.transaction(["countries"], "readonly");
        const store = transaction.objectStore("countries");
        const request = store.getAll();

        request.onsuccess = (event) => {
            const countries = event.target.result;
            const countrySelect = document.getElementById("countrySelect");
            countrySelect.innerHTML = '<option value="">Choose Country</option>';
            countries.forEach(country => {
                const option = document.createElement("option");
                option.value = country.id;
                option.textContent = country.name;
                countrySelect.appendChild(option);
            });
        };
    }

    loadStates() {
        const transaction = this.db.transaction(["states"], "readonly");
        const store = transaction.objectStore("states");
        const request = store.getAll();

        request.onsuccess = (event) => {
            const states = event.target.result;
            const stateSelect = document.getElementById("stateSelect");
            stateSelect.innerHTML = '<option value="">Choose State</option>';
            states.forEach(state => {
                const option = document.createElement("option");
                option.value = state.id;
                option.textContent = state.name;
                stateSelect.appendChild(option);
            });
        };
    }

    loadUsers() {
        const transaction = this.db.transaction(["Users_list"], "readonly");
        const store = transaction.objectStore("Users_list");
        const request = store.getAll();

        request.onsuccess = (event) => {
            const users = event.target.result;
            const userTableBody = document.getElementById("userTableBody");
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement("tr");
                row.className = "hover:bg-gray-100";
                ["id", "name", "organization", "mobile", "email", "numUsers", "country", "state", "expiryDate"].forEach(field => {
                    row.innerHTML += `<td class="py-2 px-4 border-b">${user[field]}</td>`;
                });
                userTableBody.appendChild(row);
            });
        };
    }

    addCountry(name) {
        const transaction = this.db.transaction(["countries"], "readwrite");
        const store = transaction.objectStore("countries");
        store.add({ name });
    }

    addState(name, countryId) {
        const transaction = this.db.transaction(["states"], "readwrite");
        const store = transaction.objectStore("states");
        store.add({ name, countryId });
    }

    registerUser (userData) {
        const transaction = this.db.transaction(["Users_list"], "readwrite");
        const store = transaction.objectStore("Users_list");
        store.add(userData);
    }
}

// Initialize classes
document.addEventListener("DOMContentLoaded", () => {
    const db = new Database();

    // Add country form submission
    document.getElementById("addCountryForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const countryName = document.getElementById("countryName").value;
        db.addCountry(countryName);
        document.getElementById("countryName").value = ''; // Clear input
    });

    // Add state form submission
    document.getElementById("addStateForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const stateName = document.getElementById("stateName").value;
        const countryId = document.getElementById("countrySelect").value;
        db.addState(stateName, countryId);
        document.getElementById("stateName").value = ''; // Clear input
    });

    // Register user form submission document.getElementById("registerForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const userData = {
            name: document.getElementById("name").value,
            organization: document.getElementById("organization").value,
            mobile: document.getElementById("mobile").value,
            email: document.getElementById("email").value,
            numUsers: document.getElementById("numUsers").value,
            country: document.getElementById("countrySelect").value,
            state: document.getElementById("stateSelect").value,
            expiryDate: document.getElementById("expiryDate").value
        };
        db.registerUser(userData);
        // Clear form inputs
        document.querySelectorAll("#registerForm input").forEach(input => input.value = '');
    });
