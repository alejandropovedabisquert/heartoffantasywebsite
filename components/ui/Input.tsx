"use client"; 
import React, { useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

const Input: React.FC<{
  id?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: string;
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  id,
  placeholder,
  type = "text",
  className,
  name,
  value,
  required = false,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const currentType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="relative w-full my-4 transition-all duration-500 focus-within:scale-[1.02]">
      <input
        id={id}
        type={currentType}
        name={name}
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        className={clsx(
          "px-6 py-4 border w-full text-white bg-neutral-800 border-corporative focus:bg-[#372F2F] outline-none",
          type === "password" && "pr-12",
          className
        )}
        onChange={onChange}
        required={required}
      />
      
      {/* Renderizamos el botón solo si el tipo original era "password" */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;