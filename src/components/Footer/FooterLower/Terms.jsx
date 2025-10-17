import { useState, useCallback, useRef } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import TermsPopup from "../../Popups/TermsPopup";

const Terms = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
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
      <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
        <TermsPopup />
      </ModalWrapper>
    </>
  );
};

export default Terms;
