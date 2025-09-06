const token = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjZkY2RiNzA0ZWRhNDQwNDBiMWY2NjZhMGQxNGFlYWZkIiwiaCI6Im11cm11cjY0In0='

const params = new URLSearchParams(window.location.search);
const from = params.get('from');
const to = params.get('to');
const fromCord =  params.get('fromCord')
const toCord = params.get('toCord')

const inputFrom = document.getElementById('from')
const inputTo = document.getElementById('to')
const inputFromCord = document.getElementById('fromCord')
const inputToCord = document.getElementById('toCord')
inputFrom.value = from;
inputTo.value = to;
inputFromCord.value = fromCord;
inputToCord.value = toCord;

autocompleteElement(inputFrom, inputFromCord);
autocompleteElement(inputTo, inputToCord);

let map = L.map('map')
    .setView([46.8131873, 8.224119], 8);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

if (
    from && to
) {
    if (
        !fromCord && !toCord
    ) {
        Promise.all([
            search(from).then(json => json.features[0].geometry.coordinates),
            search(to).then(json => json.features[0].geometry.coordinates)
        ])
            .then(responseWaypoints => {
                const waypoints = [
                    L.latLng(
                        responseWaypoints[0][1],
                        responseWaypoints[0][0]
                    ),
                    L.latLng(
                        responseWaypoints[1][1],
                        responseWaypoints[1][0]
                    )
                ];

                L.Routing.control({
                    router: new L.Routing.OpenRouteService(token, { timeout: 30 * 1000 }),
                    router.options.urlParameters.language = 'de';
	            waypoints: waypoints,
                    show: true,
                    routeWhileDragging: false
                }).addTo(map);

                // Optional: Karte automatisch auf Route zoomen
                map.fitBounds(L.latLngBounds(waypoints));
            })
    } else {
        const fromSplit = fromCord.split(',');
        const toSplit = toCord.split(',');

        const waypoints = [
            L.latLng(
                fromSplit[1],
                fromSplit[0]
            ),
            L.latLng(
                toSplit[1],
                toSplit[0]
            )
        ];

        L.Routing.control({
            router: new L.Routing.OpenRouteService(token, { timeout: 30 * 1000 }),
            router.options.urlParameters.language = 'de';
            waypoints: waypoints,
            show: true,
            routeWhileDragging: false
        }).addTo(map);

        // Optional: Karte automatisch auf Route zoomen
        map.fitBounds(L.latLngBounds(waypoints));
    }
}

function autocompleteGeocodeAPI(text) {
    return fetch(`https://api.openrouteservice.org/geocode/autocomplete?text=${text}&api_key=${token}`, {
        mode: 'cors'
    })
        .catch(error => console.log(error))
        .then(response => response.json())
}

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function autocompleteElement(input, inputCord) {
    var currentFocus;
    input.addEventListener('input', debounce(event => {
        let val = input.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        let a = document.createElement("div");
        a.setAttribute("id", input.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        input.parentNode.appendChild(a);

        autocompleteGeocodeAPI(val)
            .then(json => {
                for (const feature of json.features) {
                    let b = document.createElement("div");
                    b.innerText += feature.properties.label;
                    b.dataset.value = feature.properties.label;
                    b.dataset.cord = feature.geometry.coordinates.join(',');
                    b.addEventListener("click", event => {
                        input.value = b.dataset.value;
                        inputCord.value = b.dataset.cord;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            });
    }));

    input.addEventListener("keydown", event => {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (event.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (event.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (event.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
