import React from "react";
import { Routes, Route } from "react-router-dom";
import RewardsPage from "./pages/Rewards"

import Home from "./pages/Home";
import SignInCitizen from "./pages/SignInCitizen";
import SignInGovernment from "./pages/SignInGovernment";
import SignInValidator from "./pages/SignInValidator";
import CitizenPortal from "./pages/CitizenPortal";
import DataDashboard from "./pages/DataDashboard";
import ValidationPortal from "./pages/ValidationPortal";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin-citizen" element={<SignInCitizen />} />
      <Route path="/signin-government" element={<SignInGovernment />} />
      <Route path="/signin-validator" element={<SignInValidator />} />
      <Route path="/citizen" element={<CitizenPortal />} />
      <Route path="/government" element={<DataDashboard />} />
      <Route path="/validator" element={<ValidationPortal />} />
      <Route path="/rewards" element={<RewardsPage />}></Route>
      
    </Routes>
  );
}
