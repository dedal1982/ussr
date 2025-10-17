import "./Main.css";
import Bmx from "./Bmx";
import Skate from "./Skate";
import Roller from "./Roller";
import Contacts from "../Contacts/Contacts";

const Main = () => {
  return (
    <div className="main">
      <div className="main__wrapper holder">
        <div className="main__inner">
          <Bmx />
          <Skate />
          <Roller />
          <Contacts className="contacts-mobile" />
        </div>
      </div>
    </div>
  );
};

export default Main;
