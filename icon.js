export function Icon(name = 'kucsma') {
    return L.icon({
        ...getIconData(name),
        // shadowSize:   [50, 64], // size of the shadow
        // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
}


function getIconData(name) {
    const iconUrl = `assets\/${name}.png`
    let iconSize;

    switch (name) {
        case 'geva':
            iconSize = [40, 30];
            break;
        case 'kucsma':
            iconSize = [40, 60];
            break;
        case 'varganya':
            iconSize = [40, 40];
            break;
        default:
            break;
    }

    return {
        iconUrl,
        iconSize
    }

}