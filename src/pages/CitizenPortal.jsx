import React, { useContext, useState, useEffect } from "react";
import { ReportsContext } from "../context/ReportsContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../components/Navbar"; // ✅ Import Navbar
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Replace with your IQAir API key
const API_KEY = "YOUR_IQAIR_API_KEY";

// ✅ Function to decide marker color based on AQI
const getMarkerColor = (aqi) => {
  if (aqi <= 50) return "green";
  if (aqi <= 100) return "yellow";
  if (aqi <= 150) return "orange";
  if (aqi <= 200) return "red";
  if (aqi <= 300) return "purple";
  return "black";
};

// ✅ Create custom AQI marker
const createColoredIcon = (color) =>
  new L.Icon({
    iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=cloud|${color}`,
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    popupAnchor: [0, -45],
  });

// ✅ Custom "You are here" marker
const userIcon = new L.Icon({
  iconUrl: "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=home|blue",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -45],
});

const CitizenPortal = () => {
  const { reports, addReport } = useContext(ReportsContext);
  const [newReport, setNewReport] = useState({ text: "", image: null });
  const [aqiMarkers, setAqiMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState([12.9716, 77.5946]); // default Bangalore

  // ✅ Get user's live location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Geolocation error:", err);
        }
      );
    }
  }, []);

  // ✅ Fetch live AQI pollution data
  useEffect(() => {
    const fetchAQIData = async () => {
      try {
        const cities = [
          { city: "Bangalore", lat: 12.9716, lon: 77.5946 },
          { city: "Chennai", lat: 13.0827, lon: 80.2707 },
          { city: "Hyderabad", lat: 17.385, lon: 78.4867 },
        ];

        const results = await Promise.all(
          cities.map(async (c) => {
            const res = await fetch(
              `https://api.airvisual.com/v2/nearest_city?lat=${c.lat}&lon=${c.lon}&key=${API_KEY}`
            );
            const data = await res.json();
            if (data.status === "success") {
              return {
                ...c,
                aqi: data.data.current.pollution.aqius,
                pollutant: data.data.current.pollution.mainus,
              };
            }
            return null;
          })
        );

        setAqiMarkers(results.filter(Boolean));
      } catch (err) {
        console.error("Error fetching AQI:", err);
      }
    };

    fetchAQIData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReport.text && !newReport.image) return;

    const report = {
      id: Date.now(),
      text: newReport.text,
      image: newReport.image,
      location: { lat: userLocation[0], lon: userLocation[1] },
      status: "Pending",
    };

    addReport(report);
    setNewReport({ text: "", image: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-gray-900 text-white">
      {/* ✅ Navbar at the top */}
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">🧑‍🤝‍🧑 Citizen Portal</h1>

        {/* Report Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-4 rounded-lg shadow-md mb-6"
        >
          <textarea
            placeholder="Describe pollution issue..."
            value={newReport.text}
            onChange={(e) =>
              setNewReport({ ...newReport, text: e.target.value })
            }
            className="w-full p-2 mb-3 rounded text-black"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewReport({
                ...newReport,
                image: URL.createObjectURL(e.target.files[0]),
              })
            }
            className="mb-3"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
          >
            Submit Report
          </button>
        </form>

        {/* Report List */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">📋 Your Reports</h2>
          {reports.length === 0 ? (
            <p>No reports submitted yet.</p>
          ) : (
            <ul className="space-y-4">
              {reports.map((r) => (
                <li key={r.id} className="bg-white/10 p-3 rounded">
                  <p>{r.text}</p>
                  {r.image && (
                    <img
                      src={r.image}
                      alt="report"
                      className="mt-2 rounded w-40"
                    />
                  )}
                  <p className="text-sm text-gray-300 mt-1">
                    Status: {r.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pollution Map */}
        <div>
          <h2 className="text-xl font-bold mb-3">🗺️ Pollution Hotspots</h2>
          <MapContainer
            center={userLocation}
            zoom={10}
            style={{ height: "400px", width: "100%" }}
            className="rounded-lg shadow-md"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            {/* ✅ User's location */}
            <Marker position={userLocation} icon={userIcon}>
              <Popup>📍 You are here</Popup>
            </Marker>

            {/* Citizen Reports */}
            {reports.map((r) => (
              <Marker key={r.id} position={[r.location.lat, r.location.lon]}>
                <Popup>
                  <p>{r.text}</p>
                  {r.image && (
                    <img
                      src={r.image}
                      alt="report"
                      className="w-32 mt-2 rounded"
                    />
                  )}
                  <p>Status: {r.status}</p>
                </Popup>
              </Marker>
            ))}

            {/* Live AQI Markers */}
            {aqiMarkers.map((m, idx) => (
              <Marker
                key={idx}
                position={[m.lat, m.lon]}
                icon={createColoredIcon(getMarkerColor(m.aqi))}
              >
                <Popup>
                  <p>
                    🌍 {m.city} <br />
                    AQI: <b>{m.aqi}</b> <br />
                    Main Pollutant: {m.pollutant}
                  </p>
                  {m.aqi > 100 ? (
                    <p className="text-red-400">⚠️ Suggest wearing a mask</p>
                  ) : (
                    <p className="text-green-400">
                      ✅ Air quality is acceptable
                    </p>
                  )}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default CitizenPortal;
