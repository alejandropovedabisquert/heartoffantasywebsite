import Image from "next/image";

export default function SliderSection() {
    return (
        <div className="relative h-screen">
            <div className="absolute top-0 h-screen w-full bg-[url(/bg_principal.jpg)] bg-center bg-cover bg-no-repeat"></div>
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
            <div className="bg-gradient-to-b absolute top-0 h-screen max-h-[60vh] w-full from-black to-transparent"></div>
            <div className="bg-gradient-to-t absolute bottom-0 h-screen max-h-[60vh] w-full from-black to-transparent"></div>
        </div>
    );
}