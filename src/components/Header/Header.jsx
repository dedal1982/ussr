import "./Header.css";
import Logo from "./Logo";
import MobileTitle from "./MobileTitle";
import Contacts from "../Contacts/Contacts";
import { useWindowWidth } from "../../hooks/useWindowWidth";

const Header = () => {
  const width = useWindowWidth();
  const isDesktop = width > 960;

  return (
    <div className="header" role="banner">
      <div className="header__wrapper holder">
        <Logo />
        <MobileTitle />
        {isDesktop && <Contacts className="contacts" />}
      </div>
    </div>
  );
};

export default Header;
