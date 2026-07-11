import Link from "next/link";
import { Locale, pathnames } from "@/lib/routes";
import clsx from "clsx";

const variantStyles: Record<string, string> = {
  link: "text-white hover:text-corporative",
  corporative:
    "p-2 bg-corporative text-white block w-fit transition-all hover:bg-white hover:text-black",
  contrast:
    "p-2 bg-white text-black block w-fit transition-all hover:bg-corporative hover:text-white",
};

interface LocalizedLinkProps extends React.ComponentProps<typeof Link> {
  href: keyof typeof pathnames | (string & {});
  variant?: "link" | "corporative" | "contrast";
  className?: string;
  locale: Locale;
  isExternal?: boolean
}

export default function LocalizedLink({
  href,
  locale,
  children,
  className,
  variant = "link",
  isExternal = false,
  ...rest
}: LocalizedLinkProps) {
  // Buscamos la traducción de la ruta, o usamos el href original como fallback
  const translatedPath = pathnames[href as keyof typeof pathnames]?.[locale] || href;

  // Construimos la URL final con el idioma
  let finalHref = `/${locale}${translatedPath}`;

  if(isExternal){
    finalHref = href
  }
  
  finalHref = finalHref.replace(/\/+/g, '/');
  if (finalHref !== '/' && finalHref.endsWith('/')) {
    finalHref = finalHref.slice(0, -1);
  }

  return (
    <Link
      href={finalHref}
      {...rest}
      className={clsx(
        "transition-colors duration-200",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
