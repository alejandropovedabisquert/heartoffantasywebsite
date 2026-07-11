import { locales, pathnames, Locale } from '@/lib/routes';

/**
 * Genera el diccionario de URLs alternativas (hreflang) para una ruta interna específica.
 * @param internalPath La clave de la ruta original (ej. "/", "/privacy-policy")
 * @returns Un objeto con los idiomas como claves y sus URLs traducidas como valores
 */
export function getAlternateLanguages(internalPath: keyof typeof pathnames) {
  const languages: Record<string, string> = {};

  locales.forEach((locale) => {
    // Obtenemos el slug traducido
    const translatedSlug = pathnames[internalPath][locale as Locale];
    
    // Si es inglés, no hay prefijo de idioma en la URL
    const prefix = locale === 'en' ? '' : `/${locale}`;
    
    // Unimos y limpiamos posibles dobles barras
    let finalPath = `${prefix}${translatedSlug}`.replace(/\/+/g, '/');
    
    // Limpiamos la barra final si no es la ruta raíz estricta (ej "/es/" -> "/es")
    if (finalPath !== '/' && finalPath.endsWith('/')) {
      finalPath = finalPath.slice(0, -1);
    }

    languages[locale] = finalPath;
  });

  return languages;
}