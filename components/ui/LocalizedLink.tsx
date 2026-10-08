import Link from "next/link";
import { defaultLocale, getLocalizedPath, isInternalPath, Locale, pathnames } from "@/lib/routes";
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
  // Construimos la URL pública final (sin /en ni barra final) para evitar redirecciones.
  // Si la ruta no está mapeada, usamos el href original con el prefijo del idioma como fallback
  let finalHref = isInternalPath(href)
    ? getLocalizedPath(href, locale)
    : `${locale === defaultLocale ? "" : `/${locale}`}${href}`;

  if(isExternal){
    finalHref = href
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
