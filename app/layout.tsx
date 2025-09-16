import { useTranslations } from "next-intl";
import "./globals.css";
import { Geist } from "next/font/google";
import { AOSInit } from "@/components/common/AosInit";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
// TODO: Intentar arreglar warnings del console
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('PageNotFound');
  return (
    <html lang={t('locale')} suppressHydrationWarning>
      <AOSInit />
      <body className={`${geistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
