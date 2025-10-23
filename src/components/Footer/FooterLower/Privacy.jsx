import { useState, useCallback, useRef, useEffect } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import PrivacyPopup from "../../Popups/PrivacyPopup";

const Privacy = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const descRef = useRef(null);

  const handleOpenModal = () => {
    if (!window.location.pathname.includes("privacy")) {
      const newPath = `${window.location.pathname}${
        window.location.pathname.endsWith("/") ? "" : "/"
      }privacy`;
      history.pushState(null, "", newPath);
    }
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    const path = window.location.pathname;
    if (path.includes("privacy")) {
      const newPath = path.replace(/\/?privacy\/?/, "") || "/";
      history.replaceState(null, "", newPath);
    }
    setModalOpen(false);
  }, []);

  const handleBlur = useCallback((element) => {
    if (element) {
      element.blur();
    }
  }, []);

  useEscapeKey(descRef, handleBlur);

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      if (path.includes("privacy")) {
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }
    };

    window.addEventListener("popstate", onPopState);
    if (window.location.pathname.includes("privacy")) {
      setModalOpen(true);
    }

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
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
      <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
        <PrivacyPopup />
      </ModalWrapper>
    </>
  );
};

export default Privacy;
