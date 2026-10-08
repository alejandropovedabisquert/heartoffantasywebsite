import type { MetadataRoute } from 'next'

// Las páginas de activación/reset no se bloquean aquí: llevan meta noindex,
// y si estuvieran bloqueadas Google no podría leerlo
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/']
    },
    sitemap: 'https://www.heartoffantasy.com/sitemap.xml',
  }
}
