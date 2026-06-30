import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

// When the frontend is hosted separately from the API (e.g. GitHub Pages),
// VITE_API_URL points API calls at the Replit-hosted backend. When unset
// (running on Replit), requests stay relative and go through the shared proxy.
const apiBaseUrl = import.meta.env.VITE_API_URL;
if (apiBaseUrl) {
  setBaseUrl(apiBaseUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
