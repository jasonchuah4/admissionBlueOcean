import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./components/Context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <HashRouter basename="/">
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>
);
