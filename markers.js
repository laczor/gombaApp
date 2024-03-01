export function Markers({ api, map, Icon }) {
    let markers = [];

    function addMarker({lat,lng, name, id, date, month, icon}) {
        var marker = L.marker([lat, lng], { icon: Icon(icon)}).addTo(map);
        markers.push(marker);
        marker.location_id = id;
        marker.name = name;
        marker.icon = Icon(icon)
        marker.date = date;
        marker.month = month;
        console.log(marker.icon)
        marker.bindPopup(`
        <div><strong class="marker_name">${name}</strong></div><br>
        <figure class="marker_image image">
         <img src="${marker.icon.options.iconUrl}" >
        </figure>
        <div class="buttons">
            <button class="button" onClick="opeSaveLocationModal({coordinatesData: { lng: ${lng }, lat:${lat} }, name:'${name}', id: ${id}})">Módósít</button><br>
            <button class="button" onClick="deleteMarker({id: ${id}, 'name': '${name}'})">Törlés</button>
        </div>
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