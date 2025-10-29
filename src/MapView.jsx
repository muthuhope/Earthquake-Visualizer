import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function MapView() {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    // Fix leaflet icons for Vite
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    // Fetch earthquake data
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
      .then(response => response.json())
      .then(data => {
        const features = data.features.map(eq => ({
          id: eq.id,
          place: eq.properties.place,
          magnitude: eq.properties.mag,
          time: new Date(eq.properties.time).toLocaleString(),
          lat: eq.geometry.coordinates[1],
          lon: eq.geometry.coordinates[0],
        }));
        setEarthquakes(features);
      })
      .catch(error => console.error('Error fetching earthquake data:', error));
  }, []);

  // Function to set marker color based on magnitude
  const getColor = (magnitude) => {
    if (magnitude >= 6) return 'red';
    if (magnitude >= 4) return 'orange';
    if (magnitude >= 2) return 'yellow';
    return 'green';
  };

  // Function to set marker size
  const getRadius = (magnitude) => {
    return magnitude ? magnitude * 3 : 2;
  };

  return (
  <div className="map-wrapper">
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />

      {earthquakes.map((eq) => {
        const color =
          eq.magnitude >= 6
            ? "#ff0000" // 🔴 Severe
            : eq.magnitude >= 4
            ? "#ff6600" // 🟠 Strong
            : eq.magnitude >= 2.5
            ? "#ffcc00" // 🟡 Moderate
            : "#00ff66"; // 🟢 Light

        return (
          <CircleMarker
            key={eq.id}
            center={[eq.lat, eq.lon]}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.8 }}
            radius={eq.magnitude ? eq.magnitude * 3 : 2}
          >
            <Popup>
              <strong>{eq.place || "Unknown location"}</strong> <br />
              Magnitude: {eq.magnitude} <br />
              Time: {eq.time}
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  </div>
);
}
export default MapView;
