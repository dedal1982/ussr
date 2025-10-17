import { useState, useCallback, useRef } from "react";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
import ModalWrapper from "../../ModalWrapper/ModalWrapper";
import CopyrightPopup from "../../Popups/CopyrightPopup";

const Copyright = () => {
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
      <button
        id="copyright"
        className="footer__copyright-bottom"
        onClick={handleOpenModal}
        ref={descRef}
      >
        © ООО «Честный Эйб», 2019-2025
      </button>
      <ModalWrapper isOpen={isModalOpen} onClose={handleCloseModal}>
        <CopyrightPopup />
      </ModalWrapper>
    </>
  );
};

export default Copyright;
