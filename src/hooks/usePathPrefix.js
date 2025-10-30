// usePathPrefix.js
import { useEffect, useCallback } from "react";

export function usePathPrefix(prefix, callback) {
  const addPrefix = useCallback(() => {
    const { pathname } = window.location;
    if (!pathname.includes(prefix)) {
      const newPath = `${pathname}${
        pathname.endsWith("/") ? "" : "/"
      }${prefix}`;
      history.pushState(null, "", newPath);
    }
  }, [prefix]);

  const removePrefix = useCallback(() => {
    const { pathname } = window.location;
    if (pathname.includes(prefix)) {
      const newPath =
        pathname.replace(new RegExp(`\/?${prefix}\/?`), "") || "/";
      history.replaceState(null, "", newPath);
    }
  }, [prefix]);

  const handlePopState = useCallback(() => {
    const path = window.location.pathname;
    if (path.includes(prefix)) {
      callback(true);
    } else {
      callback(false);
    }
  }, [prefix, callback]);

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    handlePopState();

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handlePopState]);

  return { addPrefix, removePrefix };
}
