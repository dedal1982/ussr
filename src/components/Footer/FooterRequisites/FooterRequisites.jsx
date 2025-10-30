import "./FooterRequisites.css";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  lazy,
  Suspense,
} from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { usePathPrefix } from "../../../hooks/usePathPrefix";
import Preloader from "../../Preloader/Preloader";

const ModalWrapper = lazy(() => import("../../ModalWrapper/ModalWrapper"));
const RequisitesPopup = lazy(() => import("../../Popups/RequisitesPopup"));

const FooterRequisites = () => {
  const [active, setActive] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const pathPrefix = "requisites";
  const [skipPreloader, setSkipPreloader] = useState(false);
  const { addPrefix, removePrefix } = usePathPrefix(
    pathPrefix,
    (isPopupPath) => {
      setModalOpen(isPopupPath);
    }
  );

  const handleOpenModal = () => {
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
      setSkipPreloader(true);
    } else {
      setSkipPreloader(false);
    }
  }, []);

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

      {isModalOpen && (
        <Suspense fallback={skipPreloader ? null : <Preloader />}>
          <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
            <RequisitesPopup />
          </ModalWrapper>
        </Suspense>
      )}
    </>
  );
};

export default FooterRequisites;
