"use client"
import { useCustomParallax } from "@/lib/useCustomParallax";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function BannerGodotSection() {
    const { style } = useCustomParallax(-0.12);
    const t = useTranslations('BannerGodotSection');
    return (
        <div className="h-[500px]">
            <div className="bg-gradient-to-b absolute top-0 h-full w-full bg-black opacity-70 z-10"></div>
            <div className="absolute w-full h-[1000px]" style={{ ...style }}>
                <Image src="/gallery/Sunnyside_World_ExampleScene.png" alt="" className="translate-y-1/4 sm:translate-y-0" fill unoptimized={true} />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-full">
                <div
                    className="flex justify-center items-center flex-col lg:flex-row"
                    data-aos="zoom-in"
                >
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
                        {t.rich('title')}
                    </h2>
                    <div className="max-w-[500px] relative">
                        <Image src="logo_large_color_dark.svg" alt="" width={500} height={500} unoptimized={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}