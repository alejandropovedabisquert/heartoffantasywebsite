import RegisterForm from "@/components/common/RegisterForm";
import LandingLayout from "../landing-layout/layout";
import { getDictionary } from "../dictionaries";
import { Locale } from "@/lib/routes";
import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.RegisterForm.metadata.title;
  const description = dict.RegisterForm.metadata.description;
  
  const languages = getAlternateLanguages('/register');

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
            <RegisterForm dict={dict.RegisterForm} locale={lang}/>
        </LandingLayout>
    );
}
