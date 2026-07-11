import { notFound } from "next/navigation";
import LandingLayout from "../landing-layout/layout";
import { getDictionary } from "../dictionaries";
import ActivateSection from "@/components/sections/ActivateSection";
import { Metadata } from "next";
import { hasLocale, Locale } from "@/lib/routes";
import { getAlternateLanguages } from "@/lib/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.ActivatePage.metadata.title;
  const description = dict.ActivatePage.metadata.description;
  
  const languages = getAlternateLanguages('/activate');

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
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const lang = (await params).lang;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <LandingLayout params={params}>
      <ActivateSection dict={dict.ActivatePage}/>
    </LandingLayout>
  );
}
