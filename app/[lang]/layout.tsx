import { notFound } from "next/navigation";
import "./globals.css";
import FooterSection from "@/components/sections/FooterSection";
import { Metadata } from "next";
import BodyIdSetter from "@/components/common/BodyIdSetter";
import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import HeaderSection from "@/components/sections/HeaderSection";
import { hasLocale, locales } from "@/lib/routes";
import { getDictionary } from "./dictionaries";
import StreamerStatus from "@/components/common/StreamerStatus";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.heartoffantasy.com'),
  title: {
    template: '%s | Heart of Fantasy',
    default: 'Heart of Fantasy', // Título si no hay otro
  },
  openGraph: {
    siteName: 'Heart of Fantasy',
    type: 'website',
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  

  // TODO: Create a context for the bodyidsetter and pass the id from the page to avoid passing all the messages to the client side
  return (
    <html lang={lang} className="overflow-x-hidden">
      <body
        suppressHydrationWarning
        className={`${geistSans.className} antialiased overflow-x-hidden`}
      >
        <Analytics />
        <BodyIdSetter />
        <HeaderSection dict={dict.HeaderNav} locale={lang} />
        <main>{children}</main>
        <FooterSection dict={dict.FooterSection} locale={lang} />
        <StreamerStatus dict={dict.TwitchPopup} streamer="blacksmith3" />
      </body>
    </html>
  );
}
