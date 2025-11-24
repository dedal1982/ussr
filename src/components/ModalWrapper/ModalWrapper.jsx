import "./ModalWrapper.css";
import { useEffect, useRef, useCallback, memo } from "react";
import { createPortal } from "react-dom";

const Overlay = memo(({ children, onClose }) => {
  const overlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    if (overlayRef.current && e.target === overlayRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      id="overlay"
      className="overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div className="overlay-content">
        <button
          className="overlay-close"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 490 490"
            style={{ enableBackground: "new 0 0 490 490" }}
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M76.563,490h336.875C455.547,490,490,455.547,490,413.438V76.563C490,34.453,455.547,0,413.437,0H76.563 C34.453,0,0,34.453,0,76.563v336.875C0,455.547,34.453,490,76.563,490z M124.835,175.445l50.61-50.611L245,194.39l69.555-69.555 l50.61,50.611L295.611,245l69.555,69.555l-50.61,50.611L245,295.611l-69.555,69.555l-50.61-50.61L194.389,245L124.835,175.445z"
                className="close-icon"
              />
            </g>
          </svg>
        </button>
        <div className="overlay-inner">{children}</div>
      </div>
    </div>
  );
});

export const ModalWrapper = memo(({ isOpen, onClose, children }) => {
  // мемоизируем onClose
  const memoizedOnClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (!rootElement) return;

    if (isOpen) {
      // при открытии попапа скрываем прокрутку
      rootElement.style.overflow = "hidden";
    } else {
      // при закрытии восстанавливаем
      rootElement.style.overflow = "";
    }

    // Очистка при размонтировании или изменении isOpen
    return () => {
      rootElement.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <Overlay onClose={memoizedOnClose}>{children}</Overlay>,
    document.body
  );
});
