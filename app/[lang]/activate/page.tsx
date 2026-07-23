import { notFound } from "next/navigation";
import { getDictionary } from "../dictionaries";
import ActivateSection from "@/components/pages/activate/ActivateSection";
import { Metadata } from "next";
import { hasLocale, Locale } from "@/lib/routes";
import { getAlternateLanguages } from "@/lib/utils/seo";
import LocalizedLink from "@/components/ui/LocalizedLink";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.ActivatePage.metadata.title;
  const description = dict.ActivatePage.metadata.description;

  const languages = getAlternateLanguages("/activate");

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

export default async function Activate({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ token?: string }>;
}) {
  const lang = (await params).lang;
  const { token } = await searchParams;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  if (!token) notFound();

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
      <ActivateSection dict={dict.ActivatePage} token={token}/>
    </>
  );
}
