import { useEffect } from "react";

/**
 * Custom hook to lock/unlock body scroll.
 * When isLocked is true, sets overflow: hidden on body and documentElement.
 * Automatically cleans up on unmount.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isLocked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
      document.documentElement.style.removeProperty("overflow");
    };
  }, [isLocked]);
}
