import React from "react";
import Image, { ImageProps } from "next/image";
import { OctagonX } from "lucide-react";

type ImageViewerProps = {
    selectedImage: ImageProps;
    onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
    selectedImage,
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
                />
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
