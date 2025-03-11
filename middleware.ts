import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es'], // Idiomas soportados
  defaultLocale: 'en',   // Idioma por defecto
  localePrefix: 'as-needed', // Evita el prefijo para el idioma por defecto
  localeDetection: false, // Desactiva la detección automática de idioma
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'], // Excluye rutas de API y archivos estáticos
};