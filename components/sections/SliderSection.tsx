import clsx from "clsx";
import Image from "next/image";

export default function SliderSection() {
    const gradientStyles = clsx(
        "before:bg-gradient-to-b before:absolute before:top-0 before:h-screen before:max-h-[40vh] before:w-full before:from-black before:to-transparent before:z-[1]",
        "after:bg-gradient-to-t after:absolute after:bottom-0 after:h-screen after:max-h-[40vh] after:w-full after:from-black after:to-transparent after:z-[1]",
    );
    return (
        <div className={`min-h-200 relative ${gradientStyles}`}>
            <div className="absolute top-0 min-h-200 w-full bg-[url(/bg_principal.jpg)] bg-center bg-cover bg-no-repeat" />
            <div 
            className={clsx(
                "absolute left-1/2 top-1/2 ease-in -translate-y-1/2 -translate-x-1/2 z-5",
                "after:content-[''] after:absolute after:inset-1 after:bg-radial after:from-black after:from-20% after:to-transparent after:rounded-full after:blur-xl after:w-120 after:h-120 after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
            )}>
                <div className="w-50 h-50 sm:w-75 sm:h-75 relative z-10">
                    <Image src={"/logo.webp"} fill alt="logo" priority={true} />
                </div>
            </div>
            <video
                className="absolute top-0 w-full h-200 object-cover"
                preload="none" aria-label="Video player" autoPlay controls={false} loop muted playsInline
            >
                <source src={"/bg_video.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}