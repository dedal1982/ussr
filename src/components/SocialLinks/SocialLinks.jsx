import Telegram from "@/assets/images/Telegram.svg";
import EMail from "@/assets/images/E-Mail.svg";
import RuTube from "@/assets/images/RuTube.svg";
import Pinterest from "@/assets/images/Pinterest.svg";
import ToGis from "@/assets/images/2GIS.svg";
import RuStore from "@/assets/images/RuStore.svg";
import "./SocialLinks.css";

export const SocialLinks = () => {
  return (
    <ul className="social-links">
      <li>
        <a href="https://telegram.me/ChestnyyEyb" target="_blank">
          <img src={Telegram} alt="Telegram" loading="lazy" />
        </a>
      </li>
      <li>
        <a href="mailto:lincoln@chestnyyeyb.ru" target="_blank">
          <img src={EMail} alt="E-Mail" loading="lazy" />
        </a>
      </li>
      <li>
        <a href="https://rutube.ru/u/chestnyyeyb/" target="_blank">
          <img src={RuTube} alt="RuTube" loading="lazy" />
        </a>
      </li>
      <li>
        <a href="https://www.pinterest.ru/chestnyyeyb/" target="_blank">
          <img src={Pinterest} alt="Pinterest" loading="lazy" />
        </a>
      </li>
      <li>
        <a
          href="https://2gis.ru/balashikha/firm/70000001085385845"
          target="_blank"
        >
          <img src={ToGis} alt="2GIS" loading="lazy" />
        </a>
      </li>
      <li>
        <a
          href="https://www.rustore.ru/catalog/developer/9qrgofwk"
          target="_blank"
        >
          <img src={RuStore} alt="RuStore" loading="lazy" />
        </a>
      </li>
    </ul>
  );
};
