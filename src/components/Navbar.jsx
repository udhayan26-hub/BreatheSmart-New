import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: "/citizen", label: "Citizen" },
    { to: "/government", label: "Government" },
    { to: "/validator", label: "Validator" },
    { to: "/rewards", label: "Rewards" },
    
  ];

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold tracking-wide hover:text-blue-400 transition-colors"
      >
        🌍 BreatheSmart
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`hover:text-blue-400 transition-colors ${
              location.pathname === link.to ? "text-blue-400 font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/"
          className="text-red-400 hover:text-red-500 transition-colors"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}
