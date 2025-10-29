import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('day'); // Default: past day

  // 🛰️ Fetch Earthquake Data
  const fetchEarthquakeData = () => {
    setLoading(true);
    fetch(`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_${timeRange}.geojson`)
      .then((res) => res.json())
      .then((data) => {
        const features = data.features.map((eq) => ({
          id: eq.id,
          place: eq.properties.place,
          magnitude: eq.properties.mag,
          time: new Date(eq.properties.time).toLocaleString(),
          lat: eq.geometry.coordinates[1],
          lon: eq.geometry.coordinates[0],
        }));
        setEarthquakes(features);
      })
      .catch((err) => console.error('Error fetching earthquake data:', err))
      .finally(() => setLoading(false));
  };

  // 🔄 Initial Setup + Re-fetch when timeRange changes
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
    fetchEarthquakeData();
  }, [timeRange]);

  // 🎨 Color by magnitude
  const getColor = (mag) => {
    if (mag >= 6) return '#ff0000'; // Severe
    if (mag >= 4) return '#ff6600'; // Strong
    if (mag >= 2.5) return '#ffcc00'; // Moderate
    return '#00ff66'; // Light
  };

  return (
    <div style={styles.appContainer}>
      {/* 🌍 Title */}
      <h1 style={styles.title}>🌍 Earthquake Visualizer</h1>

      {/* 🧭 Control Panel */}
      <div style={styles.controlPanel}>
        <label style={styles.label}>Time Range:</label>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={styles.dropdown}
        >
          <option value="hour">Past Hour</option>
          <option value="day">Past Day</option>
          <option value="week">Past Week</option>
        </select>
      </div>

      {/* 🌐 Map Container */}
      <div style={styles.mapWrapper}>
        <MapContainer
          center={[20, 0]}
          zoom={2}
          zoomControl={true}
          style={styles.mapContainer}
          worldCopyJump={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />
          {earthquakes.map((eq) => (
            <CircleMarker
              key={eq.id}
              center={[eq.lat, eq.lon]}
              radius={Math.max(eq.magnitude * 2, 3)}
              fillColor={getColor(eq.magnitude)}
              color="#000"
              weight={1}
              opacity={1}
              fillOpacity={0.8}
            >
              <Popup>
                <strong>{eq.place || 'Unknown location'}</strong>
                <br />
                Magnitude: {eq.magnitude}
                <br />
                Time: {eq.time}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* 📊 Legend */}
        <div style={styles.legend}>
          <strong>Magnitude Legend</strong>
          <div style={{ marginTop: '8px' }}>
            <div><span style={{ color: '#00ff66' }}>●</span> Light (≤ 2.5)</div>
            <div><span style={{ color: '#ffcc00' }}>●</span> Moderate (2.5–4)</div>
            <div><span style={{ color: '#ff6600' }}>●</span> Strong (4–6)</div>
            <div><span style={{ color: '#ff0000' }}>●</span> Severe (≥ 6)</div>
          </div>
        </div>

        {/* 🔄 Refresh Button */}
        <button onClick={fetchEarthquakeData} style={styles.refreshButton}>
          {loading ? 'Refreshing...' : '🔄 Refresh Data'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    margin: 0,
    padding: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    margin: '10px 0',
    fontSize: '24px',
    color: '#222',
    zIndex: 2000,
  },
  controlPanel: {
    position: 'absolute',
    top: '70px',
    left: '50px',
    zIndex: 2000,
    background: 'rgba(255,255,255,0.95)',
    padding: '10px 14px',
    borderRadius: '8px',
    boxShadow: '0 0 6px rgba(0,0,0,0.2)',
  },
  label: {
    marginRight: '8px',
    fontWeight: 'bold',
  },
  dropdown: {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  mapWrapper: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  legend: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    background: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    lineHeight: '1.6',
    zIndex: 2000,
  },
  refreshButton: {
    position: 'absolute',
    top: '70px',
    right: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    boxShadow: '0 0 8px rgba(0,0,0,0.3)',
    zIndex: 2000,
  },
};

export default App;
