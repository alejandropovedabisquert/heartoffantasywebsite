"use client";
import { useEffect, useRef } from "react";
import { Firefly, FirefliesConfig } from "@/lib/fireflies";

interface FirefliesEffectProps {
  count?: number;
  speed?: number;
  flicker?: boolean;
  colors?: string[];
  sizeRange?: [number, number];
  glow?: boolean;
}

const FirefliesEffect = ({
  count = 80,
  speed = 1.5,
  flicker = true,
  colors = ["#FFD700", "#FF4500", "#00FF00", "#1E90FF", "#FF69B4"],
  sizeRange = [4, 10], // Tamaños entre 4px y 10px
  glow = true,
}: FirefliesEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const firefliesRef = useRef<Firefly[]>([]); // 🔥 Usamos useRef para evitar re-renderizados

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = document.getElementsByTagName("main")[0].scrollWidth;
      canvas.height = document.getElementsByTagName("main")[0].scrollHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Crear las luciérnagas solo una vez
    if (firefliesRef.current.length === 0) {
      const config: FirefliesConfig = { count, speed, flicker, colors, sizeRange, glow };
      for (let i = 0; i < count; i++) {
        firefliesRef.current.push(new Firefly(canvas, config));
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      firefliesRef.current.forEach((firefly) => {
        firefly.update();
        firefly.draw(ctx);
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [count, speed, flicker, colors, sizeRange, glow]); // 🔥 Dependencias correctas

  return <canvas ref={canvasRef} className="absolute object-cover top-0 left-0 w-screen h-full" />;
};

export default FirefliesEffect;
