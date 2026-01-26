"use client";
import { useLayoutEffect, useRef } from "react";
import { Firefly, FirefliesConfig } from "@/lib/fireflies";

type FirefliesEffectProps = {
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
  sizeRange = [4, 10],
  glow = true,
}: FirefliesEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const firefliesRef = useRef<Firefly[]>([]); // We use useRef for avoid re-renderings

  useLayoutEffect(() => {
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

    // Create the fireflies onlin once
    if (firefliesRef.current.length === 0) {
      const config: FirefliesConfig = { count, speed, flicker, colors, sizeRange, glow };
      for (let i = 0; i < count; i++) {
        firefliesRef.current.push(new Firefly(canvas, config));
      }
    }

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      firefliesRef.current.forEach((firefly) => {
        firefly.update();
        firefly.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    }
  });

  return <canvas ref={canvasRef} className="absolute object-cover top-0 left-0 w-screen h-full pointer-events-none" />;
};

export default FirefliesEffect;
