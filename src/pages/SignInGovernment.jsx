import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignInGovernment() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/government");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form onSubmit={handleLogin} className="bg-white/10 p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Government Sign In</h2>
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 rounded bg-slate-800" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-3 rounded bg-slate-800" />
        <button className="w-full py-2 bg-green-600 hover:bg-green-500 rounded">Sign In</button>
      </form>
    </div>
  );
}
