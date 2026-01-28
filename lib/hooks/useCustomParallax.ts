"use client";
import { useState, useEffect, useCallback } from "react";

type ParallaxOptions = {
  factor?: number; // 0.2 = 20% del scroll, default: 0.1
  axis?: "y" | "x"; // default: "y"
  invert?: boolean; // default: false
  initialOffset?: number; // default: 0
};

export function useCustomParallax(options: ParallaxOptions = {}) {
  const {
    factor = 0.1,
    axis = "y",
    invert = false,
    initialOffset = 0,
  } = options;

  const [offset, setOffset] = useState(initialOffset);

  const handleScroll = useCallback(() => {
    const value = axis === "y" ? window.scrollY : window.scrollX;
    setOffset((invert ? -1 : 1) * value * factor);
  }, [axis, factor, invert]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return {
    style: {
      transform: axis === "y"
        ? `translateY(${offset}px)`
        : `translateX(${offset}px)`,
    },
    offset,
  };
}