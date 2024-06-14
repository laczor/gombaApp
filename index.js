import { locationsDbPromise, offlineMapsDbPromise } from 'db'
import { Api } from 'api';
import { Map } from 'map';
import { OfflineMaps } from 'offlineMaps';
import { isLocation } from 'domain';
import { Markers } from 'markers';
import { mushrooms } from 'mushrooms';

import { SaveLocationModal } from 'save-location-form'
import { AddLocationsMenu } from 'add-locations-menu'
import { FilterModal } from 'filter-modal';
import { exportData } from 'export'
import { importData } from 'import'
import { Icon } from 'icon'

const api = Api({ locationsDbPromise, offlineMapsDbPromise});
const { map } = Map(L);
map.locateAndMarkCurrentPosition();
const markers = Markers({ api, map, Icon })
const offlineMaps = OfflineMaps({ api, map })


const saveLocationModal = SaveLocationModal({ api, modalElement: ADD_CURRENT_LOCATION_MODAL, addMarker: markers.addMarker, closeMarker: markers.closeMarker, getMarkers: markers.getMarkers, mushrooms });
saveLocationModal.render();
const filterModal = FilterModal({ markers, filterModalElement: FILTER_MODAL })
filterModal.render();

AddLocationsMenu(
    {
        menuElement: ADD_LOCATIONS_MENU,
        openModal: saveLocationModal.openModal,
        openFilterModal: filterModal.openModal,
        map,
        exportData: exportData({ getData: api.getAllLocations}),
        importData: importData({saveData: api.saveLocation, validator: isLocation}),
        offlineMaps,
}).render();

window.deleteMarker = markers.deleteMarker;
window.deleteOfflineMap = offlineMaps.deleteOfflineMap;
window.opeSaveLocationModal = saveLocationModal.openModal;

api.getAllLocations().then((locations) => {
        const locs = locations.filter((loc) => isLocation(loc) === true ? true : false);
        locs.map(markers.addMarker);
});