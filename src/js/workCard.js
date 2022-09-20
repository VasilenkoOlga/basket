let geo_lat = 60.031841;
let geo_lon = 30.429083;

var map = L.map('map').setView([geo_lat, geo_lon], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var marker = L.marker([geo_lat, geo_lon],
  {alt: 'Delivery address'}).addTo(map);
