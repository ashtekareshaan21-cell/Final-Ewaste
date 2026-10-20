# Green Campus Challenge ♻️
**Interdepartmental E-Waste Recycling Competition Platform**

A modern, responsive, client-side web application designed for college campuses to promote electronic waste recycling through gamification, live department & division rankings, milestone achievement badges, real-time activity tracking, environmental impact analytics, student PRN verification, and digital certification.

---

## 🌟 Core Features & New Functionalities

### 1. 🎓 Student PRN & Division Support (Form, Activity & Certificates)
- **Drop-Off Modal Fields**:
  - **Your Name**: Full student name.
  - **Student PRN**: Permanent Registration Number (e.g. `2024COMP1042`), with uppercase auto-formatting and validation.
  - **Department**: College branch dropdown (Computer, IT, Electronics, Mechanical, Civil, Biotech).
  - **Division**: Class division selector (`Div A`, `Div B`, `Div C`, `Div D`).
  - **Device Type & Quantity**: Real-time points preview calculation.
- **Activity Feed**: Displays student name alongside their **PRN badge** (`PRN: 2024COMP1042`) and **Division tag** (`Div B`).
- **CSV Data Export**: Includes columns for `Student Name`, `PRN`, `Division`, `Department`, `Device Type`, `Quantity`, and `Points Earned`.

### 2. 🔍 Student PRN Verification & Certificate Portal
- **Instant PRN & Name Search**: Look up any registered student's recycling records across the entire campus.
- **Aggregated Credentials Card**:
  - Displays Student Name, PRN badge, Division pill, and Department badge.
  - Metric counters: **Devices Recycled**, **Points Contributed**, and **Verified Certificates**.
  - Drop-off history table with dates, items, division, points, and one-click certificate view buttons.
- **Quick Sample PRN Chips**: One-click pills to test verified profiles instantly (`2024COMP1042`, `2024IT1089`, `2024EXTC1015`).
- **Unregistered PRN Fallback**: Provides a direct "+ Log First Drop-Off" button pre-populating that PRN.

### 3. 🏆 Inter-Division Cup Standings Toggle
- **Segmented View Switcher** on Leaderboard:
  - **Departments**: Standard interdepartmental race.
  - **Inter-Division Cup 🏆**: Live ranking by Division & Department (e.g., COMP Div A, COMP Div B, IT Div A, etc.) with medals, proportional progress bars, and item counts.
- Search input filters both departments and divisions simultaneously.

### 4. 📜 Official Digital Recycling Certificate of Stewardship
- Students can view and print an official, college-branded **Certificate of Environmental Stewardship**.
- Displays:
  - Recipient Name.
  - **Student PRN & Class Division**.
  - Recipient Department.
  - Recycled device details and points awarded.
  - Official Certificate Verification ID (`GCC-2026-XXXX`) and date.
- Dedicated print stylesheet (`@media print`) for clean PDF download and printing.

### 5. 🌿 Campus Zero-Landfill Student Pledge
- Interactive digital pledge wall to commit to zero e-waste disposal in ordinary campus trash.
- Modal captures student name, PRN, division, and department.
- Increments live campus pledge counter with celebratory fanfare and confetti.

### 6. 🌍 Campus Environmental Impact & Footprint Simulator
- **Live Equivalencies Dashboard**:
  - **CO₂ Emissions Prevented** (kg CO₂e saved).
  - **Clean Energy Conserved** (kWh powers campus dorms).
  - **Toxic Heavy Metals Diverted** (lead, mercury, cadmium safely captured).
  - **Precious Metals Salvaged** (gold, silver, refined copper recovered).
- **Interactive Footprint Simulator**:
  - Select device type and quantity to calculate exact footprint savings and department points before dropping off.

### 7. 🧠 Daily Eco-Knowledge Trivia (+10 Bonus Points)
- Daily interactive e-waste quiz challenge.
- Correct answers award **+10 bonus points** to the selected department with celebratory confetti and sound effects.

### 8. 📍 Campus Drop-Off Bin Stations Network
- Interactive directory of physical campus collection hubs:
  - **Main Building Atrium** (Ground Floor Central Lobby, 68% full)
  - **Engineering Hardware Lab** (Block B Electronics Workshop, 42% full)
  - **Student Union Hub** (Level 1 Commons, 24/7 Smart Bin, 84% full)
  - **Life Sciences Foyer** (Biotech Wing, 25% full)
- Live bin capacity meters, operational hours, and accepted device tags.

### 9. 🎉 Web Audio Chimes & Canvas Confetti
- **Web Audio API Synthesizer**: Harmonic chimes on successful drop-offs, pledge submissions, and quiz wins.
- **Sound Toggle**: Easy mute/unmute control in the top navigation bar.
- **Confetti Particle Engine**: Fullscreen celebratory bursts.

---

## 🎨 Design System

- **Forest Green**: `#0B3825`
- **Dark Forest**: `#071E14`
- **Action Green**: `#087F45`
- **Mint Background**: `#F5FAF6`
- **Card Mint Surface**: `#E9F7EE`
- **Achievement Gold**: `#FFE97A`
- **Typography**: Poppins (Body & Headings) and JetBrains Mono (PRNs, data metrics & code badges).

---

## 📁 File Structure

```
├── index.html              # Semantic HTML5 markup with ARIA tags & interactive modals
├── style.css               # Design system, responsive layouts, print styles
├── script.js               # State model, PRN portal, Inter-Division Cup, audio synth & confetti
├── circuit_board_bg.jpg    # Circuit texture for Green Champion card
└── README.md               # Documentation and execution instructions
```

---

## 🚀 How to Run Locally

### Option 1: Direct Browser
Open `index.html` directly in any modern web browser:
- Double-click `index.html` in your file explorer, or
- Drag and drop `index.html` into your browser.

### Option 2: Local HTTP Server (Python)
```bash
python -m http.server 8085
```
Then visit: `http://localhost:8085`
