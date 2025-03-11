import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AOSInit } from "@/components/common/AosInit";
import FooterSection from "@/components/FooterSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heart of Fantasy | A permadeath MMORPG",
  description: '"Heart of Fantasy" is a permadeath survival MMORPG with a procedurally generated world featuring oceans, rivers, and mountains.',
  openGraph: {
    images: '/openGraph.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <AOSInit />
      <body
        className={`${geistSans.className} antialiased`}
        >
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
