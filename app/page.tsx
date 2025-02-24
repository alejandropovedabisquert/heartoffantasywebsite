import VideosSection from "@/components/VideosSection";
import Image from "next/image";

export default function Home() {  
  return (
    <div>
      <div className="relative">
        <div className="h-[800px] w-full bg-[url(/bg-principal.gif)] bg-center bg-cover bg-no-repeat"></div>
        <div className="absolute left-1/2 top-28 ease-in translate-y-0 -translate-x-1/2">
          <Image src={"/logo.png"} width={300} height={300} alt="logo" unoptimized={true} />
        </div>
      </div>
      <VideosSection/>
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      </main> */}
    </div>
  );
}
