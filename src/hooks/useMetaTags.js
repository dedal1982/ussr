import { useEffect, useRef } from "react";

function useMeta({ title, description }) {
  const prevRef = useRef({ title: "", description: "" });

  useEffect(() => {
    if (title && prevRef.current.title !== title) {
      document.title = title;
    }
    if (description && prevRef.current.description !== description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }
    prevRef.current = { title, description };
  }, [title, description]);
}

export default useMeta;
