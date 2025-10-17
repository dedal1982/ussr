import "./Contacts.css";
import { useState, useRef } from "react";
import { useEscapeKey } from "../../hooks/useEscapeKey";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import ContactsPopup from "../Popups/ContactsPopup";

const Contacts = ({ className }) => {
  const [contactsText, setContactsText] = useState("Контакты");

  const handleMouseOver = (name) => {
    setContactsText(name);
  };

  const handleMouseOut = () => {
    setContactsText("Контакты");
  };

  const handleContactsText = (name) => {
    setContactsText(name);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const descRef = useRef(null);

  useEscapeKey(descRef, (element) => {
    element.blur();
  });

  return (
    <>
      <nav className={`contacts ${className || ""}`} aria-label="Контакты">
        <h2
          id="header-contacts"
          className="contacts-name"
          onClick={handleOpenModal}
          tabIndex={0}
          ref={descRef}
        >
          {contactsText}
        </h2>
        <ul className="contacts-phones">
          <li>
            <span />
            <a
              href="tel:+79165718989"
              data-name="Сайты"
              onMouseOver={() => handleMouseOver("Сайты")}
              onMouseOut={handleMouseOut}
              onFocus={() => handleContactsText("Сайты")}
              onBlur={handleMouseOut}
            >
              +7 (916) 571-89-89
            </a>
          </li>
          <li>
            <span />
            <a
              href="tel:+79255718989"
              data-name="Игры"
              onMouseOver={() => handleMouseOver("Игры")}
              onMouseOut={handleMouseOut}
              onFocus={() => handleContactsText("Игры")}
              onBlur={handleMouseOut}
            >
              +7 (925) 571-89-89
            </a>
          </li>
          <li>
            <span />
            <a
              href="tel:+79645718989"
              data-name="Тестирование"
              onMouseOver={() => handleMouseOver("Тестирование")}
              onMouseOut={handleMouseOut}
              onFocus={() => handleContactsText("Тестирование")}
              onBlur={handleMouseOut}
            >
              +7 (964) 571-89-89
            </a>
          </li>
          <li>
            <span />
            <a
              href="tel:+79855718989"
              data-name="Симбиоз"
              onMouseOver={() => handleMouseOver("Симбиоз")}
              onMouseOut={handleMouseOut}
              onFocus={() => handleContactsText("Симбиоз")}
              onBlur={handleMouseOut}
            >
              +7 (985) 571-89-89
            </a>
          </li>
        </ul>
      </nav>
      <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
        <ContactsPopup />
      </ModalWrapper>
    </>
  );
};

export default Contacts;
