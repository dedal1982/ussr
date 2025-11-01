import "./Main.css";
import Bmx from "./Bmx";
import Skate from "./Skate";
import Roller from "./Roller";
import Contacts from "../Contacts/Contacts";
import SocialLinks from "../SocialLinks/SocialLinks";
import { useWindowWidth } from "../../hooks/useWindowWidth";

const Main = () => {
  const width = useWindowWidth();
  const isMobile = width <= 960;

  return (
    <main className="main">
      <div className="main__wrapper holder">
        <div className="main__inner">
          <Bmx />
          <Skate />
          <Roller />
        </div>
        <SocialLinks />
        {isMobile && (
          <section>
            <Contacts className="contacts-mobile" />
          </section>
        )}
      </div>
    </main>
  );
};

export default Main;
