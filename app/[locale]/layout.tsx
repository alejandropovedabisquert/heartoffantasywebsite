import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import FooterSection from "@/components/FooterSection";
import LanguageSwitcher from "@/components/common/LocaleSwitcherSelect";
import { Metadata } from 'next';
import BodyIdSetter from '@/components/common/BodyIdSetter';
import { Analytics } from "@vercel/analytics/next";

// Función para generar el metadata dinámicamente
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // Cargar las traducciones para el idioma actual
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    metadataBase: new URL('https://heartoffantasywebsite.vercel.app'), // Asignamos dominio en produccion
    title: messages.Metadata.title,
    description: messages.Metadata.description,
    openGraph: {
      images: messages.Metadata.openGraphImage,
    },
  };
}

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

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <Analytics/>
        <BodyIdSetter />
        <LanguageSwitcher />
        {children}
        <FooterSection />
      </NextIntlClientProvider>
    </>
  );
}
