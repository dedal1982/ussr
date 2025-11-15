import "./Contacts.css";
import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { usePathPrefix } from "@/hooks/usePathPrefix";
import useMeta from "@/hooks/useMetaTags";

const Contacts = ({ className }) => {
  const [contactsText, setContactsText] = useState("Контакты");

  const handleMouseOver = (name) => {
    setContactsText(name);
  };

  const handleMouseOut = () => {
    setContactsText("Контакты");
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [ModalWrapperComponent, setModalWrapper] = useState(null);
  const [PopupComponent, setLogoPopup] = useState(null);
  const pathPrefix = "contacts";
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
      const { default: ModalWrapper } = await import(
        "@components/ModalWrapper/ModalWrapper"
      );
      setModalWrapper(() => ModalWrapper);
    }
    if (!PopupComponent) {
      const { default: ContactsPopup } = await import(
        "@components/Popups/ContactsPopup"
      );
      setLogoPopup(() => ContactsPopup);
    }
    // обновляем мета-теги
    setMeta({
      title: "Заголовок при открытии",
      description: "Описание при открытии модального окна",
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
        import("@components/Popups/ContactsPopup"),
      ]).then(([{ default: ModalWrapper }, { default: ContactsPopup }]) => {
        setModalWrapper(() => ModalWrapper);
        setLogoPopup(() => ContactsPopup);
        setModalOpen(true);
        // обновляем мета-теги при открытии
        setMeta({
          title: "Заголовок при открытии модального окна",
          description: "Описание при открытии модального окна",
        });
      });
    }
  }, []);

  return (
    <>
      <nav className={`contacts ${className || ""}`} aria-label="Контакты">
        <button
          id="header-contacts"
          className="contacts-name"
          onClick={handleOpenModal}
          ref={descRef}
          aria-haspopup="dialog"
        >
          {contactsText}
        </button>
        <ul className="contacts-phones">
          <li>
            <span />
            <a
              href="tel:+79165718989"
              data-name="Сайты"
              onMouseOver={() => handleMouseOver("Сайты")}
              onFocus={() => handleMouseOver("Сайты")}
              onMouseOut={handleMouseOut}
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
              onFocus={() => handleMouseOver("Игры")}
              onMouseOut={handleMouseOut}
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
              onFocus={() => handleMouseOver("Тестирование")}
              onMouseOut={handleMouseOut}
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
              onFocus={() => handleMouseOver("Симбиоз")}
              onMouseOut={handleMouseOut}
              onBlur={handleMouseOut}
            >
              +7 (985) 571-89-89
            </a>
          </li>
        </ul>
      </nav>

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

export default Contacts;
