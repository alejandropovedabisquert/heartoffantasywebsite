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
    "uppercase tracking-widest gap-4 mb-12",
    "flex sm:grid sm:grid-cols-title sm:grid-rows-title",
    "before:content-[''] before:block before:border-b-2 before:border-transparent before:md:border-corporative",
    "after:content-[''] after:block after:border-b-2",
    {
      "md:grid-cols-left-side after:border-transparent": position == "left",
      "md:grid-cols-right-side": position == "right",
      "after:md:border-corporative": position == "center",
    }
  );

  return (
    <Component className={`${baseStyles} ${className}`}>
      <span>
        <span className="text-corporative">#</span>{children}
      </span>
    </Component>
  );
};
