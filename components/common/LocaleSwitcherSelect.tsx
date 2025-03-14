'use client';

import { startTransition, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import clsx from 'clsx';

interface languagesProps {
  locale: string;
  language: string;
}

export default function LanguageSwitcher() {
  const [open, isOpen] = useState<boolean>(false);
  const heightRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);
  const t = useTranslations("LocaleSwitcher");
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
    router.refresh();
  };
  useEffect(()=>{
    setHeight(heightRef.current?.scrollHeight)
  });

  const heightStyle = clsx(
    open ? `h-[${height}px]` : "h-0"
  );
  
  

  return (
    <div className="absolute left-8 top-8 z-10">
      <div className='flex gap-2 items-center justify-center bg-[#a43045] p-2 cursor-pointer transition-all hover:bg-white hover:text-black' onClick={ ()=> isOpen(!open) }>
        <Globe/>
        {t('locale', { locale: currentLocale })}
      </div>
      <div ref={heightRef} className={`text-center overflow-hidden bg-[#A43046] transition-all ${heightStyle}`}>
        {routing.locales.map((cur) => (
          <>
          {
            cur != currentLocale ? (
              <a href={cur} hidden={cur == currentLocale} className='p-2 block w-full bg-[#A43046] transition-all hover:bg-white hover:text-black'>
                {t('locale', { locale: cur })}
              </a>
            ):null
          }
          </>
          // <button key={cur} onClick={() => switchLanguage(cur)} hidden={cur == currentLocale} className='p-2 w-full'>
          //   {t('locale', { locale: cur })}
          // </button>
        ))}
      </div>
    </div>
  );
}
