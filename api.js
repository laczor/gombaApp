export function Api(dbPromise){

    function getLocationsForMonth(month) {
        return dbPromise.then((db) => {
            const tx = db.transaction('locations', 'readonly');
            const store = tx.objectStore('locations');

            // Get the start and end dates for the month
            const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
            const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

            // Define a range for the dates in the month
            const range = IDBKeyRange.bound(startDate, endDate);

            // Create an index on the date field and use it to retrieve the data for the month
            const index = store.index('date');
            const request = index.getAll(range);

            return new Promise((resolve, reject) => {
                request.onerror = () => {
                    reject(request.error);
                };

                request.onsuccess = () => {
                    resolve(request.result);
                };
            });
        });
    }

    function getLocationsByName(name) {

        return dbPromise.then((db) => {
            const tx = db.transaction('locations', 'readonly');
            const store = tx.objectStore('locations');

            // Define a range for the name
            const range = IDBKeyRange.only(name);

            // Create an index on the name field and use it to retrieve the data
            const index = store.index('name');
            const request = index.getAll(range);

            return new Promise((resolve, reject) => {
            request.onerror = () => {
                reject(request.error);
            };

            request.onsuccess = () => {
                resolve(request.result);
            };
            });
        });
    }

    function saveLocation(location) {
        return new Promise((resolve, reject) => {
            dbPromise.then((db) => {
            const tx = db.transaction('locations', 'readwrite');
            const store = tx.objectStore('locations');
            store.put(location);
            tx.oncomplete = () => {
                resolve(location);
            };
            tx.onerror = () => {
                reject('Error saving location to indexedDB');
            };
            });
        });
    }

    function deleteLocation(id) {
        return new Promise((resolve, reject) => {
          dbPromise.then((db) => {
            const tx = db.transaction('locations', 'readwrite');
            const store = tx.objectStore('locations');
            const request = store.delete(id);
            request.onsuccess = () => {
              resolve();
            };
            request.onerror = () => {
              reject(request.error);
            };
          });
        });
      }

      function getAllLocations() {
        return new Promise((resolve, reject) => {
          dbPromise.then((db) => {
            const tx = db.transaction('locations', 'readonly');
            const store = tx.objectStore('locations');
            const request = store.getAll();
            request.onsuccess = () => {
              resolve(request.result);
            };
            request.onerror = () => {
              reject(request.error);
            };
          });
        });
      }

    return {
        saveLocation,
        deleteLocation,
        getAllLocations,
        getLocationsForMonth,
        getLocationsByName,
    };

};
