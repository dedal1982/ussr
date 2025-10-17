import "./CookieConsent.css";
import { useState, useEffect, useCallback } from "react";
import CookieIconImg from "../../assets/images/Cookie/CookieIcon.svg";
import AcceptIconImg from "../../assets/images/Cookie/AcceptIcon.svg";
import RejectIconImg from "../../assets/images/Cookie/RejectIcon.svg";

const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";").map((c) => c.trim());
  return (
    cookies.find((c) => c.startsWith(nameEQ))?.substring(nameEQ.length) || null
  );
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const loadGoogleAnalytics = useCallback(() => {
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-1P81G0D66K";
    script.async = true;
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", "G-1P81G0D66K");
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const consentCookie = getCookie("cookieConsent");
    if (consentCookie === "true") {
      loadGoogleAnalytics();
    } else if (!consentCookie) {
      setIsVisible(true);
    }
  }, [loadGoogleAnalytics]);

  const handleAccept = () => {
    setCookie("cookieConsent", "true", 365);
    setIsVisible(false);
    loadGoogleAnalytics();
  };

  const handleDecline = () => {
    setCookie("cookieConsent", "false", 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div id="cookieConsent">
      <div className="cookie-title">
        <img
          src={CookieIconImg}
          alt="Мы используем cookie"
          fetchpriority="high"
        />
      </div>
      <div className="cookie-buttons">
        <button id="acceptBtn" onClick={handleAccept}>
          <img src={AcceptIconImg} alt="Принять" />
        </button>
        <button id="declineBtn" onClick={handleDecline}>
          <img src={RejectIconImg} alt="Отклонить" />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
