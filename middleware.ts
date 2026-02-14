import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: routing.localeDetection,
  localePrefix: 'as-needed',
  pathnames: routing.pathnames
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirigir de /[locale]/activate?token=... a /activate?token=...
  const activatePathname = pathname.endsWith('/activate');
  if (activatePathname) {
    const segments = pathname.split('/');
    const lastSegment = segments.pop();
    const localeSegment = segments.pop();
    if (routing.locales.includes(localeSegment as (typeof routing.locales)[number])) {
      const newPathname = '/' + lastSegment + (request.nextUrl.search || '');
      return NextResponse.redirect(new URL(newPathname, request.url));
    }
  }

  // === Ejecutar el middleware de internacionalización ===
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};