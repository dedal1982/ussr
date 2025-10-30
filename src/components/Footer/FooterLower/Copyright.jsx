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
const CopyrightPopup = lazy(() => import("../../Popups/CopyrightPopup"));

const Copyright = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const pathPrefix = "copyright";
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

      {isModalOpen && (
        <Suspense fallback={skipPreloader ? null : <Preloader />}>
          <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
            <CopyrightPopup />
          </ModalWrapper>
        </Suspense>
      )}
    </>
  );
};

export default Copyright;
