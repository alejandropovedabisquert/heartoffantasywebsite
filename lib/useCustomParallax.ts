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
  }, []);

  return {
    style: {
      transform: `translateY(${offset}px)`,
    },
  };
}
