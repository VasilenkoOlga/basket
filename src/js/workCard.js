let geo_lat = 60.031841; //60.031841; начальные координаты
let geo_lon =40.429083; //30.429083;
let map = null;
let marker = null;

map = L.map('map').setView([geo_lat, geo_lon], 13); // поиск контейнера для карты, задание начальных координатов и масштаба
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map); // добавление карту в контейнер для карты

marker = L.marker([geo_lat, geo_lon], //создание начальной метки с её координатами
{alt: 'Delivery address'}).addTo(map); // добавление начальной метки альтернативного текста и размещение метки на поле для карты


export let movingNewCoordinates = function (geo_lat, geo_lon){
  map.flyTo([geo_lat, geo_lon]);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
  }).addTo(map);

  if (marker) {
    map.removeLayer(marker) // удаление старого маркера
  }
  marker = new L.Marker([geo_lat, geo_lon], {alt: 'Delivery address'}).addTo(map); // добавление нового маркера на карту
}
