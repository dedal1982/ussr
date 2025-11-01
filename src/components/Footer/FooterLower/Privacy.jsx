import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { usePathPrefix } from "@/hooks/usePathPrefix";

const Privacy = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [ModalWrapperComponent, setModalWrapper] = useState(null);
  const [PopupComponent, setLogoPopup] = useState(null);
  const pathPrefix = "privacy";
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
      const { default: PrivacyPopup } = await import(
        "@components/Popups/PrivacyPopup"
      );
      setLogoPopup(() => PrivacyPopup);
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
        import("@components/Popups/PrivacyPopup"),
      ]).then(([{ default: ModalWrapper }, { default: PrivacyPopup }]) => {
        setModalWrapper(() => ModalWrapper);
        setLogoPopup(() => PrivacyPopup);
        setModalOpen(true);
      });
    }
  }, []);

  return (
    <>
      <li>
        <a
          href=""
          id="privacy"
          className="footer__link"
          onClick={(e) => {
            e.preventDefault();
            handleOpenModal();
          }}
          ref={descRef}
        >
          «Политика конфиденциальности»
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

export default Privacy;
