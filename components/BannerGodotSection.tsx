"use client"
import { useCustomParallax } from "@/lib/useCustomParallax";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function BannerGodotSection() {
    const { style } = useCustomParallax(-0.12);
    const t = useTranslations('BannerGodotSection');
    const backgroundStyles = clsx(
        "before:absolute before:top-0 before:h-full before:w-full before:bg-black before:opacity-70 before:z-10",
    );
    return (
        <div className={`h-[500px] ${backgroundStyles}`}>
            <div className="absolute w-full h-[1000px]" style={style}>
                <Image src="/banner_godot.webp" alt="" className="translate-y-1/4 sm:translate-y-0 object-cover" fill unoptimized={true}/>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-full">
                <div
                    className="flex justify-center items-center flex-col lg:flex-row"
                    data-aos="zoom-in"
                >
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
                        {t('title')}
                    </h2>
                    <div className="max-w-[500px] relative">
                        <Image src="/logo_large_color_dark.svg" alt="Logo Godot Engine" width={500} height={500} unoptimized={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
}