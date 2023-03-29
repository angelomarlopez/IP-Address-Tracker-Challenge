let apiURL = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_aaNbMFLhbvuzk7b2X1rqm93mY1LUU&ipAddress=';

const ipButton = document.getElementById('ip-btn');
const ipValue = document.getElementById('ip-value');

const ipAddress = document.getElementById('ip-address');
const locationEl = document.getElementById('location');
const timezone = document.getElementById('timezone');
const isp = document.getElementById('isp');

const get_ip_location = async (ip) => {
    const res = await fetch(apiURL+ip, {
        method:"GET",
        header: {
            "Content-Type": "application/json",
        }
    });
    return res.json();
};

const set_map_location = (x, y) => {
    const customIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
    
        iconSize:     [38, 38],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    });

    var map = L.map('map').setView([x, y], 13);
    L.marker([x, y], {icon: customIcon}).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

ipButton.addEventListener('click', e => {
    e.preventDefault();

    get_ip_location(ipValue.value)
    .then(data => {
        ipAddress.innerText = data.ip;
        locationEl.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
        timezone.innerText = `UTC ${data.location.timezone}`;
        isp.innerText = data.isp;

        set_map_location(data.location.lat, data.location.lng);
    })
    .catch( err => {
        console.log(err);
    });
});