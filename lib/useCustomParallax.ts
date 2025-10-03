// TODO: Considera mover este hook personalizado a una carpeta "hooks/" para mayor claridad y organización.
"use client";
import { useState, useEffect } from "react";

export function useCustomParallax(speed: number) {
  const [offset, setOffset] = useState(0);

  const handleScroll = () => {
    setOffset(window.scrollY * speed);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return {
    style: {
      transform: `translateY(${offset}px)`,
    },
  };
}
