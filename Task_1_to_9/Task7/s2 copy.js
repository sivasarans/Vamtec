class App {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.initDB();
    }

    // Initialize IndexedDB
    initDB() {
        const request = indexedDB.open(this.dbName, 1);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(this.storeName)) {
                db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (e) => {
            this.db = e.target.result;
            this.displayData();
        };
    }

    // Add new record
    addData() {
        const username = document.getElementById("Username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const date = document.getElementById("date").value.trim();
        const gender = document.querySelector("input[name='Gender']:checked")?.value;

        if (!username || !email || !password || !date || !gender) return;

        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const data = { username, email, password, date, gender };

        store.add(data).onsuccess = () => {
            this.displayData();
            this.resetForm();
        };
    }

    // Display all data
    displayData() {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();

        request.onsuccess = (e) => {
            const list = document.getElementById("list");
            list.innerHTML = "";
            e.target.result.forEach((item) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="border border-gray-300 p-2">${item.username}</td>
                    <td class="border border-gray-300 p-2">${item.email}</td>
                    <td class="border border-gray-300 p-2">${item.password}</td>
                    <td class="border border-gray-300 p-2">${item.date}</td>
                    <td class="border border-gray-300 p-2">${item.gender}</td>
                    <td class="border border-gray-300 p-2">
                        <button onclick="app.editData(${item.id})" class="text-blue-500">Edit</button> |
                        <button onclick="app.deleteData(${item.id})" class="text-red-500">Delete</button>
                    </td>
                `;
                list.appendChild(row);
            });
        };
    }

    // Edit data
    editData(id) {
        const transaction = this.db.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);

        request.onsuccess = (e) => {
            const item = e.target.result;
            document.getElementById("Username").value = item.username;
            document.getElementById("email").value = item.email;
            document.getElementById("password").value = item.password;
            document.getElementById("date").value = item.date;
            document.querySelector(`input[name='Gender'][value='${item.gender}']`).checked = true;

            document.getElementById("RegistervalidateAndStorage").setAttribute("data-id", id);
        };
    }

    // Update data
    updateData(id) {
        const username = document.getElementById("Username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const date = document.getElementById("date").value.trim();
        const gender = document.querySelector("input[name='Gender']:checked")?.value;

        if (!username || !email || !password || !date || !gender) return;

        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);

        request.onsuccess = (e) => {
            const data = { ...e.target.result, username, email, password, date, gender };
            store.put(data).onsuccess = () => {
                this.displayData();
                this.resetForm();
            };
        };
    }

    // Delete data
    deleteData(id) {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        store.delete(id).onsuccess = () => this.displayData();
    }

    // Reset form fields
    resetForm() {
        document.getElementById("RegistervalidateAndStorage").reset();
        document.getElementById("RegistervalidateAndStorage").removeAttribute("data-id");
    }
}

// Initialize app instance and set up form submission handling
const app = new App("UserDatabase", "UserTable");

document.getElementById("RegistervalidateAndStorage").onsubmit = (e) => {
    e.preventDefault();
    const id = document.getElementById("RegistervalidateAndStorage").getAttribute("data-id");
    if (id) app.updateData(Number(id));
    else app.addData();
};
