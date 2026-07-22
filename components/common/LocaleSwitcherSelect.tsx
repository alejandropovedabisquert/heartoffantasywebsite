"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { Locale, locales, pathnames } from "@/lib/routes";
import { usePathname, useRouter } from "next/navigation";
import { updateLocaleCookieClient } from "@/lib/utils/clientCookies";

export default function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const heightRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const pathname = usePathname();
  const router = useRouter();

  const languageLabels = {
    en: "English",
    es: "Español",
    ca: "Català",
    ja: "日本語",
  };

  // Recalcular altura cada vez que se abre el dropdown
  const recalculateHeight = useCallback(() => {
    if (heightRef.current) {
      setHeight(heightRef.current.scrollHeight);
    }
  }, []);

  // Cerrar el dropdown y recalcular al cambiar el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    if (!open) {
      // Recalcular altura antes de abrir
      recalculateHeight();
    }
    setOpen(!open);
  };

  // También recalcular después del render cuando se abre
  useEffect(() => {
    if (open) {
      recalculateHeight();
    }
  }, [open, recalculateHeight]);

  const handleLocaleChange = async (newLocale: Locale) => {
    const decodedPathname = decodeURI(pathname);
    const parts = decodedPathname.split("/");
    const maybeLocale = parts[1];
    
    const isLocalePresent = locales.includes(maybeLocale as Locale);
    
    updateLocaleCookieClient(newLocale);

    let currentPathWithoutLocale = isLocalePresent
      ? `/${parts.slice(2).join("/")}`
      : decodedPathname;

    if (currentPathWithoutLocale !== "/" && currentPathWithoutLocale.endsWith("/")) {
      currentPathWithoutLocale = currentPathWithoutLocale.slice(0, -1);
    }
    if (currentPathWithoutLocale === "") {
      currentPathWithoutLocale = "/";
    }

    let internalPath = currentPathWithoutLocale;
    for (const [key, translations] of Object.entries(pathnames)) {
      if (
        translations[currentLocale as keyof typeof translations] ===
        currentPathWithoutLocale
      ) {
        internalPath = key;
        break;
      }
    }

    const newTranslatedPath = pathnames[internalPath as keyof typeof pathnames]?.[newLocale as Locale] || internalPath;

    const newUrl = `/${newLocale}${newTranslatedPath}`;
    
    const finalUrl = newUrl.replace(/\/+/g, '/');

    router.push(finalUrl);
    router.refresh();
  };
  return (
    <div className="relative">
      <div
        className="flex gap-2 items-center justify-center bg-corporative p-2 cursor-pointer transition-all hover:bg-white hover:text-black"
        onClick={handleToggle}
      >
        <Globe />
        {languageLabels[currentLocale as Locale] || currentLocale.toUpperCase()}
      </div>

      <div
        ref={heightRef}
        className={`text-center overflow-hidden bg-corporative transition-all absolute left-0 right-0 z-50`}
        style={open ? { height: `${height}px` } : { height: 0 }}
      >
        {locales.map(
          (cur) =>
            cur !== currentLocale && (
              <button
                key={cur}
                onClick={() => handleLocaleChange(cur)}
                className="p-2 cursor-pointer block w-full bg-corporative transition-all hover:bg-white hover:text-black"
              >
                {languageLabels[cur] || cur.toUpperCase()}
              </button>
            ),
        )}
      </div>
    </div>
  );
}

