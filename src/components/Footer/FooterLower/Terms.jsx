import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { usePathPrefix } from "@/hooks/usePathPrefix";
import useMeta from "@/hooks/useMetaTags";

const Terms = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [ModalWrapperComponent, setModalWrapper] = useState(null);
  const [PopupComponent, setLogoPopup] = useState(null);
  const pathPrefix = "terms";
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
      const { default: TermsPopup } = await import(
        "@components/Popups/TermsPopup"
      );
      setLogoPopup(() => TermsPopup);
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
        import("@components/Popups/TermsPopup"),
      ]).then(([{ default: ModalWrapper }, { default: TermsPopup }]) => {
        setModalWrapper(() => ModalWrapper);
        setLogoPopup(() => TermsPopup);
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
      <li>
        <a
          href=""
          id="terms"
          className="footer__link"
          onClick={(e) => {
            e.preventDefault();
            handleOpenModal();
          }}
          ref={descRef}
        >
          «Пользовательское соглашение»
        </a>
      </li>

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

export default Terms;
