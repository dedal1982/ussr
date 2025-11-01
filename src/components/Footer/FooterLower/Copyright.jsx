import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { usePathPrefix } from "@/hooks/usePathPrefix";

const Copyright = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [ModalWrapperComponent, setModalWrapper] = useState(null);
  const [PopupComponent, setLogoPopup] = useState(null);
  const pathPrefix = "copyright";
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
      const { default: CopyrightPopup } = await import(
        "@components/Popups/CopyrightPopup"
      );
      setLogoPopup(() => CopyrightPopup);
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
        import("@components/Popups/CopyrightPopup"),
      ]).then(([{ default: ModalWrapper }, { default: CopyrightPopup }]) => {
        setModalWrapper(() => ModalWrapper);
        setLogoPopup(() => CopyrightPopup);
        setModalOpen(true);
      });
    }
  }, []);

  return (
    <>
      <button
        id="copyright"
        className="footer__copyright-bottom"
        onClick={handleOpenModal}
        ref={descRef}
      >
        © ООО «Честный Эйб», 2019-2025
      </button>

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

export default Copyright;
