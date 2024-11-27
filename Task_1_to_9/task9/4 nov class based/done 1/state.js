class IndexedDB {
  constructor(dbName, storeName) {
    this.dbName = dbName; this.storeName = storeName; this.db = null; this.initDB();
  }
  initDB() {
    const request = indexedDB.open(this.dbName, 1);
    request.onupgradeneeded = (event) => {
      console.log("Database upgrade needed."); 
      this.db = event.target.result; 
      if (!this.db.objectStoreNames.contains(this.storeName)) 
        this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });};
    request.onsuccess = (event) => { this.db = event.target.result; this.display(); };
    request.onerror = (event) => console.error("Database error:", event.target.errorCode);
  }  display() {}}

class State extends IndexedDB {
  constructor(dbName, storeName) { super(dbName, storeName); }
  display() { this.displayItems(); this.displayCountry(); }
  displayItems() {
    const transaction = this.db.transaction(this.storeName, "readonly");
    const store = transaction.objectStore(this.storeName);
    const request = store.getAll();
    request.onsuccess = (event) => {
      const itemList = document.getElementById("state_list");
      itemList.innerHTML = `<tr>
        <th class="border-2 border-gray-300 px-4 py-2">ID</th>
        <th class="border-2 border-gray-300 px-4 py-2">Country</th>
        <th class="border-2 border-gray-300 px-4 py-2">State</th>
        <th class="border-2 border-gray-300 px-4 py-2">Edit</th>
        <th class="border-2 border-gray-300 px-4 py-2">Delete</th>
      </tr>`;
      event.target.result.forEach((item) => {
        const row = document.createElement("tr");
        this.getCountry(item.country, (country) => {
          row.innerHTML = `
            <td class="border-2 border-gray-300 px-4 py-2">${item.id}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${country}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.state}</td>
            <td class="border-2 border-gray-300 px-4 py-2"><button class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onclick="state.editState(${item.id})">Edit</button></td>
            <td class="border-2 border-gray-300 px-4 py-2"><button class="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onclick="state.deleteState(${item.id})">Delete</button></td>
          `;
          itemList.appendChild(row)})})}}
  getCountry(id, callback) {
    const transaction = this.db.transaction("country", "readonly");
    const store = transaction.objectStore("country");
    const request = store.get(id);
    request.onsuccess = (event) => {
      const item = event.target.result;
      callback(item ? item.country.toString() : "Unknown")}}
  displayCountry() { 
    const request = this.db.transaction("country", "readonly").objectStore("country").getAll();
    request.onsuccess = (event) => {
      const select = document.getElementById("country");
      select.innerHTML += `<option value="">Select Country</option>`;
      event.target.result.forEach((item) => { const option = document.createElement("OPTION");
        option.innerHTML = item.country; option.value = item.id; select.options.add(option)})}}
  addState() {
    const country = parseInt(document.getElementById("country").value);
    const state = document.getElementById("state").value;
    if (country && state) {
      const request = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName).add({ state, country });
      request.onsuccess = () => { alert("Added Successfully"); this.displayItems(); this.clearForm(); };
    } else alert("Country and State must be filled out");
  }
  editState(id) {
    const request = this.db.transaction(this.storeName, "readonly").objectStore(this.storeName).get(id);
    request.onsuccess = (event) => { const item = event.target.result;
      document.getElementById("country").value = item.country; 
      document.getElementById("state").value = item.state; 
      document.getElementById("state").dataset.id = id;
      document.getElementById("btn").innerHTML = `<button onclick="state.updateState()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700">Update</button>`}}
  updateState() {
    const id = parseInt(document.getElementById("state").dataset.id);
    const country = parseInt(document.getElementById("country").value);
    const state = document.getElementById("state").value;
    if (country && state) {
      const request = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName).put({ id, country, state });
      request.onsuccess = () => { alert("Updated Successfully"); this.displayItems(); this.clearForm(); };
    } else alert("Country and State must be filled out")}
  deleteState(id) {
    const request = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName).delete(id);
    request.onsuccess = () => this.display()}
  clearForm() {
    document.getElementById("country").value = ''; 
    document.getElementById("state").value = ''; 
    delete document.getElementById("state").dataset.id; 
    document.getElementById("btn").innerHTML = `<button onclick="state.addState()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700">Add State</button>`  }}
const state = new State("CRUD_Details_Database", "state");