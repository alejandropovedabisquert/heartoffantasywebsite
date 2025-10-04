import BannerGodotSection from "@/components/BannerGodotSection";
import FirefliesEffect from "@/components/common/FirefliesEffect";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import HistorySection from "@/components/HistorySection";
import SliderSection from "@/components/SliderSection";
import VideosSection from "@/components/VideosSection";
import clsx from "clsx";
// TODO: Implementar async components para la internacionalización https://next-intl.dev/docs/environments/server-client-components#async-components

export default function Home() {
  const gradientStyles = clsx(
    "before:bg-gradient-to-b before:absolute before:top-0 before:h-screen before:max-h-[600px] before:w-full before:from-black before:to-transparent"
  );
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
        <div className="container mx-auto px-4 pt-24 overflow-hidden">
          <HistorySection />
          <GallerySection/>
          <FeaturesSection />
        </div>
        <div className="relative overflow-hidden">
          <BannerGodotSection/>
        </div>
        <div className="container mx-auto px-4 overflow-hidden">
          <VideosSection />
        </div>
      </main>
    </>
  );
}
