import BannerGodotSection from "@/components/BannerGodotSection";
import FirefliesEffect from "@/components/common/FirefliesEffect";
import FeaturesSection from "@/components/FeaturesSection";
import GallerySection from "@/components/GallerySection";
import HistorySection from "@/components/HistorySection";
import SliderSection from "@/components/SliderSection";
import VideosSection from "@/components/VideosSection";

export default function Home() {
  return (
    <>
      <SliderSection/>
      <main className="relative overflow-hidden">
        <FirefliesEffect
          count={100}
          speed={3}
          flicker={true}
          colors={["#A43046", "#FFFFFF",]}
          sizeRange={[3, 4]} // Tamaños entre 3px y 8px
          glow={true} // Activar glow
        />
        <div className="bg-gradient-to-b absolute top-0 h-screen max-h-[600px] w-full from-black to-transparent"></div>
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
