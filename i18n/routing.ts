import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  localeDetection: false,

    // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    '/legal-notice': {
      en: '/legal-notice',
      es: '/aviso-legal'
    },
    '/privacy-policy': {
      en: '/privacy-policy',
      es: '/politica-privacidad'
    },
    '/pre-register': {
      en: '/pre-register',
      es: '/pre-registro'
    }
  }
});

export type Locale = (typeof routing.locales)[number];