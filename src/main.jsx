import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ReportsProvider } from "./context/ReportsContext.jsx"; // ✅ path correct
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ReportsProvider>
        <App />
      </ReportsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
