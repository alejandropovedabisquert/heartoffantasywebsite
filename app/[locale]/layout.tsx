import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Geist } from "next/font/google";
import "../globals.css";
import { AOSInit } from "@/components/common/AosInit";
import FooterSection from "@/components/FooterSection";
import LanguageSwitcher from "@/components/common/LocaleSwitcherSelect";
import { Metadata } from 'next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Función para generar el metadata dinámicamente
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  // Cargar las traducciones para el idioma actual
  const {locale} = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

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
    <html lang={locale} className="scroll-smooth">
      <AOSInit />
      <body
        className={`${geistSans.className} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitcher/>
          {children}
          <FooterSection />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
