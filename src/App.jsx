import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Privacy from "./components/Footer/FooterLower/Privacy";
import Terms from "./components/Footer/FooterLower/Terms";

const App = () => {
  return (
    <div className="page">
      <Header />

      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default App;
