export function Markers({ api, map }) {
    let markers = [];

    function addMarker({lat,lng, name, id, date, month}) {
        var marker = L.marker([lat, lng]).addTo(map);
        markers.push(marker);
        marker.location_id = id;
        marker.name = name;
        marker.date = date;
        marker.month = month;
        marker.bindPopup(`
        <div>${name}</div><br>
        <button onClick="opeSaveLocationModal({coordinatesData: { lng: ${lng }, lat:${lat} }, name:'${name}', id: ${id}})">Módósít</button><br>
        <button onClick="deleteMarker({id: ${id}, 'name': '${name}'})">Törlés</button>
        `);
    }

    function closeMarker(id) {
        const markerIndex = markers.findIndex(marker => marker.location_id === id);
        if(markerIndex !==-1){
            markers[markerIndex].closePopup();
        }
    }

    async function deleteMarker({name, id}) {
        let confirmAction = confirm(`Biztos törlöd a következőt? \n ${name}`);
        if (confirmAction) {
            try {
                await api.deleteLocation(id);
                const markerToBeDeleted = markers.find((marker) => {
                    return marker.location_id === id;
                });
                if(markerToBeDeleted){
                    map.removeLayer(markerToBeDeleted);
                }
            } catch (error) {
                alert("Nem tudtam törölni");

            }
        }
    }

    function filter(filters) {
        markers.forEach((marker) => {
            map.addLayer(marker);
            for (let index = 0; index < filters.length; index++) {
                const filter = filters[index];
                if(!filter(marker)) {
                    map.removeLayer(marker);
                }
            }
        })

    }

    function getMarkers() {
        return [...markers];
    }

    return {
        addMarker,
        closeMarker,
        deleteMarker,
        filter,
        getMarkers,
    }

}