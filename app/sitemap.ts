// app/sitemap.ts
import { MetadataRoute } from 'next';
import { locales, pathnames, Locale } from '@/lib/routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.heartoffantasy.com';
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Recorremos todas las rutas internas de tu aplicación
  for (const internalPath in pathnames) {
    const route = internalPath as keyof typeof pathnames;

    // Para cada ruta, generamos la URL en todos los idiomas disponibles
    locales.forEach((locale) => {
      const translatedSlug = pathnames[route][locale as Locale];
      
      // Si es inglés, lo dejamos en la raíz, si es otro idioma, le ponemos el prefijo
      const prefix = locale === 'en' ? '' : `/${locale}`;
      
      // Construimos el path final asegurándonos de que no haya dobles barras
      let path = `${prefix}${translatedSlug}`.replace(/\/+/g, '/');
      if (path !== '/' && path.endsWith('/')) {
        path = path.slice(0, -1);
      }
      if (path === '') path = '/';

      sitemapEntries.push({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly', // Ajusta según la frecuencia de actualización de tus páginas
        priority: path === '/' ? 1 : 0.8, // Dale prioridad 1 a la home, 0.8 al resto
      });
    });
  }

  return sitemapEntries;
}