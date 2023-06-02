export function Markers({ api, map }) {
    let markers = [];

    function addMarker({lat,lng, name, id}) {
        var marker = L.marker([lat, lng]).addTo(map);
        console.log(marker)
        markers.push(marker);
        marker.location_id = id;
        marker.bindPopup(`<div>${name}</div><br><button onClick="deleteMarker({id: ${id}, 'name': '${name}'})">Delete</button>`);
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

    return {
        addMarker,
        deleteMarker,
    }

}