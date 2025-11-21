import "./Main.css";
import { Outlet } from "react-router-dom";
import { Bmx } from "./Bmx";
import { Skate } from "./Skate";
import { Roller } from "./Roller";
import { Contacts } from "../Contacts/Contacts";
import { SocialLinks } from "../SocialLinks/SocialLinks";

export const Main = ({ isMobile }) => {
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
        <Outlet />
      </div>
    </main>
  );
};
