class IndexedDB {
    constructor(dbName, storeName) {
      this.dbName = dbName;
      this.storeName = storeName;
      this.db = null;
      this.initDB();
    }
  
    
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

    validateform(name, email, password, gender, dob) {
      if (name == "") {
          alert("Name must be filled out");
          return false;
      }
      else if (email == "") {
          alert("Email must be filled out");
          return false;
      }
      else if (password == "") {
          alert("password must be filled out");
          return false;
      }
      else if (password.length < 6) {
          alert(" Password should not be less than 6 character");
          return false;
      }
      else if (dob == "") {
          alert("date must be chosen");
          return false;
      }
      else if (gender == "") {
          alert("gender must be chosen");
          return false;
      }
      else {
          
          return true;
      }
  }
  
  
    addItem() {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("pass").value;
      let dob = document.getElementsByName("Date")[0].value;
      let genderOptions = document.getElementsByName("gender");
      let gender = "";
      console.log(1);
      for (var i = 0; i < genderOptions.length; i++) {
          if (genderOptions[i].checked) {
              gender = genderOptions[i].value;
          }
      }
      console.log(2);
      if (this.validateform(name, email, password, gender,dob)) {
        console.log(3);
        const transaction = this.db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.add({ name, email,password, gender,dob });
  
        request.onsuccess = () => {
          alert("Registered Successfully");
          this.displayItems();
          this.clearForm();
      }
    }
    }
  
    
    displayItems() {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
  
      request.onsuccess = (event) => {
        const itemList = document.getElementById("itemList");
        itemList.innerHTML = `<tr>
      <th class="border-2 border-gray-300 px-4 py-2">ID</th>
      <th class="border-2 border-gray-300 px-4 py-2">Name</th>
      <th class="border-2 border-gray-300 px-4 py-2">Email</th>
      <th class="border-2 border-gray-300 px-4 py-2">Gender</th>
      <th class="border-2 border-gray-300 px-4 py-2">DOB</th>
      <th class="border-2 border-gray-300 px-4 py-2">Edit</th>
      <th class="border-2 border-gray-300 px-4 py-2">Delete</th>
    </tr>`;
  
        event.target.result.forEach((item) => {
          const  row = document.createElement("tr");
           row.innerHTML = `
            <td class="border-2 border-gray-300 px-4 py-2">${item.id}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.name}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.email}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.gender}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.dob}</td>
            <td class="border-2 border-gray-300 px-4 py-2"><button class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onclick="app.editItem(${item.id})">Edit</button></td>
            <td class="border-2 border-gray-300 px-4 py-2"><button class="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onclick="app.deleteItem(${item.id})">Delete</button></td>
          `;
          itemList.appendChild(row);
        });
      };
    }
  
    
    editItem(id) {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);
  
      request.onsuccess = (event) => {
        const item = event.target.result;
        document.getElementById("name").value = item.name;
        document.getElementById("email").value = item.email;
        document.getElementById("pass").value = item.password;
        let gender=document.getElementsByName("gender");
        for (var i = 0; i < gender.length; i++) {
          if (gender[i].value === item.gender) {
              gender[i].checked=true;
          }
      }
        document.getElementById("date").value = item.dob;
        document.getElementById("name").dataset.id = id;
        document.getElementById("btn").innerHTML=`
        <button onclick="app.updateItem()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" value="Register" >Update</button>
        `
      };
    }
  
    
    updateItem() {
      const id = parseInt(document.getElementById("name").dataset.id);
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("pass").value;
      const dob = document.getElementsByName("Date")[0].value;
      const genderOptions = document.getElementsByName("gender");
      let gender = "";
      console.log(1);
      for (var i = 0; i < genderOptions.length; i++) {
          if (genderOptions[i].checked) {
              gender = genderOptions[i].value;
          }
      }
      console.log(id);
      if (this.validateform(name, email, password, gender,dob)) {
        const transaction = this.db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.put({ id, name, email,password,gender,dob });
  
        request.onsuccess = () => {
          alert("Updated Successfully");
          this.displayItems();
          this.clearForm();
        };
      } 
    }
  
    
    deleteItem(id) {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);
  
      request.onsuccess = () => this.displayItems();
    }
  
    
    clearForm() {
      document.getElementById("name").value = '';
      document.getElementById("email").value = '';
      document.getElementById("pass").value = '';
      document.getElementById("date").value = '';
      let gender=document.getElementsByName("gender");
        for (var i = 0; i < gender.length; i++) {
          if (gender[i].checked) {
              gender[i].checked=false;
          }
      }
      delete document.getElementById("name").dataset.id;
      document.getElementById("btn").innerHTML=`
      <button onclick="app.addItem()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700"
       value="Register" >Register</button>`;
    }
  }
  
  
  const app = new IndexedDB("Database", "person_details");
  