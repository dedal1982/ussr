import "./Footer.css";
import { FooterRequisites } from "./FooterRequisites/FooterRequisites";
import { FooterLower } from "./FooterLower/FooterLower";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper holder">
        <FooterRequisites />
        <FooterLower />
      </div>
    </footer>
  );
};
