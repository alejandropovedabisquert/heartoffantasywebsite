// import clsx from "clsx";
import { Titulo } from "./common/Titulo";

// const gridHistory = [
//     "Sunnyside_World_ExampleScene.png",
//     "cafe.jpg",
//     "fox.jpg",
//     "fox2.jpg",
//     "Sunnyside_World_ExampleScene.png",
//     "Sunnyside_World_ExampleScene.png",
// ];

export default function HistorySection() {
    return (
        <div>
            <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">#About the history</Titulo>
            <div className="grid grid-cols-6">
                <div className="col-span-6 md:col-span-4 flex items-center">
                    <p className="text-lg">{'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.'}</p>
                </div>
                <div className="col-span-6 md:col-span-2">
                    <img className="max-h-64 h-screen float-right" src="/heart.png" alt="" />
                </div>
            </div>
            {/* <div className="grid grid-cols-3 grid-rows-3 gap-8 mt-8">
                {
                    gridHistory.map((item, index) => (
                        <div 
                            key={index}
                            className={clsx("col-span-3 row-span-1",
                                index == 0 ? "sm:col-span-2 sm:row-span-2" : "sm:col-span-1 sm:row-span-1"
                            )}
                        >
                            <img src={item} className="h-full object-cover" alt="" />
                        </div>
                    ))
                }
            </div> */}
        </div>
    );
}