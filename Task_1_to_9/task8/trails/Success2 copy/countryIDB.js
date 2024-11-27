// script.js
let db;

// Open (or create) the database
const request = indexedDB.open("CountryDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    const objectStore = db.createObjectStore("countries", { keyPath: "id", autoIncrement: true });
    objectStore.createIndex("name", "name", { unique: false });
};

request.onsuccess = function(event) {
    db = event.target.result;
};

request.onerror = function(event) {
    console.error("Database error: ", event.target.error);
};

// Handle form submission
document.getElementById("countryForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const countryId = document.getElementById("countryId").value;
    const countryName = document.getElementById("countryName").value;

    const transaction = db.transaction(["countries"], "readwrite");
    const objectStore = transaction.objectStore("countries");

    const country = {
        id: countryId,
        name: countryName
    };

    const request = objectStore.add(country);

    request.onsuccess = function() {
        alert("Country added successfully!");
        document.getElementById("countryForm").reset();
    };

    request.onerror = function() {
        console.error("Error adding country: ", request.error);
    };
});
