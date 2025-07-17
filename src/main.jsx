import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/modern-normalize.css";
import "./styles/generics.css";
import "./styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
