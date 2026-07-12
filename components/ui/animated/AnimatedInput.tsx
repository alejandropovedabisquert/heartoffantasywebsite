"use client";

import { motion } from "framer-motion";
import Input from "@/components/ui/Input";

interface AnimatedInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  direction?: "left" | "right"; // Para alternar de dónde entra la animación
}

export function AnimatedInput({
  id,
  type,
  placeholder,
  value,
  error,
  onChange,
  direction = "right",
}: AnimatedInputProps) {
  const initialX = direction === "right" ? 50 : -50;

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="text-red-600">
          <p>{error}</p>
        </div>
      )}
    </motion.div>
  );
}