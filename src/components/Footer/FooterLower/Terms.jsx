import { useState, useCallback, useRef, lazy, Suspense } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import { usePathPrefix } from "../../../hooks/usePathPrefix";
const ModalWrapper = lazy(() => import("../../ModalWrapper/ModalWrapper"));
const TermsPopup = lazy(() => import("../../Popups/TermsPopup"));

const Terms = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { addPrefix, removePrefix } = usePathPrefix(
    "terms",
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
      <Suspense fallback={null}>
        {isModalOpen && (
          <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
            <TermsPopup />
          </ModalWrapper>
        )}
      </Suspense>
    </>
  );
};

export default Terms;
