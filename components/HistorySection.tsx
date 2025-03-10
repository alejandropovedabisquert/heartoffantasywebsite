import { Titulo } from "./common/Titulo";

export default function HistorySection() {
    return (
        <div className="my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">About the game</Titulo>
            </div>
            <div data-aos="fade-right" data-aos-delay="100" className="grid grid-cols-6">
                <div className="col-span-6 md:col-span-4 flex items-center">
                    <p className="text-lg">{'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.'}</p>
                </div>
                <div data-aos="fade-left" data-aos-delay="100" className="col-span-6 md:col-span-2">
                    <img data-aos="fade-left" className="max-h-64 h-screen float-right" src="/heart.png" alt="" />
                </div>
            </div>
        </div>
    );
}