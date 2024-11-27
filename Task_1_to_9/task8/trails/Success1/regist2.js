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
                    </td><td>
                    <td class="border border-gray-300 p-2">
                        <button onclick="app.deleteData(${item.id})" class="text-red-500 hover:text-red-700">🗑️</button>
                    </td>
                `;
                list.appendChild(row);
            });
        };
    }

    // editData(id, field, currentValue) {
    //     const transaction = this.db.transaction([this.storeName], "readwrite");
    //     const store = transaction.objectStore(this.storeName);
    //     const request = store.get(id);
        
    //     request.onsuccess = (e) => {
    //         const data = e.target.result;
    //         const cell = document.querySelector(`td:has(.edit-icon[onclick="app.editData(${id}, '${field}', '${currentValue}')"])`);

    //         // Clear the cell's content and add a dropdown for editable fields
    //         cell.innerHTML = '';
    //         let dropdown;

    //         // Create dropdown for fields
    //         if (field === "gender") {
    //             dropdown = document.createElement("select");
    //             ["Male", "Female", "Other"].forEach(optionText => {
    //                 const option = document.createElement("option");
    //                 option.value = optionText;
    //                 option.textContent = optionText;
    //                 if (optionText === currentValue) option.selected = true;
    //                 dropdown.appendChild(option);
    //             });
    //         } else if (field === "country") {
    //             dropdown = document.createElement("select");
    //             ["India", "USA", "UK"].forEach(optionText => {
    //                 const option = document.createElement("option");
    //                 option.value = optionText;
    //                 option.textContent = optionText;
    //                 if (optionText === currentValue) option.selected = true;
    //                 dropdown.appendChild(option);
    //             });
    //         } else if (field === "state") {
    //             dropdown = document.createElement("select");
    //             ["Tamil Nadu", "Kerala", "Maharashtra"].forEach(optionText => {
    //                 const option = document.createElement("option");
    //                 option.value = optionText;
    //                 option.textContent = optionText;
    //                 if (optionText === currentValue) option.selected = true;
    //                 dropdown.appendChild(option);
    //             });
    //         } else if (field === "city") {
    //             dropdown = document.createElement("select");
    //             ["Chennai", "Mumbai", "Kochi"].forEach(optionText => {
    //                 const option = document.createElement("option");
    //                 option.value = optionText;
    //                 option.textContent = optionText;
    //                 if (optionText === currentValue) option.selected = true;
    //                 dropdown.appendChild(option);
    //             });
    //         } else {
    //             // For username, email, password, and date, create a simple input field
    //             dropdown = document.createElement("input");
    //             dropdown.type = field === "date" ? "date" : "text"; // Differentiate date field
    //             dropdown.value = currentValue;
    //         }

    //         dropdown.classList.add("p-2", "border", "rounded", "text-gray-700");
    //         dropdown.addEventListener("blur", () => {
    //             const newValue = field === "gender" ? dropdown.options[dropdown.selectedIndex].value : dropdown.value;
    //             data[field] = newValue;
    //             store.put(data).onsuccess = () => this.displayData();
    //         });

    //         cell.appendChild(dropdown);
    //         dropdown.focus();
    //     };
    // }
    // editData(id, field, currentValue) {
    //     const transaction = this.db.transaction([this.storeName], "readwrite");
    //     const store = transaction.objectStore(this.storeName);
    //     const request = store.get(id);
        
    //     request.onsuccess = (e) => {
    //         const data = e.target.result;
    //         const cell = document.querySelector(`td:has(.edit-icon[onclick="app.editData(${id}, '${field}', '${currentValue}')"])`);
    
    //         if (!cell) {
    //             console.error("Cell not found");
    //             return; // Exit if the cell is not found
    //         }
    
    //         cell.innerHTML = '';
    //         let dropdown;
    
    //         // Create dropdown for gender
    //         if (field === "gender") {
    //             dropdown = document.createElement("select");
    //             ["Male", "Female", "Other"].forEach(optionText => {
    //                 const option = document.createElement("option");
    //                 option.value = optionText;
    //                 option.textContent = optionText;
    //                 if (optionText === currentValue) option.selected = true;
    //                 dropdown.appendChild(option);
    //             });
    //         } else {
    //             // For other fields, create an input element
    //             dropdown = document.createElement("input");
    //             dropdown.type = field === "date" ? "date" : "text";
    //             dropdown.value = currentValue;
    //         }
    
    //         dropdown.classList.add("p-2", "border", "rounded", "text-gray-700");
    
    //         dropdown.addEventListener("blur", () => {
    //             const newValue = field === "gender" ? dropdown.options[dropdown.selectedIndex].value : dropdown.value;
    //             data[field] = newValue;
    
    //             // New transaction for the put operation
    //             const putTransaction = this.db.transaction([this.storeName], "readwrite");
    //             const putStore = putTransaction.objectStore(this.storeName);
    //             const putRequest = putStore.put(data);
    
    //             putRequest.onsuccess = () => {
    //                 this.displayData(); // Refresh display after successful update
    //             };
    
    //             putRequest.onerror = (error) => {
    //                 console.error("Error updating data:", error);
    //             };
    //         });
    
    //         cell.appendChild(dropdown);
    //         dropdown.focus();
    //     };
    
    //     request.onerror = (error) => {
    //         console.error("Error fetching data:", error);
    //     };
    // }
    editData(id, field, currentValue) {
        const transaction = this.db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);
    
        request.onsuccess = (e) => {
            const data = e.target.result;
            const cell = document.querySelector(`td:has(.edit-icon[onclick="app.editData(${id}, '${field}', '${currentValue}')"])`);
    
            if (!cell) {
                console.error("Cell not found");
                return; // Exit if the cell is not found
            }
    
            cell.innerHTML = '';
            let dropdown;
    
            // Create dropdown based on field type
            if (field === "gender") {
                dropdown = document.createElement("select");
                ["Male", "Female", "Other"].forEach(optionText => {
                    const option = document.createElement("option");
                    option.value = optionText;
                    option.textContent = optionText;
                    if (optionText === currentValue) option.selected = true;
                    dropdown.appendChild(option);
                });
            } else if (field === "country") {
                dropdown = document.createElement("select");
                ["India", "USA", "UK"].forEach(optionText => {
                    const option = document.createElement("option");
                    option.value = optionText;
                    option.textContent = optionText;
                    if (optionText === currentValue) option.selected = true;
                    dropdown.appendChild(option);
                });
            } else if (field === "state") {
                dropdown = document.createElement("select");
                ["Tamil Nadu", "Kerala", "Maharashtra"].forEach(optionText => {
                    const option = document.createElement("option");
                    option.value = optionText;
                    option.textContent = optionText;
                    if (optionText === currentValue) option.selected = true;
                    dropdown.appendChild(option);
                });
            } else if (field === "city") {
                dropdown = document.createElement("select");
                ["Chennai", "Mumbai", "Kochi"].forEach(optionText => {
                    const option = document.createElement("option");
                    option.value = optionText;
                    option.textContent = optionText;
                    if (optionText === currentValue) option.selected = true;
                    dropdown.appendChild(option);
                });
            } else {
                // For other fields like username, email, password, and date, create a simple input field
                dropdown = document.createElement("input");
                dropdown.type = field === "date" ? "date" : "text"; // Differentiate date field
                dropdown.value = currentValue;
            }
    
            dropdown.classList.add("p-2", "border", "rounded", "text-gray-700");
    
            // Update value on blur
            dropdown.addEventListener("blur", () => {
                const newValue = field === "gender" || field === "country" || field === "state" || field === "city" 
                    ? dropdown.options[dropdown.selectedIndex].value 
                    : dropdown.value;
                data[field] = newValue;
    
                // New transaction for the put operation
                const putTransaction = this.db.transaction([this.storeName], "readwrite");
                const putStore = putTransaction.objectStore(this.storeName);
                const putRequest = putStore.put(data);
    
                putRequest.onsuccess = () => {
                    this.displayData(); // Refresh display after successful update
                };
    
                putRequest.onerror = (error) => {
                    console.error("Error updating data:", error);
                };
            });
    
            cell.appendChild(dropdown);
            dropdown.focus();
        };
    
        request.onerror = (error) => {
            console.error("Error fetching data:", error);
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
