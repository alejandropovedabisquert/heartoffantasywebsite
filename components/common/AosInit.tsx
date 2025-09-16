"use client"

import { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
    //   easing: 'ease-out-quad',
      once: true,
      duration: 500,
    });
  }, [])

  return null
}