"use client";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import LanguageSwitcher from "@/components/common/LocaleSwitcherSelect";
import { Download } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useBodyScrollLock } from "@/lib/hooks/useBodyScrollLock";

type AppPathname = keyof typeof routing.pathnames;

type navProps = {
  text: string;
  link: AppPathname;
};

export default function HeaderSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("HeaderNav");
  const locale = useLocale();

  useBodyScrollLock(isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="z-10 relative md:absolute md:container top-4 left-1/2 -translate-x-1/2 w-full px-8 md:px-0">
      <div className="text-white p-4 w-full flex justify-between items-center relative after:content-[''] after:block after:absolute after:inset-0 after:bg-black/50 after:-z-10 after:border-2 after:border-corporative">
        <div className="md:mx-auto flex items-center justify-between relative w-full">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold transition-all hover:text-corporative"
            >
              <Image
                src={"/heart.png"}
                width={70}
                height={70}
                alt="logo"
                priority={true}
              />
            </Link>
          </div>
          <div
            className='hidden md:flex gap-6 justify-center items-center flex-row flex-wrap'
          >
            <nav>
              <ul className="flex space-x-4">
                {t.raw("navigation").map((item: navProps, index: number) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      locale={locale}
                      className="transition-all hover:text-corporative"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center  gap-4">
              <LanguageSwitcher />
              <a
                className="flex gap-2 items-center justify-center p-2 bg-white text-black transition-all hover:bg-corporative hover:text-white"
                href={t("download.link")}
                download={true}
              >
                <Download />
                {t("download.text")}
              </a>
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
                {t.raw("navigation").map((item: navProps, index: number) => (
                  <li key={index}>
                    <Link
                      href={item.link}
                      locale={locale}
                      className="transition-all hover:text-corporative"
                    >
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center flex-col gap-4">
              <a
                className="flex gap-2 items-center justify-center p-2 bg-white text-black transition-all hover:bg-corporative hover:text-white"
                href={t("download.link")}
                download={true}
              >
                <Download />
                {t("download.text")}
              </a>
              <LanguageSwitcher />
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
