import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // ✅ Navbar on top
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#eab308", "#f97316", "#ef4444"];

// AQI background colors
const getAqiColor = (value) => {
  if (!value) return "bg-gray-600";
  if (value <= 50) return "bg-green-600";
  if (value <= 100) return "bg-yellow-500";
  if (value <= 150) return "bg-orange-500";
  if (value <= 200) return "bg-red-600";
  if (value <= 300) return "bg-purple-700";
  return "bg-gray-800";
};

// AQI status messages
const getAqiStatus = (value) => {
  if (!value) return "No Data ❓";
  if (value <= 50) return "Good 😀";
  if (value <= 100) return "Moderate 🙂";
  if (value <= 150) return "Unhealthy for Sensitive 😷";
  if (value <= 200) return "Unhealthy 🚨";
  if (value <= 300) return "Very Unhealthy ☠️";
  return "Hazardous 💀";
};

const DataDashboard = () => {
  const [aqi, setAqi] = useState(null);
  const [city, setCity] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [pollutionSources, setPollutionSources] = useState([]);

  // 🔑 Hardcoded API key (replace with your real IQAir API key)
  const API_KEY = "35dabf98-d383-44c3-add8-7f699dc32bcc";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loc = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              resolve({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
              }),
            reject
          );
        });

        const url = `https://api.airvisual.com/v2/nearest_city?lat=${loc.lat}&lon=${loc.lon}&key=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        console.log("IQAir API Response:", data);

        if (data.status === "success" && data.data?.current?.pollution) {
          const pollution = data.data.current.pollution;
          setAqi(pollution);
          setCity(`${data.data.city}, ${data.data.country}`);

          // Fake pollution distribution
          const co = 40,
            no2 = 30,
            waste = 20,
            noise = 10;
          const total = co + no2 + waste + noise;

          setPollutionSources([
            {
              name: "Vehicles",
              value: parseFloat(((co / total) * 100).toFixed(1)),
            },
            {
              name: "Factories",
              value: parseFloat(((no2 / total) * 100).toFixed(1)),
            },
            {
              name: "Waste Burning",
              value: parseFloat(((waste / total) * 100).toFixed(1)),
            },
            {
              name: "Noise",
              value: parseFloat(((noise / total) * 100).toFixed(1)),
            },
          ]);

          // Generate AQI trend based on current AQI ± random variation
          const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          const baseAqi = pollution.aqius || 100;
          const randomTrend = days.map((day) => ({
            day,
            aqi: Math.max(10, baseAqi + Math.floor(Math.random() * 40 - 20)),
          }));
          setTrendData(randomTrend);
        } else {
          console.warn("No pollution data found:", data);
        }
      } catch (err) {
        console.error("Error fetching AQI:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-gray-900 text-white">
      {/* ✅ Navbar */}
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">🌍 Pollution Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Live AQI Card */}
          <motion.div
            className={`p-6 rounded-lg shadow-lg ${getAqiColor(aqi?.aqius)}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-2">🌍 Live Air Quality Index</h2>
            {aqi ? (
              <>
                {city && (
                  <p className="text-lg font-semibold mb-2">📍 {city}</p>
                )}
                <p className="text-3xl font-bold">AQI (US): {aqi?.aqius}</p>
                <p className="mt-2">
                  Main Pollutant: {aqi?.mainus?.toUpperCase()}
                </p>
                <p>Time: {new Date(aqi?.ts).toLocaleString()}</p>
                <p className="mt-3 text-lg font-semibold">
                  Status: {getAqiStatus(aqi?.aqius)}
                </p>
              </>
            ) : (
              <p>Loading AQI...</p>
            )}
          </motion.div>

          {/* Pollution Sources Pie Chart */}
          <motion.div
            className="p-6 bg-white/10 rounded-lg shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h2 className="text-xl font-bold mb-4">🚗 Pollution Sources</h2>
            {pollutionSources.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pollutionSources}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ name, value }) => `${name}: ${value}%`}
                      dataKey="value"
                    >
                      {pollutionSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                {/* ✅ Legend */}
                <div className="mt-4 flex justify-center gap-4 text-sm">
                  {pollutionSources.map((source, index) => (
                    <div key={source.name} className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index] }}
                      ></span>
                      {source.name}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No source data available</p>
            )}
          </motion.div>
        </div>

        {/* AQI Trend Line Chart */}
        <motion.div
          className="p-6 mt-6 bg-white/10 rounded-lg shadow-lg"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2 className="text-xl font-bold mb-4">📈 AQI Trend (7 Days)</h2>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="aqi"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p>No trend data available</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DataDashboard;
