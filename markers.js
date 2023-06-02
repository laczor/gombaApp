export function Markers({ api, map }) {
    let markers = [];

    function addMarker({lat,lng, name, id}) {
        var marker = L.marker([lat, lng]).addTo(map);
        markers.push(marker);
        marker.bindPopup(`<div>${name}</div><br><button onClick="deleteMarker(${id})">Delete</button>`);
    }

    return {
        addMarker,
    }

}