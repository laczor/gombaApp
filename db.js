export const LOCATIONS_VERSION = 1;
// Open the indexedDB and create an object store for locations
export const dbPromise = new Promise((resolve, reject) => {
    const request = window.indexedDB.open('locations', LOCATIONS_VERSION);

    request.onerror = () => {
        reject(request.error);
    };

    request.onsuccess = () => {
        resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('locations', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
    };
});


