import { OfflineMap } from "domain";

export function OfflineMaps({ api, map }) {
    let rectangles = [];

    function drawOfflineMap(params) {
        let points = [];
        map.on('click', handleMapClick);

        function handleMapClick(e) {
            points.push(e.latlng);
            if (points.length === 2) {
                addRectangle(points);
                map.off('click', handleMapClick)
            }
        }

    }

    function addRectangle(coords) {
        var rectangle = L.rectangle(coords, { color: "blue", weight: 1 }).addTo(map);
        var offlineMap = OfflineMap({...rectangle.getBounds()})
        rectangle.id = offlineMap.id;
        rectangles.push(rectangle);
        api.saveOfflineMap(offlineMap)

        rectangle.on('click', function (e) {
            showRectanglePopup(rectangle);
        });
    }

    async function deleteOfflineMap(id) {
        let confirmAction = confirm('Biztos törlöd a következőt a terkepet?');
        if (confirmAction) {
            try {
                await api.deleteOfflineMap(id);
                removeOfflineMapFromLayer(id);
            } catch (error) {
                alert("Nem tudtam törölni");

            }
        }
    }

    function removeOfflineMapFromLayer(id) {
        const mapToBeDeleted = rectangles.find((rectangle) => {
            return rectangle.id === id;
        });
        if(mapToBeDeleted){
            map.removeLayer(mapToBeDeleted);
        }
    }

    function showOfflineMaps(params) {

    }

    function showRectanglePopup(rectangle) {
        var bounds = rectangle.getBounds();
        var popupContent = `
            <p>Coordinates: ${bounds.getSouthWest().toString()} to ${bounds.getNorthEast().toString()}</p>
            <button class="button" onClick="deleteOfflineMap('${rectangle.id}')">Törlés</button>
        `;
        rectangle.bindPopup(popupContent).openPopup();
    }

    return {
        drawOfflineMap,
        deleteOfflineMap
    }
}