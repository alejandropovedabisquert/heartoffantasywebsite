import React from 'react';

type ButtonVariant = 'link' | 'corporative' | 'contrast';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  link: "text-white cursor-pointer hover:text-corporative",
  corporative:
    "p-2 cursor-pointer bg-corporative text-white block w-fit transition-all hover:bg-white hover:text-black",
  contrast:
    "p-2 cursor-pointer bg-white text-black block w-fit transition-all hover:bg-corporative hover:text-white",
};

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'corporative', // Variante por defecto
  className = '',          // Permite añadir clases extra al instanciar el componente
  children, 
  ...props                 // Recoge onClick, disabled, type, etc.
}) => {
  
  // Combinamos las clases de la variante seleccionada con las clases adicionales
  const buttonClasses = `${variantStyles[variant]} ${className}`.trim();

  return (
    <button 
      className={buttonClasses} 
      {...props} 
    >
      {children}
    </button>
  );
};