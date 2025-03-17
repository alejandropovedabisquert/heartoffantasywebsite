"use client";
import { useState, useEffect } from "react";

export function useCustomParallax(speed: number) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, speed]);

  return {
    style: {
      transform: `translateY(${offset}px)`,
    },
  };
}
