// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: routing.localeDetection,
  localePrefix: 'as-needed', // Usa prefijo solo si no es el idioma por defecto
  pathnames: routing.pathnames
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
