// import {IndexedDB} from `./IndexedDB.js`;
class IndexedDB {
  constructor(dbName, storeName) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
    this.initDB();
  }
  // initDB() {
  //   const request = indexedDB.open(this.dbName,1);
  //   request.onupgradeneeded = (event) => {
  //     this.db = event.target.result;
  //     if (!this.db.objectStoreNames.contains(this.storeName)) { this.db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });      }
  //     if (!this.db.objectStoreNames.contains("country")) { this.db.createObjectStore("country", { keyPath: "id", autoIncrement: true });      }
  //     if (!this.db.objectStoreNames.contains("state")) {this.db.createObjectStore("state", { keyPath: "id", autoIncrement: true });      }};
  //   request.onsuccess = (event) => { this.db = event.target.result; this.display(); };
  //   request.onerror = (event) => { console.error("Database error:", event.target.errorCode);    }} 
  //   display(){ } }

// class Organization extends IndexedDB{
//     constructor(dbName, storeName) { super(dbName,storeName); }
//     display(){ this.displayItems(); this.displayCountry(); }
//     validateform(name,organization,mobile_no, email, password,file, users,country,state,expire_days) {
//       var allowedfiletypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'];
//       var maxfilesize = 2 * 1024 * 1024;
//       if (name=="") { alert("Name must be filled out");return false}
//       else if (organization === "") { alert("Organization Name must be filled out"); return false; }
//       else if (mobile_no === "") { alert("Mobile Number must be filled out"); return false; }
//       else if (mobile_no.length !== 10) { alert("Mobile Number must be in 10 digits"); return false; }
//       else if (email === "") { alert("Email must be filled out"); return false; }
//       else if (password === "") { alert("Password must be filled out"); return false; }
//       else if (password.length < 6) { alert("Password should not be less than 6 characters"); return false; }
//       else if (!file) { alert("File must be chosen"); return false; }
//       else if (allowedfiletypes.indexOf(file.type) === -1) { alert("File must be in jpg, jpeg, svg, or png"); return false; }
//       else if (file.size > maxfilesize) { alert("File size must be less than 2 MB"); return false; }
//       else if (users === "") { alert("Number of Users must be filled out"); return false; }
//       else if (country == 0) { alert("Country must be chosen"); return false; }
//       else if (state == 0) { alert("State must be chosen"); return false; }
//       else if (isNaN(expire_days)) { alert("Expire Days must be a number"); return false; }
//       else { return true; } }

    updateValidateform(name, organization, mobile_no, email, password, file, users, country, state, expire_days) {
      return this._validateFields(name, organization, mobile_no, email, password, file, users, country, state, expire_days); }
  
    // addUser() {
    //   let name = document.getElementById("name").value;
    //   let organization = document.getElementById("organization").value;
    //   let mobile_no = document.getElementById("mobile_no").value;
    //   let email = document.getElementById("email").value;
    //   let password = document.getElementById("pass").value;
    //   let inputfiles = document.getElementById("file");
    //   let file = inputfiles.files ? inputfiles.files[0] : null;
    //   let users = document.getElementById("users").value;
    //   let country = parseInt(document.getElementById("country").value);
    //   let state = parseInt(document.getElementById("state").value);
    //   let expire_days = parseInt(document.getElementById("expire_days").value,10);
      
    //   if (this.validateform(name,organization,mobile_no, email, password,file, users,country,state,expire_days)) {
    //     const date = new Date(); 
    //     date.setDate(date.getDate() + expire_days);
    //     const expire_date = date.toLocaleDateString();

    //     const reader = new FileReader();
    //     reader.onload = () => {
    //       const image = reader.result;
    //       const request = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName).add({ name,organization,mobile_no, email, password,image, users,country,state,expire_date });
  
    //       request.onsuccess = () => {
    //         alert("Registered Successfully");
    //         this.display(); this.clearForm(); this.close_form(); }
    //        };reader.readAsDataURL(file); }} 
    
    // displayItems() {
    //   const request = this.db.transaction(this.storeName, "readonly").objectStore(this.storeName).getAll();
    //   const date = new Date();    console.log(date.toDateString());
    //   request.onsuccess = (event) => {
    //     const itemList = document.getElementById("itemList");
    //     event.target.result.forEach((item) => {
    //       const today = new Date();
    //       const expireDate = new Date(item.expire_date);
    //       const days = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
    //       this.getState(parseInt(item.state),state=>{
    //       this.getCountry(parseInt(item.country),country=>{
    //       const  row = document.createElement("tr");
    //       if(days < 5 && days > 0){ row.className="bg-yellow-300"; }
    //       else if(days <= 0){ row.className="bg-red-400";}
    //       else { row.className="bg-green-300";}
    //        row.innerHTML = `
    //         <td class="border-2 border-green-300 px-4 py-2">${item.organization}</td>
    //         <td class="border-2 border-green-300 px-4 py-2"><img src="${item.image}" class="w-24 h-24 rounded-full"></td>
    //         <td class="border-2 border-green-300 px-4 py-2">${item.name}</td>
    //         <td class="border-2 border-green-300 px-4 py-2">${item.mobile_no}</td>
    //         <td class="border-2 border-green-300 px-4 py-2">${item.email}</td>
    //         <td class="border-2 border-green-300 px-4 py-2">${item.users}</td>
    //         <td class="border-2 border-green-300 px-4 py-2">${state}</td>
    //         <td class="border-2 border-green-300 px-4 py-2">${country}</td>
    //         <td class="border-2 border-green-300 px-4 py-2">${item.expire_date}</td>
    //         <td class="border-2 border-green-300 px-4 py-2"><button class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onclick="user.editUser(${item.id})">Edit</button></td>
    //         <td class="border-2 border-green-300 px-4 py-2"><button class="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onclick="user.deleteUser(${item.id})">Delete</button></td>
    //       `;
    //       itemList.appendChild(row);
    //     });
    //   });
    // });}}

    getState(id,callback){ 
      const request = this.db.transaction("state", "readonly").objectStore("state").get(id);
      request.onsuccess = (event) => {
        const item = event.target.result;
        const state = item ? item.state.toString() : "Unknown"; 
        callback(state); 
      }}

    getCountry(id,callback){
      if (id == null) {
        console.error("Invalid state ID:", id);
        callback("Unknown"); // Provide a default value
        return;
    }
      const request = this.db.transaction("country", "readonly").objectStore("country").get(id);
      request.onsuccess = (event) => {
        const item = event.target.result; console.log(item.country);
        const country = item ? item.country.toString() : "Unknown"; 
        callback(country); 
      }}

    displayCountry() { 
      const request = this.db.transaction("country", "readonly").objectStore("country").getAll();
      const select = document.getElementById("country");
      select.innerHTML =""; 
      request.onsuccess = (event) => { select.innerHTML+=`<option value="0">Select  Country</option>`;
        event.target.result.forEach((item) => {
                let option = document.createElement("OPTION");
                option.innerHTML = item.country;
                option.value = item.id;
                select.options.add(option);
            });}}

    displayState() {
      return new Promise((resolve) => {
      let country = document.getElementById("country").value; 
      const request = this.db.transaction("state", "readonly").objectStore("state").getAll();
      const select = document.getElementById("state");
      select.innerHTML ="";
      request.onsuccess = (event) => {select.innerHTML+=`<option value="0">Select  State</option>`;
        event.target.result.forEach((item) => {
          if(item.country == country){
                let option = document.createElement("OPTION");
                option.innerHTML = item.state;
                option.value = item.id;
                select.options.add(option);
          } });resolve()}})}

    open_form(){
      let form= document.getElementById("register_form");
      let btn= document.getElementById("user_btn");
      btn.onclick=function(){page.close_form();};
      btn.innerText="Close Form";
      form.className="flex justify-center items-center min-h-screen block"; }

    close_form(){
      let form= document.getElementById("register_form");
      let btn= document.getElementById("user_btn");
      btn.onclick=function(){page.open_form();};
      btn.innerText="Add User";
      form.className="flex justify-center items-center min-h-screen hidden"; }
    
    async editUser(id) {

      this.open_form();
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
        await this.displayState();
        document.getElementById("state").value = item.state;
        const today = new Date();
        const expireDate = new Date(item.expire_date);
        const days = Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24));
        document.getElementById("expire_days").value = days;
        document.getElementById("name").dataset.id = id;
        document.getElementById("btn").innerHTML=`
        <button onclick="user.updateUser()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" value="Register" >Update</button>
        ` }}
  
    updateUser() {
      const id = parseInt(document.getElementById("name").dataset.id);
      let name = document.getElementById("name").value;
      let organization = document.getElementById("organization").value;
      let mobile_no = document.getElementById("mobile_no").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("pass").value;
      let inputfiles = document.getElementById("file");
      let file = inputfiles.files ? inputfiles.files[0] : null;
      let users = document.getElementById("users").value;
      let country = parseInt(document.getElementById("country").value);
      let state = parseInt(document.getElementById("state").value);
      let expire_days = parseInt(document.getElementById("expire_days").value,10);
      const self = this;
      if (this.UpdateValidateform(name,organization,mobile_no, email, password,file, users,country,state,expire_days)) {
        const date = new Date(); 
        date.setDate(date.getDate() + expire_days);
        const expire_date = date.toLocaleDateString();
        const getRequest = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName).get(id);
        getRequest.onsuccess = (event) => {
          const item = event.target.result;
          let image = item.image;
          function saveData(){ 
            const request = self.db.transaction(self.storeName, "readwrite").objectStore(self.storeName).put({ id,name,organization,mobile_no, email, password,image, users,country,state,expire_date });
            request.onsuccess = () => { alert("Updated Successfully");
              self.display(); self.clearForm(); self.close_form()} }

          if(file){
            const reader = new FileReader();
            reader.onload = () => {image = reader.result; saveData()};
            reader.readAsDataURL(file)}
            else{saveData()}}}}
    deleteUser(id) {  const request = this.db.transaction(this.storeName, "readwrite").objectStore(this.storeName).delete(id); request.onsuccess = () => this.display()}
    clearForm() {
      ['name', 'organization', 'mobile_no', 'email', 'pass', 'file', 'users', 'country', 'state', 'expire_days'].forEach(id => document.getElementById(id).value = '');    
      delete document.getElementById("name").dataset.id;
      document.getElementById("btn").innerHTML=`
      <button onclick="user.addUser()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700"
       value="Register" >Register</button>`; } }
  const user = new Organization("CRUD_Details_Database", "User_details");