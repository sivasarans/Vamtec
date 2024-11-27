class IndexedDBApp {
    constructor(dbName, storeName) {
      this.dbName = dbName;
      this.storeName = storeName;
      this.db = null;
      this.initDB();
    }
  
    // Initialize IndexedDB
    initDB() {
      const request = indexedDB.open(this.dbName, 1);
  
      request.onupgradeneeded = (event) => {
        this.db = event.target.result;
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = (event) => {
        this.db = event.target.result;
        this.displayItems();
      };
  
      request.onerror = (event) => {
        console.error("Database error:", event.target.errorCode);
      };
    }
  
    // Add item to IndexedDB
    addItem() {
      const name = document.getElementById("name").value;
      const age = parseInt(document.getElementById("age").value);
  
      if (name && age) {
        const transaction = this.db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.add({ name, age });
  
        request.onsuccess = () => {
          this.displayItems();
          this.clearForm();
        };
      } else {
        alert("Please enter both name and age.");
      }
    }
  
    // Display items from IndexedDB
    displayItems() {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
  
      request.onsuccess = (event) => {
        const itemList = document.getElementById("itemList");
        itemList.innerHTML = "";
  
        event.target.result.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <span>${item.name} - Age: ${item.age}</span>
            <button onclick="app.editItem(${item.id})">Edit</button>
            <button onclick="app.deleteItem(${item.id})">Delete</button>
          `;
          itemList.appendChild(listItem);
        });
      };
    }
  
    // Edit item
    editItem(id) {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);
  
      request.onsuccess = (event) => {
        const item = event.target.result;
        document.getElementById("name").value = item.name;
        document.getElementById("age").value = item.age;
        document.getElementById("name").dataset.id = id;
      };
    }
  
    // Update item in IndexedDB
    updateItem() {
      const id = parseInt(document.getElementById("name").dataset.id);
      const name = document.getElementById("name").value;
      const age = parseInt(document.getElementById("age").value);
  
      if (name && age && id) {
        const transaction = this.db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.put({ id, name, age });
  
        request.onsuccess = () => {
          this.displayItems();
          this.clearForm();
        };
      } else {
        alert("Please select an item to update.");
      }
    }
  
    // Delete item from IndexedDB
    deleteItem(id) {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);
  
      request.onsuccess = () => this.displayItems();
    }
  
    // Clear form input fields
    clearForm() {
      document.getElementById("name").value = '';
      document.getElementById("age").value = '';
      delete document.getElementById("name").dataset.id;
    }
  }
  
  // Initialize the app instance
  const app = new IndexedDBApp("CRUD_Database", "items");
  