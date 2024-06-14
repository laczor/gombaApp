export function IDBHelper(dbPromise) {
    function getObjectStore(storeName, mode = 'readonly') {
        return dbPromise.then(db => {
            const tx = db.transaction(storeName, mode);
            return tx.objectStore(storeName);
        });
    }

    function getByIndex(storeName, indexName, keyRange) {
        return getObjectStore(storeName)
            .then(store => {
                const index = store.index(indexName);
                const request = index.getAll(keyRange);
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

    function getAll(storeName) {
        return getObjectStore(storeName)
            .then(store => {
                const request = store.getAll();
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

    function saveObject(storeName, object) {
        return dbPromise.then(db => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                const request = store.put(object);
                tx.oncomplete = () => {
                    resolve(object);
                };
                tx.onerror = () => {
                    reject('Error saving object to IndexedDB');
                };
            });
        });
    }

    function deleteObject(storeName, id) {
        return dbPromise.then(db => {
            return new Promise((resolve, reject) => {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
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

    return {
        saveObject,
        deleteObject,
        getAll,
        getByIndex,
        // Specific methods like getLocationsForMonth and getLocationsByName can be added as needed
        getLocationsForMonth: (month) => {
            const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
            const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
            const keyRange = IDBKeyRange.bound(startDate, endDate);
            return getByIndex('locations', 'date', keyRange);
        },
        getLocationsByName: (name) => {
            const keyRange = IDBKeyRange.only(name);
            return getByIndex('locations', 'name', keyRange);
        },
    };
}
