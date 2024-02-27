import { dbPromise } from 'db'
import { Api } from 'api';
import { Map } from 'map';
import { isLocation } from 'domain';
import { Markers } from 'markers';

import { SaveLocationModal } from 'save-location-form'
import { AddLocationsMenu } from 'add-locations-menu'
import { FilterModal } from 'filter-modal';
import { exportData } from 'export'
import { importData } from 'import'

const api = Api(dbPromise);
const { map } = Map(L);
map.markInitialLocation();
const markers = Markers({ api, map })


const saveLocationModal = SaveLocationModal({ api, modalElement: ADD_CURRENT_LOCATION_MODAL, addMarker: markers.addMarker, closeMarker: markers.closeMarker, getMarkers: markers.getMarkers });
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
}).render();

window.deleteMarker = markers.deleteMarker;
window.opeSaveLocationModal = saveLocationModal.openModal;

api.getAllLocations().then((locations) => {
        locations.map(markers.addMarker);
});