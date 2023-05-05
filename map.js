
export function Map(L) {
    let map = L.map('map').setView([32.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    function markInitialLocation() {
        var marker = L.marker([51.5, -0.09]).addTo(map);
        map.locate({setView: true, enableHighAccuracy: true });

        function onLocationFound(e) {
            L.circle(e.latlng, 3).addTo(map);
        }
        map.on('locationfound', onLocationFound);

        return {
            marker,
            onLocationFound,

        }
    }
    function AddMarker({lat, lng}) {
        L.marker([lat, lng]).addTo(map);

    }

    map.AddMarker = AddMarker;
    map.markInitialLocation = markInitialLocation;

    return {
        map,
    }

}