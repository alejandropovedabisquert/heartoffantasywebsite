import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.heartoffantasy.com'

  const alternatesHome = {
    languages: {
      en: baseUrl,
      es: `${baseUrl}/es`,
      ja: `${baseUrl}/ja`,
    },
  }

  const alternatesPrivacy = {
    languages: {
      en: `${baseUrl}/privacy-policy`,
      es: `${baseUrl}/es/politica-privacidad`,
      ja: `${baseUrl}/ja/プライバシーポリシー`,
    },
  }

  // const alternatesLegalNotice = {
  //   languages: {
  //     en: `${baseUrl}/legal-notice`,
  //     es: `${baseUrl}/es/aviso-legal`,
  //     ja: `${baseUrl}/ja/法的通知`,
  //   },
  // }

  const alternatesRegister = {
    languages: {
      en: `${baseUrl}/register`,
      es: `${baseUrl}/es/registro`,
      ja: `${baseUrl}/ja/登録`,
    },
  }

  return [
    // English (default locale)
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: alternatesHome,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      alternates: alternatesPrivacy,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // {
    //   url: `${baseUrl}/legal-notice`,
    //   lastModified: new Date(),
    //   alternates: alternatesLegalNotice,
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      alternates: alternatesRegister,
      changeFrequency: 'yearly',
      priority: 0.8,
    },

    // Spanish
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      alternates: alternatesHome,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/es/politica-privacidad`,
      lastModified: new Date(),
      alternates: alternatesPrivacy,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // {
    //   url: `${baseUrl}/es/aviso-legal`,
    //   lastModified: new Date(),
    //   alternates: alternatesLegalNotice,
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
    {
      url: `${baseUrl}/es/registro`,
      lastModified: new Date(),
      alternates: alternatesRegister,
      changeFrequency: 'yearly',
      priority: 0.8,
    },

    // Japanese
    {
      url: `${baseUrl}/ja`,
      lastModified: new Date(),
      alternates: alternatesHome,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/ja/プライバシーポリシー`,
      lastModified: new Date(),
      alternates: alternatesPrivacy,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    // {
    //   url: `${baseUrl}/ja/法的通知`,
    //   lastModified: new Date(),
    //   alternates: alternatesLegalNotice,
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
    {
      url: `${baseUrl}/ja/登録`,
      lastModified: new Date(),
      alternates: alternatesRegister,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
}