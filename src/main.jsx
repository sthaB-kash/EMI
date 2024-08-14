import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EmiContextProvider from "./components/emi/emiContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <EmiContextProvider>
      <App />
    </EmiContextProvider>
  </StrictMode>
);
