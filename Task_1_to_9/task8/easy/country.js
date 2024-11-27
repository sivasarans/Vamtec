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

class Country extends IndexedDB{
    constructor(dbName, storeName,version_no) {
        super(dbName,storeName,version_no);
      
    }
    display(){
      this.displayItems();
    }
    displayItems() {
      const transaction = this.db.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();
  
      request.onsuccess = (event) => {
        const itemList = document.getElementById("country_list");
        itemList.innerHTML = `<tr>
      <th class="border-2 border-gray-300 px-4 py-2">ID</th>
      <th class="border-2 border-gray-300 px-4 py-2">Country</th>
      <th class="border-2 border-gray-300 px-4 py-2">Edit</th>
      <th class="border-2 border-gray-300 px-4 py-2">Delete</th>
    </tr>`;
  
        event.target.result.forEach((item) => {
          const  row = document.createElement("tr");
           row.innerHTML = `
            <td class="border-2 border-gray-300 px-4 py-2">${item.id}</td>
            <td class="border-2 border-gray-300 px-4 py-2">${item.country}</td>
            <td class="border-2 border-gray-300 px-4 py-2"><button class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" onclick="country.editCountry(${item.id})">Edit</button></td>
            <td class="border-2 border-gray-300 px-4 py-2"><button class="text-white bg-red-500 w-full py-2 text-lg rounded hover:bg-red-700" onclick="country.deleteCountry(${item.id})">Delete</button></td>
          `;
          itemList.appendChild(row);
        });
      };
    }

    addCountry(){
        let country = document.getElementById("country").value;
        console.log(country);
        if (country) {
            const transaction = this.db.transaction(this.storeName, "readwrite");
            const store = transaction.objectStore(this.storeName);
            const request = store.add({ country });
      
            request.onsuccess = () => {
              alert("Added Successfully");
              this.displayItems();
              this.clearForm();
          }
        }
        else{
            alert("Country must be filled out");
        }
    }

    editCountry(id) {
        const transaction = this.db.transaction(this.storeName, "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(id);
    
        request.onsuccess = (event) => {
          const item = event.target.result;
          document.getElementById("country").value = item.country;
          document.getElementById("country").dataset.id = id;
          document.getElementById("btn").innerHTML=`
          <button onclick="country.updateCountry()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" value="Register" >Update</button>
          `
        };
      }
    
      
      updateCountry() {
        const id = parseInt(document.getElementById("country").dataset.id);
        const country = document.getElementById("country").value;
        if (country) {
          const transaction = this.db.transaction(this.storeName, "readwrite");
          const store = transaction.objectStore(this.storeName);
          const request = store.put({ id, country });
    
          request.onsuccess = () => {
            alert("Updated Successfully");
            this.displayItems();
            this.clearForm();
          };
        } 
        else{
            alert("Country must be filled out");
        }
      }
    

    deleteCountry(id) {
        const transaction = this.db.transaction(this.storeName, "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.delete(id);
    
        request.onsuccess = () => this.displayItems();
      }

    clearForm() {
        document.getElementById("country").value = '';
        delete document.getElementById("country").dataset.id;
        document.getElementById("btn").innerHTML=`
        <button onclick="country.addCountry()" class="text-white bg-green-500 w-full py-2 text-lg rounded hover:bg-green-700" >Add Country</button>`;
      }

  }

   const country = new Country("Database2", "ee",11);

  