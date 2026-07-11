import BannerGodotSection from "@/components/sections/BannerGodotSection";
import FirefliesEffect from "@/components/common/FirefliesEffect";
import FeaturesSection from "@/components/sections/FeaturesSection";
import GallerySection from "@/components/sections/GallerySection";
import HistorySection from "@/components/sections/HistorySection";
import SliderSection from "@/components/sections/SliderSection";
import VideosSection from "@/components/sections/VideosSection";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { getDictionary } from "./dictionaries";
import { hasLocale, Locale } from "@/lib/routes";
import { Metadata } from "next";
import { getAlternateLanguages } from "@/lib/utils/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = dict.Metadata.title;
  const description = dict.Metadata.description;
  const openGraphImage = dict.Metadata.openGraphImage;
  const languages = getAlternateLanguages('/');

  return {
    metadataBase: new URL("https://www.heartoffantasy.com"),
    title: title,
    description: description,
    alternates: {
      canonical: languages[lang],
      languages: languages,
    },
    openGraph: {
      siteName: 'Heart of Fantasy',
      type: 'website',
      images: openGraphImage,
    },
    verification: {
      google: "M35Kr9isjr9ui3oxc63rCnGr5v2gcLlqL5PRpba6N8A",
    },
  };
}

export default async function Home({ params }: PageProps<'/[lang]'>) {
  const gradientStyles = clsx(
    "before:bg-linear-to-b before:absolute before:top-0 before:h-screen before:max-h-[600px] before:w-full before:from-black before:to-transparent"
  );
  const { lang } = await params
 
  if (!hasLocale(lang)) notFound()
 
  const dict = await getDictionary(lang)
  return (
    <>
      <SliderSection/>
      <main className={`relative overflow-hidden ${gradientStyles}`}>
        <FirefliesEffect
          count={100} // Cuantas luciernagas apareceran
          speed={3} // A que velocidad se mueven
          flicker={true} // Activar parpadeo
          colors={["#A43046", "#FFFFFF",]} // Colores de las luciernagas
          sizeRange={[3, 4]} // Tamaños entre 3px y 8px
          glow={true} // Activar glow
        />
        <div className="container mx-auto px-4 pt-24 overflow-hidden relative z-20">
          <HistorySection dict={dict.HistorySection}/>
          <GallerySection dict={dict.GallerySection}/>
          <FeaturesSection dict={dict.FeaturesSection}/>
        </div>
        <div className="relative overflow-hidden">
          <BannerGodotSection dict={dict.BannerGodotSection}/>
        </div>
        <div className="container mx-auto px-4 overflow-hidden relative z-20">
          <VideosSection dict={dict.VideosSection}/>
        </div>
      </main>
    </>
  );
}
