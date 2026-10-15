let usersDatabase = [
    { id: "USR-01", username: "admin", passHash: "admin123", fullname: "Главный Администратор", role: "Администратор" },
    { id: "USR-02", username: "engineer", passHash: "beeline2026", fullname: "Инженер Сети Андижан", role: "Инженер Сети" }
];

let currentUser = null;
const BEELINE_OFFICE = { id: "OFFICE-AND-MAIN", name: "Главный Офис Beeline Андижан", lat: 40.78210, lng: 72.34420 };

let towersData = [
    { "id": "BS-AND-01", "name": "БС Центр Бабур", "district": "Центр, пр-т Бабура", "lat": 40.7852, "lng": 72.3490, "radius": 950, "status": "Active", "tech": "LTE / 5G" },
    { "id": "BS-AND-02", "name": "БС Старый Город", "district": "Старый город", "lat": 40.7715, "lng": 72.3580, "radius": 1100, "status": "Active", "tech": "4G LTE" }
];

let map;

window.addEventListener('DOMContentLoaded', () => {
    initAuthEvents();
    initMap();
    renderTowerSidebarList();
});

function initAuthEvents() {
    const loginForm = document.getElementById("form-login");
    loginForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        const uVal = document.getElementById("login-username").value.trim();
        const pVal = document.getElementById("login-password").value.trim();
        const user = usersDatabase.find(u => u.username.toLowerCase() === uVal.toLowerCase() && u.passHash === pVal);
        if (user) {
            currentUser = user;
            document.getElementById("auth-overlay").classList.add("hidden");
            document.getElementById("user-profile-bar").classList.remove("hidden");
            document.getElementById("current-user-name").textContent = user.fullname;
            document.getElementById("current-user-role").textContent = user.role;
        }
    });
}

function initMap() {
    map = L.map('map').setView([BEELINE_OFFICE.lat, BEELINE_OFFICE.lng], 13);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri'
    }).addTo(map);

    L.marker([BEELINE_OFFICE.lat, BEELINE_OFFICE.lng]).addTo(map).bindPopup("<b>Главный Офис Beeline</b>");
}

function renderTowerSidebarList() {
    const container = document.getElementById("tower-list-container");
    if (!container) return;
    container.innerHTML = towersData.map(t => `
        <div class="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <span class="font-mono text-xs font-bold text-amber-400">${t.id}</span>
            <h4 class="text-xs font-bold text-white">${t.name}</h4>
        </div>
    `).join("");
}