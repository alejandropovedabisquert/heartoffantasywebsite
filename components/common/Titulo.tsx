import clsx from "clsx";
import React from "react";

export const Titulo = ({
  as: Component = 'h1',
  children,
  className = '',
  position,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  position?: string;
}) => {
  const baseStyles = clsx(
    "uppercase tracking-widest grid grid-cols-title grid-rows-title gap-4",
    "before:content-[''] before:block before:border-b-2 before:border-red-700",
    "after:content-[''] after:block after:border-b-2 after:border-red-700",
    {
      "md:grid-cols-left-side": position == "left",
      "md:grid-cols-right-side": position == "right",
    }
  );

  return (
    <Component className={`${baseStyles} ${className}`}>
      {children}
    </Component>
  );
};
