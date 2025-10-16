import { state } from "./state.js";
import { showToast } from "./utils.js";

/* -----------------------------
   GLOBALS & SHARED UTILITIES
------------------------------*/

// Keys
const SETTINGS_KEY = "planner:settings";
const DATA_KEY = "planner:data";

export const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");

if (!settings.unit) settings.unit = "minutes";
if (!settings.theme) settings.theme = "light";
if (!settings.maxEvents) settings.maxEvents = null;


applyTheme(settings.theme);

export function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function applyTheme(theme) {
    document.body.classList.toggle("dark-theme", theme === "dark");
    document.body.classList.toggle("light-theme", theme === "light");
}

/* -----------------------------
   DASHBOARD (INDEX PAGE)
------------------------------*/

const upcomingList = document.getElementById("upcomingList");
const totalEvents = document.getElementById("totalEvents");
const totalDuration = document.getElementById("totalDuration");
const topTag = document.getElementById("topTag");
const trendChart = document.getElementById("trendChart");

export function renderUpcoming() {
    const now = new Date();
    const upcoming = state.events
        .filter(e => new Date(e.dueDate) >= now)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);

    upcomingList.innerHTML = upcoming.length
        ? upcoming.map(e => `<li><strong>${e.title}</strong> – ${e.dueDate}</li>`).join("")
        : "<li>No upcoming events.</li>";
}

export function renderStats() {
    totalEvents.textContent = state.events.length;
    totalDuration.textContent = state.events.reduce((sum, e) => sum + Number(e.duration), 0);

    const tagCount = {};
    state.events.forEach(e => tagCount[e.tag] = (tagCount[e.tag] || 0) + 1);
    const top = Object.entries(tagCount).sort((a, b) => b[1] - a[1])[0];
    topTag.textContent = top ? top[0] : "N/A";

    renderTrend();
}

export function renderTrend() {
    const days = Array(7).fill(0);
    const now = new Date();

    state.events.forEach(e => {
        const diff = Math.floor((now - new Date(e.dueDate)) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff < 7) days[6 - diff]++;
    });

    trendChart.innerHTML = days
        .map(count => `<div class="bar" style="height:${count * 20}px"></div>`)
        .join("");
}

/* -----------------------------
   SETTINGS (SETTINGS PAGE)
------------------------------*/

const unitSelect = document.getElementById("unitSelect");
const maxEventsInput = document.getElementById("maxEvents");
const themeSelect = document.getElementById("themeSelect");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");
const clearBtn = document.getElementById("clearBtn");

if (unitSelect && maxEventsInput && themeSelect) {

    unitSelect.value = settings.unit;
    maxEventsInput.value = settings.maxEvents || "";
    themeSelect.value = settings.theme;

    const updateAndSave = () => {
        settings.unit = unitSelect.value;
        settings.maxEvents = Number(maxEventsInput.value) || null;
        settings.theme = themeSelect.value || "light";
        saveSettings();
        applyTheme(settings.theme);
        showToast("Settings updated successfully", "success");
    };

    unitSelect.addEventListener("change", updateAndSave);
    maxEventsInput.addEventListener("change", updateAndSave);
    themeSelect.addEventListener("change", updateAndSave);
}

// Export
if (exportBtn) {
    exportBtn.addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(state.events, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "campus-events.json";
        a.click();
    });
}

// Import
if (importBtn && importFile) {
    importBtn.addEventListener("click", () => importFile.click());
    importFile.addEventListener("change", e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result);
                if (!Array.isArray(data)) throw new Error("Invalid file format");
                state.events = data;
                localStorage.setItem(DATA_KEY, JSON.stringify(data));
                showToast(`Data imported successfully`, "success");
            } catch {
                showToast(`SOmething went wrong while reading file`, "error");
            }
        };
        reader.readAsText(file);
    });
}

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all events?")) {
            localStorage.removeItem(DATA_KEY);
            state.events = [];
            showToast(`All events cleared successfully`, "success");
        }
    });
}


if (upcomingList && totalEvents && trendChart) {
    renderUpcoming();
    renderStats();
}
