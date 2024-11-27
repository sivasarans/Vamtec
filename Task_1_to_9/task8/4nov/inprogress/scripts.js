class CountryDatabase {
    constructor() {
        this.db = null;
        this.openDatabase();
    }

    openDatabase() {
        const request = indexedDB.open("CountryDB", 1);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("countries")) {
                db.createObjectStore("countries", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onerror = (e) => alert("Database error: " + e.target.error.message);

        request.onsuccess = (e) => {
            this.db = e.target.result;
            this.displayCountries();
        };
    }

    addCountry(countryId, countryName) {
        const transaction = this.db.transaction("countries", "readwrite");
        const store = transaction.objectStore("countries");
        const country = { id: parseInt(countryId), name: countryName };

        const request = store.add(country);

        request.onsuccess = () => {
            alert("Country added successfully!");
            this.displayCountries(); // Refresh the list
        };

        request.onerror = (e) => alert("Error adding country: " + e.target.error.message);
    }

    displayCountries() {
        const transaction = this.db.transaction("countries", "readonly");
        const store = transaction.objectStore("countries");
        const request = store.getAll();

        request.onsuccess = (e) => {
            const countryTableBody = document.getElementById("countryTableBody");
            countryTableBody.innerHTML = "";

            e.target.result.forEach((country) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td class="px-6 py-4 border-b border-gray-300">${country.id}</td>
                    <td class="px-6 py-4 border-b border-gray-300">${country.name}</td>
                    <td class="px-6 py-4 border-b border-gray-300">
                        <button onclick="countryDB.editCountry(${country.id})" class="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                        <button onclick="countryDB.deleteCountry(${country.id})" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                `;
                countryTableBody.appendChild(row);
            });
        };

        request.onerror = (e) => alert("Error displaying countries: " + e.target.error.message);
    }

    deleteCountry(countryId) {
        const transaction = this.db.transaction("countries", "readwrite");
        const store = transaction.objectStore("countries");
        const request = store.delete(countryId);

        request.onsuccess = () => {
            alert("Country deleted successfully!");
            this.displayCountries(); // Refresh the list
        };

        request.onerror = (e) => alert("Error deleting country: " + e.target.error.message);
    }

    editCountry(countryId) {
        const transaction = this.db.transaction("countries", "readonly");
        const store = transaction.objectStore("countries");
        const request = store.get(countryId);

        request.onsuccess = (e) => {
            const country = e.target.result;
            if (country) {
                document.getElementById("countryId").value = country.id;
                document.getElementById("countryName").value = country.name;
                document.getElementById("submitButton").textContent = "Update Country";
            }
        };

        request.onerror = (e) => alert("Error fetching country: " + e.target.error.message);
    }

    updateCountry(countryId, countryName) {
        const transaction = this.db.transaction("countries", "readwrite");
        const store = transaction.objectStore("countries");
        const country = { id: parseInt(countryId), name: countryName };

        const request = store.put(country);

        request.onsuccess = () => {
            alert("Country updated successfully!");
            this.displayCountries(); // Refresh the list
            document.getElementById("countryForm").reset();
            document.getElementById("submitButton").textContent = "Submit";
        };

        request.onerror = (e) => alert("Error updating country: " + e.target.error.message);
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const countryId = document.getElementById("countryId").value;
        const countryName = document.getElementById("countryName").value;

        if (document.getElementById("submitButton").textContent === "Update Country") {
            this.updateCountry(countryId, countryName);
        } else {
            this.addCountry(countryId, countryName);
        }
    }
}

const countryDB = new CountryDatabase();

document.getElementById("countryForm").addEventListener("submit", (event) => {
    countryDB.handleFormSubmit(event);
});
