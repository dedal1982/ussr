import { useState, useCallback, useRef, lazy, Suspense } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { usePathPrefix } from "../../../hooks/usePathPrefix";
const ModalWrapper = lazy(() => import("../../ModalWrapper/ModalWrapper"));
const PrivacyPopup = lazy(() => import("../../Popups/PrivacyPopup"));

const Privacy = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { addPrefix, removePrefix } = usePathPrefix(
    "privacy",
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
      <Suspense fallback={null}>
        {isModalOpen && (
          <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
            <PrivacyPopup />
          </ModalWrapper>
        )}
      </Suspense>
    </>
  );
};

export default Privacy;
