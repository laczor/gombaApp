import { LOCATIONS_STORE, OFFLINE_MAPS_STORE } from "db";
import { IDBHelper } from "idbHelper";


export function Api({ locationsDbPromise, offlineMapsDbPromise, }){
    let LocationsIDB = IDBHelper(locationsDbPromise);
    let OfflineMapsIDB = IDBHelper(offlineMapsDbPromise);

    function getLocationsForMonth(month) {
        return dbPromise.then((db) => {
          const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
          const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
          const keyRange = IDBKeyRange.bound(startDate, endDate);
          return LocationsIDB.getByIndex(LOCATIONS_STORE, 'date', keyRange);
        });
    }

    function getLocationsByName(name) {
      const keyRange = IDBKeyRange.only(name);
      return LocationsIDB.getByIndex(LOCATIONS_STORE, 'name', keyRange);
    }

    function saveLocation(location) {
      return LocationsIDB.saveObject(LOCATIONS_STORE, location)
    }

    function deleteLocation(id) {
      return LocationsIDB.deleteObject(LOCATIONS_STORE, id)
    }

    function getAllLocations() {
      return LocationsIDB.getAll(LOCATIONS_STORE)
    }

    function saveOfflineMap(map) {
      return OfflineMapsIDB.saveObject(OFFLINE_MAPS_STORE, map)
    }

    function deleteOfflineMap(id) {
      return OfflineMapsIDB.deleteObject(OFFLINE_MAPS_STORE, id)
    }

    return {
        saveLocation,
        deleteLocation,
        getAllLocations,
        getLocationsForMonth,
        getLocationsByName,
        saveOfflineMap,
        deleteOfflineMap
    };

};
