import "./FooterRequisites.css";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { usePathPrefix } from "@/hooks/usePathPrefix";
import { useMeta } from "@/hooks/useMetaTags";

export const FooterRequisites = () => {
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

  // состояние для мета-тегов
  const [meta, setMeta] = useState({
    title: "Игры от Честного Эйба",
    description:
      "Честный Эйб — начинающая студия разработки игр, создающая уникальные проекты для геймеров России и СНГ. Наш первый проект уже в разработке и скоро выйдет на RuStore. Следите за новостями, чтобы первыми узнать о релизе и стать частью нашего игрового сообщества!",
  });
  // вызов useMeta с текущими данными
  useMeta(meta);

  // переменная для хранения исходных значений мета-тегов
  const originalMetaRef = useRef({ title: "", description: "" });

  // при первом рендере сохраняем текущие мета-теги как исходные
  useEffect(() => {
    originalMetaRef.current = { ...meta };
  }, []);

  const handleOpenModal = async () => {
    if (!ModalWrapperComponent) {
      const { ModalWrapper } = await import(
        "@components/ModalWrapper/ModalWrapper"
      );
      setModalWrapper(() => ModalWrapper);
    }
    if (!PopupComponent) {
      const { RequisitesPopup } = await import(
        "@components/Popups/RequisitesPopup"
      );
      setLogoPopup(() => RequisitesPopup);
    }
    // обновляем мета-теги
    setMeta({
      title: "Requisites",
      description: "Страница Реквизиты",
    });
    addPrefix();
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    removePrefix();
    setModalOpen(false);
    // при закрытии восстанавливаем исходные мета-теги
    setMeta({ ...originalMetaRef.current });
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
      ]).then(([{ ModalWrapper }, { RequisitesPopup }]) => {
        setModalWrapper(() => ModalWrapper);
        setLogoPopup(() => RequisitesPopup);
        setModalOpen(true);
        // обновляем мета-теги при открытии
        setMeta({
          title: "Requisites",
          description: "Страница Реквизиты",
        });
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
