import { useEffect, useRef } from "react";

function useMeta({ title = "", description = "" } = {}) {
  const prevRef = useRef({ title: "", description: "" });

  useEffect(() => {
    // Обновление <title>
    if (title && prevRef.current.title !== title) {
      document.title = title;
    }

    // Обновление <meta name="description">
    if (description && prevRef.current.description !== description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // Обновляем предыдущие значения
    prevRef.current = { title, description };
  }, [title, description]);
}

export default useMeta;
