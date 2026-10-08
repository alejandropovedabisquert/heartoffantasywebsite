// app/sitemap.ts
import { MetadataRoute } from 'next';
import { locales, pathnames, noIndexPaths, InternalPath } from '@/lib/routes';
import { getAlternateLanguages } from '@/lib/utils/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.heartoffantasy.com';
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Recorremos todas las rutas internas de tu aplicación
  for (const internalPath in pathnames) {
    const route = internalPath as InternalPath;

    // Las rutas noindex (activación, reset de contraseña...) no van al sitemap
    if (noIndexPaths.includes(route)) continue;

    // Codificamos las URLs (necesario para los slugs en japonés)
    const languages = Object.fromEntries(
      Object.entries(getAlternateLanguages(route)).map(([lang, path]) => [lang, encodeURI(`${baseUrl}${path}`)])
    );

    // Para cada ruta, generamos la URL en todos los idiomas disponibles
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: languages[locale],
        alternates: { languages },
      });
    });
  }

  return sitemapEntries;
}
