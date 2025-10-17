import "./FooterRequisites.css";
import { useState, useCallback, useRef } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import RequisitesPopup from "../../Popups/LogoPopup";

const FooterRequisites = () => {
  const [active, setActive] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const descRef = useRef(null);

  const handleBlur = useCallback((element) => {
    if (element) {
      element.blur();
    }
  }, []);

  useEscapeKey(descRef, handleBlur);

  return (
    <>
      <div
        id="requisites"
        className="footer__top"
        tabIndex={0}
        onClick={handleOpenModal}
        ref={descRef}
      >
        <div className="footer__contacts">
          <ul
            className={`footer__contacts-list requisites-hover ${
              active ? "active" : ""
            }`}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            <li>
              Наименование юридического лица: ООО &laquo;Честный Эйб&raquo;
            </li>
            <li>Юридический адрес: 143980, Московская обл.,</li>
            <li>г. Балашиха, ул. Октябрьская (Железнодорожный мкр.),</li>
            <li>д. 33, Бдок А, помещение V-13, комната 1</li>
          </ul>
          <ul
            className={`footer__contacts-list requisites-hover ${
              active ? "active" : ""
            }`}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            <li>ОГРН: 1195081055575</li>
            <li>ИНН: 5012100464</li>
            <li>КПП: 501201001</li>
          </ul>
        </div>

        {/* Банковские реквизиты */}
        <ul
          className={`footer__contacts-list bank-list requisites-hover ${
            active ? "active" : ""
          }`}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <li>Банковские реквизиты:</li>
          <li>Банк: АО &laquo;АЛЬФА-БАНК&raquo;</li>
          <li>Расчетный счет: 40702810902630003334</li>
          <li>Корреспондентский счет: 30101810200000000593</li>
          <li>БИК: 044525593</li>
        </ul>
      </div>
      <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
        <RequisitesPopup />
      </ModalWrapper>
    </>
  );
};

export default FooterRequisites;
