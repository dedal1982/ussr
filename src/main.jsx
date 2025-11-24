import "./index.css";
import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Preloader } from "@components/Preloader/Preloader.jsx";
import App from "./App.jsx";

// Ленивое подключение ErrorBoundaryWrapper
const ErrorBoundaryWrapper = lazy(() =>
  import("@components/ErrorBoundary/ErrorBoundary.jsx")
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <ErrorBoundaryWrapper>
          <App />
        </ErrorBoundaryWrapper>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
