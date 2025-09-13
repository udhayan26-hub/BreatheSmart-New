import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function ValidationPortal() {
  return (
    <motion.div
      className="min-h-screen w-screen bg-gradient-to-br from-orange-900 to-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Navbar />
      <div className="p-6 w-full max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Validator Dashboard
        </motion.h1>

        {/* Pending Submissions */}
        <motion.div
          className="bg-white/10 p-6 rounded-lg mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-3">📥 Pending Reports</h2>
          <ul className="space-y-3">
            <motion.li
              className="bg-white/5 p-3 rounded flex justify-between items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span>🔥 Garbage burning photo</span>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded mr-2"
                >
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded"
                >
                  Reject
                </motion.button>
              </div>
            </motion.li>

            <motion.li
              className="bg-white/5 p-3 rounded flex justify-between items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <span>🚗 Vehicle smoke photo</span>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded mr-2"
                >
                  Approve
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded"
                >
                  Reject
                </motion.button>
              </div>
            </motion.li>
          </ul>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="bg-white/10 p-6 rounded-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <h2 className="text-xl font-semibold mb-3">📊 Validation Stats</h2>
          <p className="text-lg">✅ Approved: 42</p>
          <p className="text-lg">❌ Rejected: 8</p>
        </motion.div>
      </div>
    </motion.div>
  );
}


