"use client";
import LanguageSwitcher from "@/components/common/LocaleSwitcherSelect";
import { Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useBodyScrollLock } from "@/lib/hooks/useBodyScrollLock";
import LocalizedLink from "../ui/LocalizedLink";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/routes";

export default function HeaderSection({
  dict,
  locale
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>["HeaderNav"],
  locale: Locale
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useBodyScrollLock(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="z-10 relative md:absolute md:container top-4 left-1/2 -translate-x-1/2 w-full px-8 md:px-0">
      <div className="text-white p-4 w-full flex justify-between items-center relative after:content-[''] after:block after:absolute after:inset-0 after:bg-black/50 after:-z-10 after:border-2 after:border-corporative">
        <div className="md:mx-auto flex items-center justify-between relative w-full">
          <div>
            <LocalizedLink
              href="/"
              locale={locale}
              className="text-2xl w-30 block font-bold transition-all hover:text-corporative"
            >
              <Image
                src={"/heart.webp"}
                className="image-rendering-pixelated"
                width={500}
                height={500}
                alt="logo"
                priority={true}
              />
            </LocalizedLink>
          </div>
          <div
            className='hidden md:flex gap-6 justify-center items-center flex-row flex-wrap'
          >
            <nav>
              <ul className="flex space-x-4 list-none">
                {dict.navigation.map((item, index) => (
                  <li key={index}>
                    <LocalizedLink
                      href={item.link}
                      locale={locale}
                    >
                      {item.text}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center  gap-4">
              <LanguageSwitcher currentLocale={locale} />
              <LocalizedLink
                variant="contrast"
                className="flex gap-2"
                href={dict.download.link}
                isExternal={true}
                download={true}
                locale={locale}
              >
                <Download />
                {dict.download.text}
              </LocalizedLink>
            </div>
          </div>
          <div
            className={`md:hidden fixed top-0 right-0 w-full h-screen bg-background p-8 pt-20
            transform transition-transform duration-300 ease-in-out z-40
            flex flex-col items-center justify-center gap-4
            ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <nav>
              <ul className="flex flex-col items-center gap-4">
                {dict.navigation.map((item, index) => (
                  <li key={index}>
                    <LocalizedLink
                      href={item.link}
                      locale={locale}
                      onClick={toggleMenu}
                    >
                      {item.text}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center flex-col gap-4">
              <LocalizedLink
                variant="contrast"
                className="flex gap-2"
                href={dict.download.link}
                download={true}
                isExternal={true}
                onClick={toggleMenu}
                locale={locale}
              >
                <Download />
                {dict.download.text}
              </LocalizedLink>
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center relative z-50"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>
    </header>
  );
}
