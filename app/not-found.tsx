import FirefliesEffect from "@/components/common/FirefliesEffect";
import HeartV2 from "@/components/common/HeartV2";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
    const t = useTranslations('PageNotFound');
    return (
        <main>
            <div id="bodyNotFound">
                <HeartV2 />
                <h1>
                    {t.raw('title')}
                </h1>
                <Link href="/">{t.raw('backButton')}</Link>
            </div>

            <FirefliesEffect
                count={100} // Cuantas luciernagas apareceran
                speed={3} // A que velocidad se mueven
                flicker={true} // Activar parpadeo
                colors={["#A43046", "#FFFFFF",]} // Colores de las luciernagas
                sizeRange={[3, 4]} // Tamaños entre 3px y 8px
                glow={true} // Activar glow
            />
        </main>
    );
}