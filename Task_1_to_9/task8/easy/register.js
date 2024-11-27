// import {IndexedDB} from `./IndexedDB.js`;
class IndexedDB {
  constructor(dbName, storeName,version_no) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.no=version_no;
    this.db = null;
    this.initDB();
  }

  
  initDB() {
    const request = indexedDB.open(this.dbName, this.no);

    request.onupgradeneeded = (event) => {
      console.log("Database upgrade needed.");
      this.db = event.target.result;
      if (!this.db.objectStoreNames.contains(this.storeName)) {
        this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      this.db = event.target.result;
      this.display();
    };
    request.onerror = (event) => {
      console.error("Database error:", event.target.errorCode);
    };
  }
  display(){
  }
}

class Organization extends IndexedDB{
    constructor(dbName, storeName,version_no) {
      super(dbName,storeName,version_no);
    }

    display(){
      this.displayItems();
      this.displayCountry();
    }

    validateform(name,organization,mobile_no, email, password, users,country,state,expire_days) {
      if (name=="") {
          alert("Name must be filled out");
          return false;
      }
      else if (organization=="") {
        alert("Organization Name must be filled out");
        return false;
    }
    else if (mobile_no == "") {
      alert("Mobile Number must be filled out");
      return false;
  }
  else if (mobile_no.length !== 10) {
    alert("Mobile Number must be in 10 digits");
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
      else if (users=="") {
        alert("Number of Users must be filled out");
        return false;
    }
      else if (country=="") {
          alert("Country must be chosen");
          return false;
      }
      else if (state=="") {
          alert("State must be chosen");
          return false;
      }
      else if (expire_days=="") {
        alert("Expire Days must be filled out");
        return false;
    }
      else {
          return true;
      }
  }
  
  
    addUser() {
      let name = document.getElementById("name").value;
      let organization = document.getElementById("organization").value;
      let mobile_no = document.getElementById("mobile_no").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("pass").value;
      let users = document.getElementById("users").value;
      let country = parseInt(document.getElementById("country").value);
      let state = parseInt(document.getElementById("state").value);
      let expire_days = parseInt(document.getElementById("expire_days").value,10);
      
      if (this.validateform(name,organization,mobile_no, email, password, users,country,state,expire_days)) {
        console.log(3);
        const date = new Date(); 
        date.setDate(date.getDate() + expire_days);
        const expire_date = date.toLocaleDateString();
        console.log(expire_date);
        const transaction = this.db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.add({ name,organization,mobile_no, email, password, users,country,state,expire_date });
  
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
      const date = new Date();
      console.log(date.toDateString())
  
      request.onsuccess = (event) => {
        const itemList = document.getElementById("itemList");
        itemList.innerHTML = `<tr>
      <th class="border-2 border-gray-300 px-4 py-2">ID</th>
      <th class="border-2 border-gray-300 px-4 py-2">Name</th>
      <th class="border-2 border-gray-300 px-4 py-2">Organization</th>
      <th class="border-2 border-gray-300 px-4 py-2">Mobile No</th>
      <th class="border-2 border-gray-300 px-4 py-2">Email</th>
      <th class="border-2 border-gray-300 px-4 py-2">No of Users</th>
      <th class="border-2 border-gray-300 px-4 py-2">State</th>
      <th class="border-2 border-gray-300 px-4 py-2">Country</th>
      <th class="border-2 border-gray-300 px-4 py-2">Expire Date</th>
      <th class="border-2 border-gray-300 px-4 py-2">Edit</th>
      <th class="border-2 border-gray-300 px-4 py-2">Delete</th>
    </tr>`;
  
        event.target.result.forEach((item) => {
          const date = new Date().toLocaleDateString();
          const formattedDate = new Date(item.expire_date);
          const days = formattedDate - date;
          const day = Math.ceil(days / (1000 * 60 * 60 * 24));
          console.log(day);

          console.log(item.state+item.country);
          this.getState(parseInt(item.state),state=>{
          this.getCountry(parseInt(item.country),country=>{
          const  row = document.createElement("tr");
           row.innerHTML = `
            <td class="border-2 border-gray-300 px-4 py-2">${item.id}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.name}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.organization}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.mobile_no}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.email}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.users}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${state}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${country}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.expire_date}</td>
            <td class="border-2 border-gray-300 px-4 py-2"><button class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onclick="user.editUser(${item.id})">Edit</button></td>
            <td class="border-2 border-gray-300 px-4 py-2"><button class="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onclick="user.deleteUser(${item.id})">Delete</button></td>
          `;
          itemList.appendChild(row);
        });
      });
    });
      };
    }

    getState(id,callback){
      const transaction = this.db.transaction("state", "readonly");
      const store = transaction.objectStore("state");
      const request = store.get(id);
      request.onsuccess = (event) => {
        const item = event.target.result;
        console.log(item.state);
        const state = item ? item.state.toString() : "Unknown"; 
        callback(state); 
      };
    }

    getCountry(id,callback){
      const transaction = this.db.transaction("ee", "readonly");
      const store = transaction.objectStore("ee");
      const request = store.get(id);
      request.onsuccess = (event) => {
        const item = event.target.result;
        console.log(item.country);
        const country = item ? item.country.toString() : "Unknown"; 
        callback(country); 
      };
    }

    displayCountry() {
      const transaction = this.db.transaction("ee", "readonly");
      const store = transaction.objectStore("ee");
      const request = store.getAll();
  
      request.onsuccess = (event) => {
        const select = document.getElementById("country");
        select.innerHTML+=`<option value="">Select  Country</option>`;

        event.target.result.forEach((item) => {
                let option = document.createElement("OPTION");
                option.innerHTML = item.country;
                option.value = item.id;
                select.options.add(option);
            });
      };
    }

    displayState() {
      let country = document.getElementById("country").value;
      const transaction = this.db.transaction("state", "readonly");
      const store = transaction.objectStore("state");
      const request = store.getAll();
      const select = document.getElementById("state");
      select.innerHTML ="";
  
      request.onsuccess = (event) => {
        
        select.innerHTML+=`<option value="">Select  State</option>`;

        event.target.result.forEach((item) => {
          if(item.country == country){
                let option = document.createElement("OPTION");
                option.innerHTML = item.state;
                option.value = item.id;
                select.options.add(option);
          }
            });
      };
    }

  
    
    editUser(id) {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);
  
      request.onsuccess = async (event) => {
        const item = event.target.result;
        document.getElementById("name").value = item.name;
        document.getElementById("organization").value = item.organization;
        document.getElementById("mobile_no").value = item.mobile_no;
        document.getElementById("email").value = item.email;
        document.getElementById("pass").value = item.password;
        document.getElementById("users").value = item.users;
        document.getElementById("country").value = item.country;
        this.displayState();
        document.getElementById("state").value = item.state;
        document.getElementById("expire_days").value = item.expire_date;
        document.getElementById("name").dataset.id = id;
        document.getElementById("btn").innerHTML=`
        <button onclick="user.updateUser()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" value="Register" >Update</button>
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
  
    
    deleteUser(id) {
      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(id);
  
      request.onsuccess = () => this.display();
    }
  
    
    clearForm() {
      document.getElementById("name").value = '';
      document.getElementById("organization").value = '';
      document.getElementById("mobile_no").value = '';
      document.getElementById("email").value = '';
      document.getElementById("pass").value = '';
      document.getElementById("users").value = '';
      document.getElementById("country").value = '';
      document.getElementById("state").value = '';
      document.getElementById("expire_days").value = '';
      delete document.getElementById("name").dataset.id;
      document.getElementById("btn").innerHTML=`
      <button onclick="user.addUser()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700"
       value="Register" >Register</button>`;
    }
  }
  
  const user = new Organization("Database2", "details",11);