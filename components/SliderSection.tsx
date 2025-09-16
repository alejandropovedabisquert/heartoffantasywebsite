import clsx from "clsx";
import Image from "next/image";
// TODO: Ajustar altura del video para hacerlo mas usable para usuarios y ponerle minimo de altura
export default function SliderSection() {
      const gradientStyles = clsx(
        "before:bg-gradient-to-b before:absolute before:top-0 before:h-screen before:max-h-[60vh] before:w-full before:from-black before:to-transparent before:z-[1]",
        "after:bg-gradient-to-t after:absolute after:bottom-0 after:h-screen after:max-h-[60vh] after:w-full after:from-black after:to-transparent after:z-[1]",
      );
    return (
        <div className={`h-screen ${gradientStyles}`}>
            <div className="absolute top-0 h-screen w-full bg-[url(/bg_principal.jpg)] bg-center bg-cover bg-no-repeat" />
            <div className="absolute left-1/2 top-1/2 ease-in -translate-y-1/2 -translate-x-1/2 z-10">
                <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
                    <Image src={"/logo.png"} fill alt="logo" priority={true} />
                </div>
            </div>
            <video
                className="absolute top-0 w-full h-screen object-cover"
                preload="none" aria-label="Video player" autoPlay controls={false} loop muted playsInline
            >
                <source src={"/bg_video.mp4"} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}