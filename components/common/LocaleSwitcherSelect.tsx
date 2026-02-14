"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";
import { usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const [open, setOpen] = useState<boolean>(false);
  const heightRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  const t = useTranslations("LocaleSwitcher");
  const currentLocale = useLocale();
  const pathname = usePathname();

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

  const handleLocaleChange = (newLocale: string) => {
    const newUrl = `/${newLocale}${pathname}`;
    window.location.href = newUrl;
  };

  return (
    <div className="relative">
      <div
        className="flex gap-2 items-center justify-center bg-corporative p-2 cursor-pointer transition-all hover:bg-white hover:text-black"
        onClick={handleToggle}
      >
        <Globe />
        {t("locale", { locale: currentLocale })}
      </div>

      <div
        ref={heightRef}
        className={`text-center overflow-hidden bg-corporative transition-all absolute left-0 right-0 z-50`}
        style={open ? { height: `${height}px` } : { height: 0 }}
      >
        {routing.locales.map(
          (cur) =>
            cur !== currentLocale && (
              <button
                key={cur}
                onClick={() => handleLocaleChange(cur)}
                className="p-2 block w-full bg-corporative transition-all hover:bg-white hover:text-black"
              >
                {t("locale", { locale: cur })}
              </button>
            ),
        )}
      </div>
    </div>
  );
}
