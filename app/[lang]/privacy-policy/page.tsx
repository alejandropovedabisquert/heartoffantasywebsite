import LandingLayout from "../landing-layout/layout";
import { Metadata } from "next";
import GenericPage from "@/components/common/GenericPage";
import { getDictionary } from "../dictionaries";
import { Locale } from "@/lib/routes";
import { getAlternateLanguages } from "@/lib/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.PrivacyPolicySection.metadata.title;
  const description = dict.PrivacyPolicySection.metadata.description;

  const languages = getAlternateLanguages('/privacy-policy');

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
    <LandingLayout params={params}>
      <GenericPage dict={dict} locale={lang} />
    </LandingLayout>
  );
}
