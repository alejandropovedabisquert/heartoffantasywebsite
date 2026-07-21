"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation"; // 1. Importamos usePathname
import { Firefly, FirefliesConfig } from "@/lib/utils/fireflies";

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
  const firefliesRef = useRef<Firefly[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mainElement = document.getElementsByTagName("main")[0];

    const resizeCanvas = () => {
      if (mainElement) {
        canvas.width = mainElement.scrollWidth;
        canvas.height = mainElement.scrollHeight; 
      }
    };

    resizeCanvas();
    
    window.addEventListener("resize", resizeCanvas);

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (mainElement) {
      resizeObserver.observe(mainElement);
    }

    if (firefliesRef.current.length === 0) {
      const config: FirefliesConfig = { count, speed, flicker, colors, sizeRange, glow };
      for (let i = 0; i < count; i++) {
        firefliesRef.current.push(new Firefly(canvas, config));
      }
    }

    let animationFrameId: number;

    const animate = () => {
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
      resizeObserver.disconnect();
    };
  }, [pathname]);

  return <canvas ref={canvasRef} className="absolute object-cover top-0 left-0 w-screen h-auto pointer-events-none" />;
};

export default FirefliesEffect;