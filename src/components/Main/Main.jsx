import "./Main.css";
import Bmx from "./Bmx";
import Skate from "./Skate";
import Roller from "./Roller";
import Contacts from "../Contacts/Contacts";
import SocialLinks from "../SocialLinks/SocialLinks";

const Main = () => {
  return (
    <div className="main">
      <div className="main__wrapper holder">
        <div className="main__inner">
          <Bmx />
          <Skate />
          <Roller />
        </div>
        <SocialLinks />
        <Contacts className="contacts-mobile" />
      </div>
    </div>
  );
};

export default Main;
