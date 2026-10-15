const BEELINE_OFFICE = {
    id: "OFFICE-AND-MAIN",
    name: "Главный Офис Beeline Андижан",
    lat: 40.78210,
    lng: 72.34420,
    address: "проспект Бабура, 24, Андижан"
};

let map;
let currentTileLayer = null;
let routingControl = null;
let towersData = [];
let markersMap = new Map();

const tileProviders = {
    esriStreet: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', attribution: '© Esri' },
    esriSatellite: { url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', attribution: '© Esri' },
    osmStandard: { url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '© OpenStreetMap' }
};

window.addEventListener('DOMContentLoaded', async () => {
    initMap();
    try {
        const res = await fetch('data.json');
        towersData = await res.json();
    } catch(e) {
        console.warn("Using inline fallback");
    }
    renderTowers();
});

function initMap() {
    map = L.map('map', { zoomControl: false }).setView([BEELINE_OFFICE.lat, BEELINE_OFFICE.lng], 13);
    L.tileLayer(tileProviders.esriStreet.url).addTo(map);
    L.marker([BEELINE_OFFICE.lat, BEELINE_OFFICE.lng]).addTo(map).bindPopup("Штаб-квартира Beeline");
}

function renderTowers() {
    towersData.forEach(t => {
        L.marker([t.lat, t.lng]).addTo(map).bindPopup("<b>" + t.name + "</b><br>" + t.district);
    });
}