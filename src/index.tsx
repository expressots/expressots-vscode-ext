import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import App from "./App";

const rootElement =
  document.getElementById("root") ?? document.createElement("div");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
