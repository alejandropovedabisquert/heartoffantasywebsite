'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LocaleSwitcher() {
  const [open, isOpen] = useState<boolean>(false);
  const heightRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(0);
  const t = useTranslations("LocaleSwitcher");
  const currentLocale = useLocale();

  useEffect(() => {
    setHeight(heightRef.current?.scrollHeight)
  }, [height]);



  return (
    <div className="absolute left-8 top-8 z-10">
      <div className='flex gap-2 items-center justify-center bg-[#a43045] p-2 cursor-pointer transition-all hover:bg-white hover:text-black' onClick={() => isOpen(!open)}>
        <Globe />
        {t('locale', { locale: currentLocale })}
      </div>
      <div
        ref={heightRef}
        className={`text-center overflow-hidden bg-[#A43046] transition-all`}
        style={open ? { height: `${height}px` } : { height: 0 }}
      >
        {routing.locales.map((cur) => (
          cur !== currentLocale && (
            <a
              key={cur}
              href={cur}
              className='p-2 block w-full bg-[#A43046] transition-all hover:bg-white hover:text-black'
            >
              {t('locale', { locale: cur })}
            </a>
          )
        ))}
      </div>
    </div>
  );
}
