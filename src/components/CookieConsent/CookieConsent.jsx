import "./CookieConsent.css";
import { useState, useEffect } from "react";
import CookieIconImg from "@/assets/images/Cookie/CookieIcon.png";
import AcceptIconImg from "@/assets/images/Cookie/AcceptIcon.svg";
import RejectIconImg from "@/assets/images/Cookie/RejectIcon.svg";

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

// Проверка, сколько дней прошло с даты отказа
const daysSince = (dateStr) => {
  const pastDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now - pastDate;
  return diffMs / (1000 * 60 * 60 * 24);
};

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const consentCookie = getCookie("cookieConsent");
    const declineDateStr = getCookie("declineDate");

    if (consentCookie === "true") {
      // Пользователь согласился — скрываем окно
      setIsVisible(false);
    } else if (declineDateStr) {
      // Проверяем, прошло ли 3 дня с отказа
      const daysPassed = daysSince(declineDateStr);
      if (daysPassed >= 3) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } else {
      // Если куки отсутствуют — показываем окно (первый визит)
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookieConsent", "true", 365);
    setIsVisible(false);
  };

  const handleDecline = () => {
    const nowStr = new Date().toISOString();
    setCookie("cookieConsent", "false", 365);
    setCookie("declineDate", nowStr, 365);
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
