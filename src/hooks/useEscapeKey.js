import { useEffect } from "react";

export function useEscapeKey(ref, callback) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (ref.current) {
          callback(ref.current);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [ref, callback]);
}
