import { Locale } from "../routes";

// FUNCIONALIDAD DE COOKIES SOLO PARA EL CLIENT SIDE NO PARA SERVER SIDE

export function setCookieClient({
  name,
  data,
  maxAge = 31536000, // Por defecto 1 año
}: {
  name: string;
  data: string;
  maxAge?: number;
}) {
  // Protección: Si no estamos en el navegador, no hacemos nada
  if (typeof document === "undefined") return;
  
  document.cookie = `${name}=${encodeURIComponent(data)};path=/;max-age=${maxAge}`;
}

export function getCookieClient({
  name,
}: {
  name: string;
}): string | undefined {
  if (typeof document === "undefined") return undefined;
  
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) {
    try {
      return decodeURIComponent(match[2]);
    } catch {
      return match[2];
    }
  }
  return undefined;
}

export function hasCookieClient({
  name,
}: {
  name: string;
}): boolean {
  return getCookieClient({ name }) !== undefined;
}

export function removeCookieClient({
  name,
}: {
  name: string;
}) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=;path=/;max-age=0`;
}

export function updateLocaleCookieClient(newLocale: Locale) {
  const consentCookie = getCookieClient({ name: "cookie-consent" });

  if (consentCookie) {
    try {
      const consent = JSON.parse(consentCookie);
      if (consent.preferences) {
        setCookieClient({ name: "lang", data: newLocale });
      }
    } catch (e) {
      console.error("Error parseando las preferencias de cookies:", e);
    }
  }
}