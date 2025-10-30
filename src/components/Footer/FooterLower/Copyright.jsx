import { useState, useCallback, useRef, lazy, Suspense } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { usePathPrefix } from "../../../hooks/usePathPrefix";
const ModalWrapper = lazy(() => import("../../ModalWrapper/ModalWrapper"));
const CopyrightPopup = lazy(() => import("../../Popups/CopyrightPopup"));

const Copyright = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { addPrefix, removePrefix } = usePathPrefix(
    "copyright",
    (isPrivacyPath) => {
      setModalOpen(isPrivacyPath);
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
      <Suspense fallback={null}>
        {isModalOpen && (
          <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
            <CopyrightPopup />
          </ModalWrapper>
        )}
      </Suspense>
    </>
  );
};

export default Copyright;
