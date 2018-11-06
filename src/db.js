

const dataBase = {}

  dataBase.dbName = "forms";
  dataBase.db = {};
  dataBase.data = []
  dataBase.openDB = (() => {
    let req = indexedDB.open(dataBase.dbName, 2);
    console.log(req)
    // if(req) {
      
        req.onsuccess = function (evt) {
          dataBase.db = this.result;
          console.log("openDb DONE");
          // let tx = dataBase.db.transaction(['form'])
          // let objStore = tx.objectStore('form');
          // let req1 = objStore.getAll()
          // return new Promise ((res) =>{
          //   req1.onsuccess = (e) => {
          //     res(req1.result)
          //   }

          // })
          dataBase.data = dataBase.get()
          
          
        };
        
        req.onupgradeneeded = (evt) => {
        
          var objectStore = evt.currentTarget.result.createObjectStore("form", { keyPath : "token" })
          // objectStore.createIndex("token", "token", { unique: false });
          // objectStore.createIndex("email", "email", { unique: true });
        
        }
      

    // }else {
    //   req.onsuccess = function(evt) {
    //     dataBase.db = this.result; 
    //     console.log("openDb DONE");
    //   }
    //   req.onupgradeneeded = (evt) => {
        
    //     var objectStore = evt.currentTarget.result.createObjectStore("form", { keyPath : "token" })
    //     // objectStore.createIndex("token", "token", { unique: false });
    //     // objectStore.createIndex("email", "email", { unique: true });
      
    //   }
    // }
  })()
  
  dataBase.getObjectStore = (store_name, mode) => {
    let tx = dataBase.db.transaction(store_name, mode);
    return tx.objectStore(store_name);
  }
  dataBase.getAll = () => {
    return new Promise((res) => {
      if(dataBase.data.length > 0)
     res(dataBase.data )
      
    })
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

  dataBase.delete = (token) => {
    let req = dataBase.db.transaction(['form'], "readwrite")
    .objectStore('form')
    .delete(token)
    req.onsuccess = (e) => {
      console.log('delete')
    }
    
    
    
  }

  // dataBase.getAll = 
 
  dataBase.add = (obj) => {
    
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

