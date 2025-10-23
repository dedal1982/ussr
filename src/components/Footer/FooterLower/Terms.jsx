import { useState, useCallback, useRef, useEffect } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import TermsPopup from "../../Popups/TermsPopup";

const Terms = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const descRef = useRef(null);

  const handleOpenModal = () => {
    if (!window.location.pathname.includes("terms")) {
      const newPath = `${window.location.pathname}${
        window.location.pathname.endsWith("/") ? "" : "/"
      }terms`;
      history.pushState(null, "", newPath);
    }
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    const path = window.location.pathname;
    if (path.includes("terms")) {
      const newPath = path.replace(/\/?terms\/?/, "") || "/";
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
      if (path.includes("terms")) {
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }
    };

    window.addEventListener("popstate", onPopState);
    if (window.location.pathname.includes("terms")) {
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
      <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
        <TermsPopup />
      </ModalWrapper>
    </>
  );
};

export default Terms;
