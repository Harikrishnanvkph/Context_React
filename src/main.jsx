import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  /* using BrowserRouter so Routes can be used to route between pages*/
  <BrowserRouter>
    {/* Entry point of the app */}
    <App />
  </BrowserRouter>
);
