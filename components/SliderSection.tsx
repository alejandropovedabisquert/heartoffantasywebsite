import clsx from "clsx";
import Image from "next/image";

export default function SliderSection() {
      const gradientStyles = clsx(
        "before:bg-gradient-to-b before:absolute before:top-0 before:h-screen before:max-h-[40vh] before:w-full before:from-black before:to-transparent before:z-[1]",
        "after:bg-gradient-to-t after:absolute after:bottom-0 after:h-screen after:max-h-[40vh] after:w-full after:from-black after:to-transparent after:z-[1]",
      );
    return (
        <div className={`min-h-[700px] relative ${gradientStyles}`}>
            <div className="absolute top-0 min-h-[700px] w-full bg-[url(/bg_principal.jpg)] bg-center bg-cover bg-no-repeat" />
            <div className="absolute left-1/2 top-1/2 ease-in -translate-y-1/2 -translate-x-1/2 z-[5]">
                <div className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px]">
                    <Image src={"/logo.png"} fill alt="logo" priority={true} />
                </div>
            </div>
            <video
                className="absolute top-0 w-full h-[700px] object-cover"
                preload="none" aria-label="Video player" autoPlay controls={false} loop muted playsInline
            >
                <source src={"/bg_video.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}