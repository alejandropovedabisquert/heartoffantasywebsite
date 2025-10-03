// TODO: Revisa si este layout debe aplicarse solo a ciertas páginas o a todo el sitio. Si es global, considera moverlo a app/[locale]/layout.tsx para simplificar la estructura.
import FirefliesEffect from "@/components/common/FirefliesEffect";
import Image from "next/image";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden">
            <header>
                <Image 
                    src={"/logo.png"} 
                    width={250} 
                    height={250} 
                    alt="logo" 
                    priority={true} 
                    className="mx-auto my-10 z-[1] relative"
                />
            </header>
            <FirefliesEffect
                count={100} // Cuantas luciernagas apareceran
                speed={3} // A que velocidad se mueven
                flicker={true} // Activar parpadeo
                colors={["#A43046", "#FFFFFF",]} // Colores de las luciernagas
                sizeRange={[3, 4]} // Tamaños entre 3px y 8px
                glow={true} // Activar glow
            />
            <main className="relative z-10">{children}</main>
        </div>
    );
}
