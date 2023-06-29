function downloadJSON(data, filename) {
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], { type: 'application/json' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = filename || 'data.json';
    a.click();

    // Cleanup
    setTimeout(function() {
        URL.revokeObjectURL(url);
        a.remove();
    }, 0);
}

export function exportData({ getData }) {
    return async () => {
        try {
            const data = await getData();
            const currentDate = new Date(Date.now())
            downloadJSON(data, `gomba-helyek-${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDay()}`)
        } catch (error) {
            alert(error)
        }
    }
}