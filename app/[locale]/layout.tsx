import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import FooterSection from "@/components/FooterSection";
import { Metadata } from 'next';
import BodyIdSetter from '@/components/common/BodyIdSetter';
import { Analytics } from "@vercel/analytics/next";
import { Geist } from 'next/font/google';
import HeaderSection from '@/components/HeaderSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL('https://www.heartoffantasy.com'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      images: t('openGraphImage'),
    },
    verification: {
      google: 'M35Kr9isjr9ui3oxc63rCnGr5v2gcLlqL5PRpba6N8A',
    },
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  // TODO: Create a context for the bodyidsetter and pass the id from the page to avoid passing all the messages to the client side
  return (
    <html lang={locale} suppressHydrationWarning className='overflow-x-hidden'>
      <body className={`${geistSans.className} antialiased overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <BodyIdSetter />
          {/* <LanguageSwitcher /> */}
          <HeaderSection/>
          <main>
            {children}
          </main>
          <FooterSection />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
