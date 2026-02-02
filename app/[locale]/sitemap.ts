import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.heartoffantasy.com'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: baseUrl,
          es: `${baseUrl}/es`,
          ja: `${baseUrl}/ja`,
        },
      },
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: baseUrl,
          es: `${baseUrl}/es`,
          ja: `${baseUrl}/ja`,
        },
      },
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/ja`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: baseUrl,
          es: `${baseUrl}/es`,
          ja: `${baseUrl}/ja`,
        },
      },
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}