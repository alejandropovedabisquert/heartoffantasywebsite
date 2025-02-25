import FeaturesSection from "@/components/FeaturesSection";
import HistorySection from "@/components/HistorySection";
import VideosSection from "@/components/VideosSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative">
        <div className="h-screen w-full bg-[url(/Sunnyside_World_ExampleScene.png)] blur-[2px] bg-center bg-cover bg-no-repeat"></div>
        <div className="bg-gradient-to-t absolute bottom-0 h-screen max-h-[500px] w-full from-white to-transparent"></div>
        <div className="absolute left-1/2 top-20 ease-in translate-y-0 -translate-x-1/2">
          <Image src={"/logo.png"} width={400} height={400} alt="logo" unoptimized={true} />
        </div>
      </div>
      <main className="relative bg-[url(/bg-content2.png)] bg-top bg-cover bg-no-repeat">
        <div className="bg-gradient-to-b absolute top-0 h-screen max-h-[600px] w-full from-white to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4 pt-96">
          <HistorySection />
          <FeaturesSection />
          <VideosSection />
        </div>
      </main>
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      </main> */}
    </div>
  );
}
