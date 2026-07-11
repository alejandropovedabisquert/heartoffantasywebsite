// Este layout se aplica a las paginas de contenido legal, registro y activacion
import FirefliesEffect from "@/components/common/FirefliesEffect";
import LocalizedLink from "@/components/ui/LocalizedLink";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { hasLocale } from "@/lib/routes";

export default async function LandingLayout({
  children,
  params,
}: {
    children: ReactNode,
    params: Promise<{ lang: string }>
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <div className="relative overflow-hidden">
      <div className="min-h-75 md:min-h-125 flex items-end justify-center">
        <LocalizedLink
          href="/"
          locale={lang}
          aria-label="Heart of Fantasy Home"
        >
          <Image
            src={"/logo.webp"}
            width={250}
            height={250}
            alt="logo"
            priority={true}
            className="mx-auto my-10 z-1 relative"
          />
        </LocalizedLink>
      </div>
      <FirefliesEffect
        count={100} // Cuantas luciernagas apareceran
        speed={3} // A que velocidad se mueven
        flicker={true} // Activar parpadeo
        colors={["#A43046", "#FFFFFF"]} // Colores de las luciernagas
        sizeRange={[3, 4]} // Tamaños entre 3px y 8px
        glow={true} // Activar glow
      />
      <div>{children}</div>
    </div>
  );
}
