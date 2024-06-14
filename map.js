
export function Map(L) {
    let map = L.map('map');
    let currentPosition;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    function locateAndMarkCurrentPosition() {
        locatePosition(markCurrentPosition)
    }

    function locatePosition(cb) {
        map.locate({ setView: true, enableHighAccuracy: true });

        function onLocationFound(e) {
            map.setView(e.latlng, 17); // Set zoom level 15 as an example
            if(cb) {
                cb(e)
            }
        }
        map.on('locationfound', onLocationFound);
    }

    function markCurrentPosition(e) {
        if(currentPosition) { map.removeLayer(currentPosition)}
        currentPosition =  L.circle(e.latlng, 3).addTo(map);
    }

    function AddMarker({lat, lng}) {
        L.marker([lat, lng]).addTo(map);

    }

    map.AddMarker = AddMarker;
    map.locatePosition = locatePosition;
    map.markCurrentPosition = markCurrentPosition;
    map.locateAndMarkCurrentPosition = locateAndMarkCurrentPosition;

    return {
        map,
    }

}