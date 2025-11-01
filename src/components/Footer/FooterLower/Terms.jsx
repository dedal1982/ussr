import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { usePathPrefix } from "@/hooks/usePathPrefix";

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
        import("@components/Popups/TermsPopup"),
      ]).then(([{ default: ModalWrapper }, { default: TermsPopup }]) => {
        setModalWrapper(() => ModalWrapper);
        setLogoPopup(() => TermsPopup);
        setModalOpen(true);
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
