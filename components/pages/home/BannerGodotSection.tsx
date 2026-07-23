"use client"
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useCustomParallax } from "@/lib/hooks/useCustomParallax";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BannerGodotSection({
    dict
}:{
    dict: Awaited<ReturnType<typeof getDictionary>>["VideosSection"],
}) {
    const { style } = useCustomParallax({ factor: 0.1, invert: true });
    const backgroundStyles = clsx(
        "before:absolute before:top-0 before:h-full before:w-full before:bg-black before:opacity-70 before:z-10",
    );
    return (
        <div className={`h-125 ${backgroundStyles}`}>
            <div className="absolute w-full h-250" style={style}>
                <Image src="/banner_godot.webp" alt="" className="translate-y-1/4 sm:translate-y-0 object-cover" fill/>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-full">
                <motion.div
                    className="flex justify-center items-center flex-col lg:flex-row"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: .3, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
                        {dict.title}
                    </h2>
                    <div className="max-w-125 relative">
                        <Image src="/logo_large_color_dark.svg" alt="Logo Godot Engine" width={500} height={500}/>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}