import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/reset-password', '/forgot-password', '/activate', '/api/', '/_next/']
    },
    sitemap: 'https://www.heartoffantasy.com/sitemap.xml',
  }
}