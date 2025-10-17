import "./Header.css";
import Logo from "./Logo";
import MobileTitle from "./MobileTitle";
import Contacts from "../Contacts/Contacts";

const Header = () => {
  return (
    <div className="header" role="banner">
      <div className="header__wrapper holder">
        <Logo />
        <MobileTitle />
        <Contacts />
      </div>
    </div>
  );
};

export default Header;
