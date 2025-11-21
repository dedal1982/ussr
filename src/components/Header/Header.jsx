import "./Header.css";
import { Logo } from "./Logo";
import { MobileTitle } from "./MobileTitle";
import { Contacts } from "../Contacts/Contacts";

export const Header = ({ isDesktop }) => {
  return (
    <div className="header" role="banner">
      <div className="header__wrapper holder">
        <Logo />
        <MobileTitle />
        {isDesktop && <Contacts />}
      </div>
    </div>
  );
};
