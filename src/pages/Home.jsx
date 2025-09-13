import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-slate-900 to-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="text-center w-full px-4">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          🌍 BreatheSmart
        </motion.h1>

        <motion.p
          className="mb-8 text-slate-300 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Citizen-powered air quality monitoring with government and validator support.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 max-w-3xl mx-auto justify-center">
          {[
            { to: "/signin-citizen", label: "👤 Citizen", color: "bg-indigo-600 hover:bg-indigo-500" },
            { to: "/signin-government", label: "🏛 Government", color: "bg-green-600 hover:bg-green-500" },
            { to: "/signin-validator", label: "✅ Validator", color: "bg-orange-600 hover:bg-orange-500" }
          ].map((btn, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.2, duration: 0.6 }}
              className="flex-1"
            >
              <Link
                to={btn.to}
                className={`block text-center px-6 py-4 rounded-lg ${btn.color} transition`}
              >
                {btn.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
