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
  title: "Heart of Fantasy, an MMORPG permadeath",
  description: "Generated by create next app",
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
