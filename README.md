**Earthquake Visualizer Web App**

A real-time interactive **Earthquake Visualization** web application built with **React**, **Leaflet.js**, and **OpenStreetMap**.  
It displays recent global earthquakes on a responsive world map, with magnitude-based color coding and detailed information for each event.

---

**Features**

- **Real-time Earthquake Data** — Fetched from the [USGS Earthquake API](https://earthquake.usgs.gov/).
- **Interactive World Map** — Zoom, drag, and explore earthquake locations.
- **Magnitude-based Indicators**
  - Green — Minor (Magnitude < 2)
  - Yellow — Moderate (2 ≤ Magnitude < 4)
  - Orange — Strong (4 ≤ Magnitude < 6)
  - Red — Severe (≥ 6)
- **Detailed Popups** — View location, magnitude, and timestamp.
- **Real-time Chart** — Shows earthquake frequency or magnitude distribution.
- **Auto Refresh Button** — Instantly refreshes the map with the latest data.
- **Responsive Design** — Fully adaptable for all screen sizes.

---

**Tech Stack**

**Technology | Purpose **

**React.js** | Frontend Framework 
**Leaflet.js** | Interactive Maps 
**OpenStreetMap** | Map Tile Provider 
**Chart.js / Recharts** | Data Visualization 
**USGS API** | Earthquake Data Source 

---

**Installation & Setup**

1. Clone the Repository
```bash
git clone https://github.com/your-username/earthquake-visualizer.git
cd earthquake-visualizer

2. Install Dependencies
npm install

3. Run the Development Server
npm run dev
Then open http://localhost:5173
 in your browser.

**Project Structure**
earthquake-visualizer/
│
├── public/
│   ├── earthquake.png         # Favicon / App icon
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── MapView.jsx        # Main Leaflet map component
│   │   ├── ChartView.jsx      # Earthquake chart visualization
│   │   └── Controls.jsx       # Buttons for refresh/time range
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── package.json
└── README.md

**Developer Info**
  Muthukumaran M
