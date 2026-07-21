import Image from "next/image";
import { getDictionary } from "./dictionaries";
import { headers } from "next/headers";
import { hasLocale, Locale } from "@/lib/routes";
import LocalizedLink from "@/components/ui/LocalizedLink";

export default async function NotFound() {
  const headersList = await headers();

  const headerLocale = headersList.get("x-locale") as Locale;
  const lang = hasLocale(headerLocale) ? headerLocale : "en";
  const dict = await getDictionary(lang);

  const title = dict.PageNotFound.title;
  const backButton = dict.PageNotFound.backButton;

  return (
    <>
      <div id="bodyNotFound">
        <Image
          src={"/logo.webp"}
          width={250}
          height={250}
          alt="logo"
          priority={true}
          className="mx-auto my-10 z-1 relative"
        />
        <h1>{title}</h1>
        <LocalizedLink locale={lang} href="/">
          {backButton}
        </LocalizedLink>
      </div>
    </>
  );
}
