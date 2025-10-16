# 🎓 Campus Life Planner

> A lightweight, theme-aware web app for managing and tracking campus events efficiently — designed and developed by **Elie Kuradusenge (@elkuradusenge)**.

---

## 🌍 Live Demo

**GitHub Pages Deployment:**  
🔗 [https://elkuradusenge.github.io/campus-life-planner/](https://elkuradusenge.github.io/campus-life-planner/)

**Demo Video (Unlisted):**  
🎥 [Watch demonstration](https://youtu.be/jd2e_4pHoNY)

---

## 🎨 Theme Reference

The color palette and component styles were inspired by my earlier learning project:  
👉 [Hotel Website Theme Reference](https://elijahladdie.github.io/Hotel/index.html)

### Theme Overview

| Mode | Background | Accent | Text | Notes |
|------|-------------|---------|------|-------|
| Light Theme | `#fafafa` | `#f7c08a` | `#222` | Clean, paper-like UI |
| Dark Theme  | `#1a1a1a` | `#f7c08a` | `#eee` | Low-glare for night use |

Theme switching is automatic and remembered using `localStorage`.

---

## ✨ Features

- 🧠 **Smart Event Management:** Add, edit, delete, and organize events seamlessly.  
- 🌗 **Light/Dark Theme:** Automatic and persistent across sessions.  
- 📦 **Import/Export:** JSON-based backup and restore of event data.  
- 🧹 **Data Validation:** All imported or seeded records are verified with regex before saving.  
- 🕒 **Real-Time Clock:** Shows hour, minute, second, and user browser information.  
- 🧾 **Analytics Section:** Displays total events, duration, and most frequent tag.  
- 🔄 **Seeding Logic:**  
  - Seeds from `data.json` **only once** on first visit.  
  - Prevents re-seeding if user deletes all data intentionally.  
- ⌨️ **Keyboard Navigation:** Full keyboard accessibility across forms and controls.  
- ✅ **A11y Compliant:** Proper heading hierarchy, focus visibility, and semantic HTML.

---

## 🧩 Regex Catalog

Below are the regex patterns used across validation logic and import checks:

| Field | Pattern | Description | Example Valid | Example Invalid |
|--------|----------|--------------|----------------|------------------|
| **title** | `/^\S(?:.*\S)?$/` | Prevents leading/trailing spaces | `"Campus Meetup"` | `"  My Event "` |
| **dueDate** | `/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/` | Validates ISO-style date (YYYY-MM-DD) | `"2025-10-21"` | `"21/10/25"` |
| **duration** | `/^(0|[1-9]\d*)(\.\d{1,2})?$/` | Allows integers or decimals (max 2 decimals) | `"3"`, `"2.5"` | `"3."`, `"-2"` |
| **tag** | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/` | Letters only, optional spaces/hyphens | `"Orientation Day"` | `"Freshman_Week"` |
| **duplicateWord** | `/\b(\w+)\s+\1\b/` | Detects repeated words in titles | `"Study Study"` | `"Study Group"` |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|---------|
| `Tab` | Move focus to next interactive element |
| `Enter` | Submit forms or confirm actions |
| `Esc` | Close modal or cancel dialog |
| `Ctrl + I` | Trigger **Import** dialog |
| `Ctrl + E` | Trigger **Export** dialog |
| `Ctrl + /` | Toggle **Theme** (Light/Dark) |
| `Arrow Keys` | Navigate list items or records |
| `Delete` | Delete selected event (with confirmation) |

Keyboard focus outlines are visible and color-adjusted for both themes.

## 🧠 State Logic Overview

- **Storage Persistence:**  
  Events are stored in `localStorage` via `storage.js`.
- **Initial Seeding:**  
  Occurs *only once* when the app detects first-time access (checked via `planner:firstVisit` flag).
- **Validation:**  
  All incoming data (from import or initial seed) is regex-validated before saving.
- **Silent Failures:**  
  If invalid data or a bad file is encountered, it is skipped quietly to protect UX.

## ♿ Accessibility (A11y) Notes

- Semantic HTML structure (`<header>`, `<section>`, `<footer>`, etc.).
- Logical heading hierarchy (h1 → h2 → h3).
- Keyboard navigation across all form fields and buttons.
- Focus-visible outline for dark and light themes.
- Alt text for images and descriptive link names.
- Clock and stats areas are readable by screen readers.

## 🧪 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/elkuradusenge/campus-life-planner.git
cd campus-life-planner
