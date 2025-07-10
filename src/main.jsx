import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const initialData = window.__SSR_DATA__ || {};

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App todos={initialData.todos || []} />
  </React.StrictMode>
);