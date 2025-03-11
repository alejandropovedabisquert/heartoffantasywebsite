'use client';

import { startTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';

interface languagesProps {
  locale: string;
  language: string;
}

export default function LanguageSwitcher() {
  const t = useTranslations();
  const languages = t.raw("LanguageSwitcher")
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = useLocale();

  const switchLanguage = (nextLocale: string) => {
    if (nextLocale === currentLocale) return;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params }, // Mantiene la ruta actual
        { locale: nextLocale } // Cambia el idioma
      );
    });
  };

  return (
    <div className="absolute right-8 top-8 z-10">
      {
        languages.map((language: languagesProps, index: number) => (
          <button key={index} onClick={() => switchLanguage(`${language.locale}`)} hidden={currentLocale === language.locale}>
            {language.language}
          </button>
        ))
      }
    </div>
  );
}
