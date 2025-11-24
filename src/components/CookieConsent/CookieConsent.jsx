import "./CookieConsent.css";
import { useState, useEffect } from "react";
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

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(() => {
    const consentCookie = getCookie("cookieConsent");
    const declineDateStr = getCookie("declineDate");
    if (consentCookie === "true") {
      // Пользователь согласился, показывать попап не нужно
      setIsVisible(false);
    } else if (declineDateStr) {
      const declineDate = new Date(declineDateStr);
      const now = new Date();
      const diffDays = (now - declineDate) / (1000 * 60 * 60 * 24);
      if (diffDays >= 3) {
        // прошло 3+ дней после отказа, показываем снова
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookieConsent", "true", 365);
    setHasAccepted(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookie("cookieConsent", "false", 365);
    setCookie("declineDate", new Date().toISOString(), 365);
    setHasAccepted(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div id="cookieConsent">
      <div className="cookie-title">
        <img
          src={CookieIconImg}
          alt="Мы используем cookie"
          fetchPriority="high"
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
