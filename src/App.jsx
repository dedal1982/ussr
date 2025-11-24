import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "@components/Header/Header";
import { Main } from "@components/Main/Main";
import { Footer } from "@components/Footer/Footer";
import { CookieConsent } from "@components/CookieConsent/CookieConsent";
import { NotFoundPage } from "@components/NotFoundPage/NotFoundPage";
import { Privacy } from "@components/Footer/FooterLower/Privacy";
import { Terms } from "@components/Footer/FooterLower/Terms";
import { Bmx } from "@components/Main/Bmx";
import { Skate } from "@components/Main/Skate";
import { Roller } from "@components/Main/Roller";
import { Logo } from "@components/Header/Logo";
import { Contacts } from "@components/Contacts/Contacts";
import { FooterRequisites } from "@components/Footer/FooterRequisites/FooterRequisites";
import { Copyright } from "@components/Footer/FooterLower/Copyright";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const App = () => {
  const width = useWindowWidth();
  const isDesktop = width > 960;
  const isMobile = width <= 960;
  return (
    <div className="page">
      <Header isDesktop={isDesktop} />

      <Routes>
        <Route path="/" element={<Main isMobile={isMobile} />}>
          <Route path="/about" element={<Logo />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cooperation" element={<Bmx />} />
          <Route path="/development" element={<Skate />} />
          <Route path="/share" element={<Roller />} />
          <Route path="/requisites" element={<FooterRequisites />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/copyright" element={<Copyright />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
      <CookieConsent />
    </div>
  );
};

export default App;
