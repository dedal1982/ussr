import "./FooterRequisites.css";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { usePathPrefix } from "../../../hooks/usePathPrefix";

const FooterRequisites = () => {
  const [active, setActive] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [ModalWrapperComponent, setModalWrapper] = useState(null);
  const [PopupComponent, setLogoPopup] = useState(null);
  const pathPrefix = "requisites";
  const { addPrefix, removePrefix } = usePathPrefix(
    pathPrefix,
    (isPopupPath) => {
      setModalOpen(isPopupPath);
    }
  );

  const handleOpenModal = async () => {
    if (!ModalWrapperComponent) {
      const { default: ModalWrapper } = await import(
        "@components/ModalWrapper/ModalWrapper"
      );
      setModalWrapper(() => ModalWrapper);
    }
    if (!PopupComponent) {
      const { default: RequisitesPopup } = await import(
        "@components/Popups/RequisitesPopup"
      );
      setLogoPopup(() => RequisitesPopup);
    }
    addPrefix();
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    removePrefix();
    setModalOpen(false);
  }, []);

  const descRef = useRef(null);

  const handleBlur = useCallback((element) => {
    if (element) {
      element.blur();
    }
  }, []);

  useEscapeKey(descRef, handleBlur);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes(pathPrefix)) {
      Promise.all([
        import("@components/ModalWrapper/ModalWrapper"),
        import("@components/Popups/RequisitesPopup"),
      ]).then(([{ default: ModalWrapper }, { default: RequisitesPopup }]) => {
        setModalWrapper(() => ModalWrapper);
        setLogoPopup(() => RequisitesPopup);
        setModalOpen(true);
      });
    }
  }, []);

  return (
    <>
      <a
        href="#"
        id="requisites"
        className="footer__top"
        onClick={handleOpenModal}
        ref={descRef}
      >
        <div className="footer__contacts">
          <ul
            tabIndex={0}
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
            tabIndex={0}
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
        <ul
          tabIndex={0}
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
      </a>

      {isModalOpen && ModalWrapperComponent && PopupComponent && (
        <Suspense>
          <ModalWrapperComponent
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          >
            <PopupComponent />
          </ModalWrapperComponent>
        </Suspense>
      )}
    </>
  );
};

export default FooterRequisites;
