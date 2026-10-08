import { locales, defaultLocale, getLocalizedPath, InternalPath } from '@/lib/routes';

/**
 * Genera el diccionario de URLs alternativas (hreflang) para una ruta interna específica.
 * @param internalPath La clave de la ruta original (ej. "/", "/privacy-policy")
 * @returns Un objeto con los idiomas como claves y sus URLs traducidas como valores (incluye x-default)
 */
export function getAlternateLanguages(internalPath: InternalPath) {
  const languages: Record<string, string> = {};

  locales.forEach((locale) => {
    languages[locale] = getLocalizedPath(internalPath, locale);
  });

  // x-default apunta a la versión del idioma por defecto
  languages['x-default'] = getLocalizedPath(internalPath, defaultLocale);

  return languages;
}
