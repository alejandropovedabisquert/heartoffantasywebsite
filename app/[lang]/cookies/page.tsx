import { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import { Locale } from "@/lib/routes";
import { getAlternateLanguages } from "@/lib/utils/seo";
import LocalizedLink from "@/components/ui/LocalizedLink";
import Image from "next/image";
import CookiesPolicyContent from "@/components/pages/cookies/CookiesPolicyContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.CookiePolicy.metadata.title;
  const description = dict.CookiePolicy.metadata.description;

  const languages = getAlternateLanguages("/cookies");

  return {
    metadataBase: new URL("https://www.heartoffantasy.com"),
    title: title,
    description: description,
    alternates: {
      canonical: languages[lang],
      languages: languages,
    },
    // openGraph: {
    //     images: t('metadata.openGraphImage'),
    // },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const dict = await getDictionary(lang);
  return (
    <>
      <div className="min-h-75 md:min-h-125 flex items-end justify-center">
        <LocalizedLink
          href="/"
          locale={lang}
          aria-label="Heart of Fantasy Home"
        >
          <Image
            src={"/logo.webp"}
            width={250}
            height={250}
            alt="logo"
            priority={true}
            className="mx-auto my-10 z-1 relative"
          />
        </LocalizedLink>
      </div>
      <CookiesPolicyContent dict={dict} locale={lang} />
    </>
  );
}
