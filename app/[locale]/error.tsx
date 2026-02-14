'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('Error');

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container mx-auto px-4 min-h-[500px] flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">{t('title')}</h2>
            <p className="mb-4">{t('description')}</p>
            <button
                onClick={reset}
                className="px-6 py-4 bg-corporative text-white transition-all hover:bg-white hover:text-black"
            >
                {t('retry')}
            </button>
        </div>
    );
}
