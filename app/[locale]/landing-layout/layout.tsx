// Este layout se aplica a las paginas de contenido legal, registro y activacion
import FirefliesEffect from "@/components/common/FirefliesEffect";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden">
            <div className="min-h-[300px] md:min-h-[500px] flex items-end justify-center">
                <Link href="/" aria-label="Heart of Fantasy Home">
                <Image 
                    src={"/logo.png"} 
                    width={250} 
                    height={250} 
                    alt="logo" 
                    priority={true} 
                    className="mx-auto my-10 z-[1] relative"
                    />
                </Link>
            </div>
            <FirefliesEffect
                count={100} // Cuantas luciernagas apareceran
                speed={3} // A que velocidad se mueven
                flicker={true} // Activar parpadeo
                colors={["#A43046", "#FFFFFF",]} // Colores de las luciernagas
                sizeRange={[3, 4]} // Tamaños entre 3px y 8px
                glow={true} // Activar glow
            />
            <div>{children}</div>
        </div>
    );
}
