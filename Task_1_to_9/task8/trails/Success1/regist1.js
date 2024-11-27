class App {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.initDB();
    }
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
    addData() {
        const username = document.getElementById("Username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const date = document.getElementById("date").value.trim();
        const gender = document.querySelector("input[name='Gender']:checked")?.value;
        const country = sessionStorage.getItem("country") || "N/A";
        const state = sessionStorage.getItem("state") || "N/A";
        const city = sessionStorage.getItem("city") || "N/A";
        if (!username || !email || !password || !date || !gender) return;
        const store = this.db.transaction([this.storeName], "readwrite").objectStore(this.storeName);
        const data = { username, email, password, date, gender, country, state, city };
        store.add(data).onsuccess = () => {
            this.displayData();
            this.resetForm();
        };
    }
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
                    <td class="border border-gray-300 p-2 hover-show-edit">${item.username} 
                        <span class="edit-icon" onclick="app.editData(${item.id}, 'username', '${item.username}')">✎</span>
                    </td>
                    <td class="border border-gray-300 p-2 hover-show-edit">${item.email} 
                        <span class="edit-icon" onclick="app.editData(${item.id}, 'email', '${item.email}')">✎</span>
                    </td>
                    <td class="border border-gray-300 p-2 hover-show-edit">${item.password} 
                        <span class="edit-icon" onclick="app.editData(${item.id}, 'password', '${item.password}')">✎</span>
                    </td>
                    <td class="border border-gray-300 p-2 hover-show-edit">${item.date} 
                        <span class="edit-icon" onclick="app.editData(${item.id}, 'date', '${item.date}')">✎</span>
                    </td>
                    <td class="border border-gray-300 p-2 hover-show-edit">${item.gender} 
                        <span class="edit-icon" onclick="app.editData(${item.id}, 'gender', '${item.gender}')">✎</span>
                    </td>
                    <td class="border border-gray-300 p-2 hover-show-edit">${item.country} 
                        <span class="edit-icon" onclick="app.editData(${item.id}, 'country', '${item.country}')">✎</span>
                    </td>
                    <td class="border border-gray-300 p-2 hover-show-edit">${item.state} 
                        <span class="edit-icon" onclick="app.editData(${item.id}, 'state', '${item.state}')">✎</span>
                    </td>
                    <td class="border border-gray-300 p-2 hover-show-edit">${item.city} 
                        <span class="edit-icon" onclick="app.editData(${item.id}, 'city', '${item.city}')">✎</span>
                    </td>
                    <td class="border border-gray-300 p-2">
                        <button onclick="app.deleteData(${item.id})" class="text-red-500 hover:text-red-700">🗑️</button>
                    </td>
                `;
                list.appendChild(row);
            });
        };
    }
    editData(id, field, currentValue) {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);
        
        request.onsuccess = (e) => {
            const data = e.target.result;
            const cell = document.querySelector(`td:has(.edit-icon[onclick="app.editData(${id}, '${field}', '${currentValue}')"])`);

            // Clear the cell's content and add an input or dropdown
            cell.innerHTML = '';
            let inputElement;
            if (field === "state") {
                inputElement = document.createElement("select");
                ["Tamil Nadu", "Kerala", "Maharashtra"].forEach(optionText => {
                    const option = document.createElement("option");
                    option.value = optionText;
                    option.textContent = optionText;
                    if (optionText === currentValue) option.selected = true;
                    inputElement.appendChild(option);
                });
            } else {
                inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.value = currentValue;
            }
            inputElement.classList.add("p-2", "border", "rounded", "text-gray-700");
            inputElement.addEventListener("blur", () => {
                const newValue = inputElement.value;
                if (field === "state") {
                    data[field] = inputElement.options[inputElement.selectedIndex].value;
                } else {
                    data[field] = newValue;
                }
                store.put(data).onsuccess = () => this.displayData();
            });
            cell.appendChild(inputElement);
            inputElement.focus();
        };
    }
    deleteData(id) {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        transaction.objectStore(this.storeName).delete(id).onsuccess = () => this.displayData();
    }
    resetForm() {
        document.getElementById("RegistervalidateAndStorage").reset();
        sessionStorage.removeItem("country");
        sessionStorage.removeItem("state");
        sessionStorage.removeItem("city");
    }
}

const app = new App("RegistrationDB", "userData");

document.getElementById("RegistervalidateAndStorage").addEventListener("submit", function (e) {
    e.preventDefault();
    app.addData();
});
