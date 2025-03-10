import clsx from "clsx";

const gridHistory = [
    "gallery/Sunnyside_World_ExampleScene.png",
    "gallery/cafe.jpg",
    "gallery/fox.jpg",
    "gallery/fox2.jpg",
    "gallery/Sunnyside_World_ExampleScene.png",
    "gallery/Sunnyside_World_ExampleScene.png",
];
export default function GallerySection() {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-8 mt-8">
            {
                gridHistory.map((item, index) => (
                    <div
                        key={index}
                        data-aos="fade-up" data-aos-delay={(index + 1) * 50}
                        className={clsx("col-span-3 row-span-1",
                            index == 0 ? "sm:col-span-2 sm:row-span-2" : "sm:col-span-1 sm:row-span-1"
                        )}
                    >
                        <img src={item} className="h-full object-cover" alt="" />
                    </div>
                ))
            }
        </div>
    );
}