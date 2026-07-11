"use client";

import { Locale, locales, pathnames } from "@/lib/routes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BodyIdSetter() {
  const pathname = usePathname();
  const decodedPathname = decodeURI(pathname);
  const parts = decodedPathname.split("/");
  const maybeLocale = parts[1] as Locale;
  const isLocalePresent = locales.includes(maybeLocale);

  let currentPathWithoutLocale = isLocalePresent
    ? `/${parts.slice(2).join("/")}`
    : decodedPathname;

  if (
    currentPathWithoutLocale !== "/" &&
    currentPathWithoutLocale.endsWith("/")
  ) {
    currentPathWithoutLocale = currentPathWithoutLocale.slice(0, -1);
  }
  if (currentPathWithoutLocale === "") {
    currentPathWithoutLocale = "/";
  }

  const currentLocale = isLocalePresent ? maybeLocale : "en";

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

  const slug =
    internalPath === "/" ? "home" : internalPath.slice(1).replace(/\//g, "-");

  useEffect(() => {
    document.body.id = slug;
  }, [slug]);

  return null;
}
