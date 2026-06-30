import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

// When the frontend is hosted separately from the API (e.g. GitHub Pages),
// VITE_API_URL points API calls at the Replit-hosted backend. When unset
// (running on Replit), requests stay relative and go through the shared proxy.
//
// Generated client paths already include `/api`, so the base must be the
// origin only. We defensively strip a trailing slash and `/api` so both
// `https://app.replit.app` and `https://app.replit.app/api` work.
const rawApiUrl = import.meta.env.VITE_API_URL;
if (rawApiUrl) {
  const apiBaseUrl = rawApiUrl.replace(/\/+$/, "").replace(/\/api$/, "");
  setBaseUrl(apiBaseUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
