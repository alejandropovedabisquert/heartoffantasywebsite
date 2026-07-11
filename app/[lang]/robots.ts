import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/activate'
    },
    sitemap: 'https://www.heartoffantasy.com/sitemap.xml',
  }
}