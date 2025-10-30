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
const PrivacyPopup = lazy(() => import("../../Popups/PrivacyPopup"));

const Privacy = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const pathPrefix = "privacy";
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

      {isModalOpen && (
        <Suspense fallback={skipPreloader ? null : <Preloader />}>
          <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
            <PrivacyPopup />
          </ModalWrapper>
        </Suspense>
      )}
    </>
  );
};

export default Privacy;
