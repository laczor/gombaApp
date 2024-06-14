export const LOCATIONS_VERSION = 1;
export const LOCATIONS_STORE = 'locations'
export const OFFLINE_MAPS_VERSION = 1;
export const OFFLINE_MAPS_STORE = 'offline-maps'
// Open the indexedDB and create an object store for locations

export const locationsDbPromise = createIDBPromise(LOCATIONS_STORE, LOCATIONS_VERSION)
export const offlineMapsDbPromise = createIDBPromise(OFFLINE_MAPS_STORE, OFFLINE_MAPS_VERSION, false)

function createIDBPromise(store_name, version, autoIncrement = true) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(store_name, version);

        request.onerror = () => {
            reject(request.error);
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const objectStore = db.createObjectStore(store_name, { keyPath: 'id', autoIncrement });
            objectStore.createIndex('name', 'name', { unique: false });
        };
    });
}