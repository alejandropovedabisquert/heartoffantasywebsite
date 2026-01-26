import React from "react";
import Image, { ImageProps } from "next/image";
import { OctagonX } from "lucide-react";

type ImageViewerProps = {
    selectedImage: ImageProps;
    onNext?: () => void;
    onPrev?: () => void;
    onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
    selectedImage,
    // onNext,
    // onPrev,
    onClose,
}) => {
    return (
        <>
            <button
                className="absolute top-0 right-0 text-corporative p-8 hover:animate-wiggle"
                onClick={onClose}
            >
                <OctagonX width={34} height={34}/>
            </button>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl md:w-auto">
                <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1920}
                    height={1080}
                    className="py-2"
                    unoptimized={true}
                />

                {/* <button
                    className="absolute top-1/2 transform -translate-y-1/2 left-0 text-white py-14 px-4 md:py-28 md:px-5 text-3xl md:text-5xl"
                    onClick={onPrev}
                >
                    &lt;
                </button>
                <button
                    className="absolute top-1/2 transform -translate-y-1/2 right-0 text-white py-14 px-4 md:py-28 md:px-5 text-3xl md:text-5xl"
                    onClick={onNext}
                >
                    &gt;
                </button> */}
            </div>
            <div className="absolute w-screen bottom-[20%] md:bottom-4">
                <h3 className="text-white font-bold text-2xl text-center">
                    {selectedImage.alt}
                </h3>
            </div>
        </>
    );
};

export default ImageViewer;