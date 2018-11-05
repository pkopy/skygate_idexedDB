

const dataBase = {}

  dataBase.dbName = "forms";
  dataBase.db = {};
  dataBase.data = []
  dataBase.openDB = () => {
    let req = indexedDB.open(dataBase.dbName, 2);
    return new Promise((res) => {
      req.onsuccess = function (evt) {
        dataBase.db = this.result;
        console.log("openDb DONE");
        let tx = dataBase.db.transaction(['form'])
        let objStore = tx.objectStore('form');
        let req1 = objStore.getAll()
        req1.onsuccess = (e) => {
          res(req1.result)
        }
        
        req.onupgradeneeded = (evt) => {
          
          var objectStore = evt.currentTarget.result.createObjectStore("form", { autoIncrement : true })
          // objectStore.createIndex("name", "name", { unique: false });
          // objectStore.createIndex("email", "email", { unique: true });
        
        }
      };

    })
  }
  
  dataBase.getObjectStore = (store_name, mode) => {
    let tx = dataBase.db.transaction(store_name, mode);
    return tx.objectStore(store_name);
  }

  dataBase.get = () => {
    let tx = dataBase.db.transaction(['form'])
    let objStore = tx.objectStore('form');

    console.log(objStore)
    let req = objStore.getAll()
    return  new Promise((res) => {
      req.onsuccess = (evt) => {
        res(req.result)
      }
    })
  }

  // dataBase.getAll = 
 
  dataBase.add = (obj) => {
    const cust = { ssn: "444-44-4441", name: "Billpx", age: 35, email: "bxxxillix@compakny.com" };
    var store = dataBase.getObjectStore("form", "readwrite");
    var req;
    try {
      req = store.add(obj)
  
    } catch (e) {
      console.log(e)
      throw e
    }
  
    req.onsuccess = function (evt) {
      // console.log("Insertion in DB successful");
      
      // console.log(store);
    };
    req.onerror = function() {
      console.error("addPublication error", this.error);
      alert(this.error);
    };
  }
  
  module.exports = dataBase;

