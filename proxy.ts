import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getInternalPath, locales, defaultLocale, Locale } from './lib/routes'; 

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // === SOLUCIÓN JAPONÉS: Decodificar la URL (/%E7%99%BB... -> /登録) ===
  const decodedPathname = decodeURI(pathname);

  // Ignorar archivos estáticos, imágenes y APIs (usamos el pathname original por seguridad)
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  // === Lógica general de Internacionalización y Slugs ===
  const pathnameSegments = decodedPathname.split('/');
  const maybeLocale = pathnameSegments[1];
  const hasLocale = locales.includes(maybeLocale as Locale);

  // Identificar qué idioma está pidiendo la URL en este momento
  const currentUrlLocale = hasLocale ? maybeLocale : defaultLocale;

  // === NUEVA LÓGICA DE COOKIES ===
  const localeCookie = request.cookies.get('lang')?.value as Locale | undefined;

  // Si tiene cookie válida y NO coincide con el idioma de la URL actual, redirigimos
  if (localeCookie && locales.includes(localeCookie) && localeCookie !== currentUrlLocale) {
    
    // Extraemos la ruta pura, ignorando el idioma en el que esté actualmente
    let pathWithoutLocale = hasLocale 
      ? `/${pathnameSegments.slice(2).join('/')}`
      : decodedPathname;

    if (pathWithoutLocale !== '/' && pathWithoutLocale.endsWith('/')) {
      pathWithoutLocale = pathWithoutLocale.slice(0, -1);
    }
    if (pathWithoutLocale === '') pathWithoutLocale = '/';

    // Construimos la nueva ruta. Si la cookie es el idioma por defecto, va sin prefijo.
    const redirectPath = localeCookie === defaultLocale
      ? pathWithoutLocale
      : `/${localeCookie}${pathWithoutLocale}`;

    const redirectUrl = new URL(redirectPath, request.url);
    redirectUrl.search = search;
    return NextResponse.redirect(redirectUrl);
  }
  // ===============================

  // REDIRECCIÓN: Si la URL incluye el idioma por defecto explícitamente (/en/...), lo quitamos.
  if (maybeLocale === defaultLocale) {
    const newPath = decodedPathname.replace(`/${defaultLocale}`, '') || '/';
    const redirectUrl = new URL(newPath, request.url);
    redirectUrl.search = search;
    return NextResponse.redirect(redirectUrl);
  }

  // Determinamos el locale actual para los headers (reaprovechamos la variable de arriba)
  const currentLocale = currentUrlLocale;
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};