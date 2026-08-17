import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "./index.css";

document.documentElement.classList.add("light");

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>
);
