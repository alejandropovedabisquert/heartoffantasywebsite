"use client"
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";
import ModalComponent from "./common/ModalComponent";
import { useTranslations } from "next-intl";
import { useBodyScrollLock } from "@/lib/hooks/useBodyScrollLock";

export default function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);
    const t = useTranslations();
    const images = t.raw("GallerySection");

    useBodyScrollLock(!!selectedImage);

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                handleCloseModal();
            }
        };
        document.addEventListener("keydown", keyDownHandler);
        // Limpia el evento
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    const handleOnClicked = (src: string, index: number) => {
        setSelectedImage(images[index]);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    const modalStyles = clsx(
        "w-screen h-screen fixed left-0 top-0 opacity-0 transition-all duration-300",
        {
            "invisible": !selectedImage,
            "opacity-100 z-20 visible": selectedImage,
        }
    )

    return (
        <>
            <div className="grid grid-cols-3 grid-rows-3 gap-8 mt-8">
                {
                    images.map((image: ImageProps, index: number) => (
                        <div
                            key={index}
                            data-aos="fade-up" data-aos-delay={(index + 1) * 50}
                            className={clsx("col-span-3 row-span-1 overflow-hidden",
                                index === 0 ? "sm:col-span-2 sm:row-span-2" : "sm:col-span-1 sm:row-span-1"
                            )}
                        >
                            <Image
                                {...image}
                                width={320}
                                height={200}
                                alt={image.alt}
                                className="h-full w-full object-cover transition-all cursor-pointer hover:scale-110"
                                onClick={() => handleOnClicked(image.src as string, index)}
                            />
                        </div>
                    ))
                }
            </div>
            <div className={`${modalStyles}`}>
                <div className="relative h-screen w-screen">
                    <div className="bg-black opacity-60 absolute top-0 left-0 h-screen w-screen"
                        onClick={() => handleCloseModal()}
                    ></div>
                    {selectedImage && (
                        <ModalComponent
                            selectedImage={selectedImage}
                            onClose={handleCloseModal}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
