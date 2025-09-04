const routeForm = document.getElementById("route");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("from");

fromInput.addEventListener("input", (event) => {

});

toInput.addEventListener("input", (event) => {

});

routeForm.addEventListener("submit", event => {
    // calculate Route
    event.preventDefault();
});

let map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const token = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjZkY2RiNzA0ZWRhNDQwNDBiMWY2NjZhMGQxNGFlYWZkIiwiaCI6Im11cm11cjY0In0='
function calulateRoute(start, end) {
    let url = 'https://api.openrouteservice.org/v2/directions/foot-walking'
    url += '?api_key=' + api
    url += '&start=' + start;
    url += '&end=' + end;

    fetch(url , {
        headers: {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8',
        }
    })
    .then(response => {

    })
    .catch(error => {

    });
}
