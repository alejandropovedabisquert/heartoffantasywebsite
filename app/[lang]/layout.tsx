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
import CookieBanner from "@/components/common/CookieBanner";
import FirefliesEffect from "@/components/common/FirefliesEffect";
import { CookieProvider } from "@/context/CookieContext";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.heartoffantasy.com"),
  title: {
    template: "%s | Heart of Fantasy",
    default: "Heart of Fantasy", // Título si no hay otro
  },
  openGraph: {
    siteName: "Heart of Fantasy",
    type: "website",
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
  const cookieStore = await cookies();
  const hasConsent = cookieStore.has("cookie-consent");

  return (
    <html lang={lang} className="overflow-x-hidden">
      <body
        suppressHydrationWarning
        className={`${geistSans.className} antialiased overflow-x-hidden`}
      >
        <CookieProvider hasConsent={hasConsent} locale={lang}>
          <FirefliesEffect
            count={100} // Cuantas luciernagas apareceran
            speed={3} // A que velocidad se mueven
            flicker={true} // Activar parpadeo
            colors={["#A43046", "#FFFFFF"]} // Colores de las luciernagas
            sizeRange={[3, 4]} // Tamaños entre 3px y 8px
            glow={true} // Activar glow
          />
          <Analytics />
          <BodyIdSetter />
          <HeaderSection dict={dict.HeaderNav} locale={lang} />
          <main className="relative z-10">{children}</main>
          <FooterSection dict={dict.FooterSection} locale={lang} />
          <StreamerStatus dict={dict.TwitchPopup} streamer="blacksmith3" />
          <CookieBanner dict={dict.CookieConsent} />
        </CookieProvider>
      </body>
    </html>
  );
}
