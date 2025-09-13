import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignInCitizen() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/citizen"); // Redirect after login
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 p-6 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Citizen Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-slate-800"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-slate-800"
        />
        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

