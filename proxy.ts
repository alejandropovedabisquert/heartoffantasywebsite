import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getInternalPath, locales, defaultLocale, Locale } from './lib/routes'; 

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // === SOLUCIÓN JAPONÉS: Decodificar la URL (/%E7%99%BB... -> /登録) ===
  const decodedPathname = decodeURI(pathname);

  // 1. Ignorar archivos estáticos, imágenes y APIs (usamos el pathname original por seguridad)
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  // 2. === Lógica de Activación de Cuentas ===
  if (decodedPathname.endsWith('/activate')) {
    const segments = decodedPathname.split('/');
    if (segments.length === 3) {
      const localeSegment = segments[1];
      if (locales.includes(localeSegment as Locale)) {
        const newPathname = '/activate' + (search || '');
        return NextResponse.redirect(new URL(newPathname, request.url));
      }
    }
  }

  // 3. === Lógica general de Internacionalización y Slugs ===
  const pathnameSegments = decodedPathname.split('/');
  const maybeLocale = pathnameSegments[1];
  const hasLocale = locales.includes(maybeLocale as Locale);

  // REDIRECCIÓN: Si la URL incluye el idioma por defecto explícitamente (/en/...), lo quitamos.
  if (maybeLocale === defaultLocale) {
    const newPath = decodedPathname.replace(`/${defaultLocale}`, '') || '/';
    const redirectUrl = new URL(newPath, request.url);
    redirectUrl.search = search;
    return NextResponse.redirect(redirectUrl);
  }

  // Determinamos el locale actual.
  const currentLocale = hasLocale ? maybeLocale : defaultLocale;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', currentLocale);

  // Obtenemos la ruta sin el locale de forma segura
  let pathWithoutLocale = hasLocale 
    ? `/${pathnameSegments.slice(2).join('/')}`
    : decodedPathname;

  // Limpieza de slashes
  if (pathWithoutLocale !== '/' && pathWithoutLocale.endsWith('/')) {
    pathWithoutLocale = pathWithoutLocale.slice(0, -1);
  }
  if (pathWithoutLocale === '') pathWithoutLocale = '/';

  // Buscar si esta ruta pública mapea a una ruta interna
  const internalPath = getInternalPath(pathWithoutLocale, currentLocale);

  if (internalPath) {
    const rewriteUrl = new URL(`/${currentLocale}${internalPath}`, request.url);
    rewriteUrl.search = search;
    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      }
    });
  }

  if (!hasLocale) {
    const rewriteUrl = new URL(`/${defaultLocale}${decodedPathname}`, request.url);
    rewriteUrl.search = search;
    return NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      }
    });
  }

  return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};