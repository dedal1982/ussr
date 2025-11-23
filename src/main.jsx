import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundaryWrapper } from "@components/ErrorBoundary/ErrorBoundary.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundaryWrapper>
        <App />
      </ErrorBoundaryWrapper>
    </BrowserRouter>
  </StrictMode>
);
