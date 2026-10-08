export const locales = ["en", "es", "ca", "ja"] as const;
export const defaultLocale = "en";

// Mapeamos la ruta interna hacia sus traducciones públicas
export const pathnames = {
  "/": {
    en: "/",
    es: "/",
    ca: "/",
    ja: "/",
  },
  "/privacy-policy": {
    en: "/privacy-policy",
    es: "/politica-privacidad",
    ca: "/politica-privacitat",
    ja: "/プライバシーポリシー",
  },
  "/register": {
    en: "/register",
    es: "/registro",
    ca: "/registre",
    ja: "/登録",
  },
  "/activate": {
    en: "/activate",
    es: "/activate",
    ca: "/activate",
    ja: "/activate",
  },
  "/forgot-password": {
    en: "/forgot-password",
    es: "/forgot-password",
    ca: "/forgot-password",
    ja: "/forgot-password",
  },
  "/reset-password": {
    en: "/reset-password",
    es: "/reset-password",
    ca: "/reset-password",
    ja: "/reset-password",
  },
  "/cookies": {
    en: "/cookies",
    es: "/cookies",
    ca: "/cookies",
    ja: "/cookies",
  }
} as const;

export type Locale = (typeof locales)[number]

export type InternalPath = keyof typeof pathnames;

// Rutas que no deben indexarse (noindex) ni aparecer en el sitemap
export const noIndexPaths: InternalPath[] = ["/activate", "/forgot-password", "/reset-password"];

export function isInternalPath(path: string): path is InternalPath {
  return Object.prototype.hasOwnProperty.call(pathnames, path);
}

// Devuelve la URL pública final de una ruta interna (sin prefijo para el idioma por defecto
// y sin barra final), para que enlaces, hreflang y sitemap apunten siempre a la URL definitiva
export function getLocalizedPath(internalPath: InternalPath, locale: Locale): string {
  const translatedSlug = pathnames[internalPath][locale];
  const prefix = locale === defaultLocale ? "" : `/${locale}`;

  let path = `${prefix}${translatedSlug}`.replace(/\/+/g, "/");
  if (path !== "/" && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path || "/";
}

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Función inversa para el Middleware:
// Dado un locale y un pathname público (ej. '/nosotros'), devuelve la ruta interna ('/about')
export function getInternalPath(
  publicPath: string,
  locale: string,
): string | null {
  for (const [internalPath, translations] of Object.entries(pathnames)) {
    if (translations[locale as keyof typeof translations] === publicPath) {
      return internalPath;
    }
  }
  return null;
}
