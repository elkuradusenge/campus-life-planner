import { load, save } from "./storage.js";
import { validateRecord } from "./utils.js";


const VISIT_KEY = "planner:firstVisit";
let events = load();
const isFirstVisit = !localStorage.getItem(VISIT_KEY);

async function initEvents() {
  if (isFirstVisit) {
    try {
      const res = await fetch("./data.json");
      if (!res.ok) throw new Error("Failed to load seed data");
      const raw = await res.json();
      const validRecords = (Array.isArray(raw) ? raw : []).filter(validateRecord);
      if (validRecords.length > 0) {
        events = validRecords;
        save(events);
      }
    } catch { }
    localStorage.setItem(VISIT_KEY, "true");
  }
}

await initEvents();

export const state = {
  events,
  isFirstVisit,

  addEvent(event) {
    this.events.push(event);
    save(this.events);
  },

  updateEvent(updated) {
    this.events = this.events.map(e => (e.id === updated.id ? updated : e));
    save(this.events);
  },

  deleteEvent(id) {
    this.events = this.events.filter(e => e.id !== id);
    save(this.events);
  },

  async resetToDefault() {
    try {
      const res = await fetch("./data.json");
      if (!res.ok) throw new Error();
      const raw = await res.json();
      const validRecords = (Array.isArray(raw) ? raw : []).filter(validateRecord);
      this.events = validRecords;
      save(this.events);
    } catch {
      // silent fail
    }
  }
};
