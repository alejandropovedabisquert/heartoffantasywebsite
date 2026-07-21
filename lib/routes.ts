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
  "/cookies": {
    en: "/cookies",
    es: "/cookies",
    ca: "/cookies",
    ja: "/cookies",
  }
} as const;

export type Locale = (typeof locales)[number]

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
