const params = new URLSearchParams(window.location.search);

const inputFrom = document.getElementById('from')
const inputTo = document.getElementById('to')

let waypoints = [];

if (params.has('from') && params.has('to')) {
    const from = params.get('from');
    const to = params.get('to');
    const fromSplit = from.split(',');
    const toSplit = to.split(',');

    inputFrom.value = from;
    inputTo.value = to;

    waypoints.push(
        L.latLng(
            Number(fromSplit[0]),
            Number(fromSplit[1])
        )
    );

    waypoints.push(
        L.latLng(
            Number(toSplit[0]),
            Number(toSplit[1])
        )
    );
}

let map = L.map('map')
    .setView([46.8131873, 8.224119], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const token = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjZkY2RiNzA0ZWRhNDQwNDBiMWY2NjZhMGQxNGFlYWZkIiwiaCI6Im11cm11cjY0In0='

L.Routing.control({
    router: new L.Routing.OpenRouteService(token, {
        timeout: 30 * 1000
    }),
}).addTo(map);
