import { Titulo } from "@/components/common/Titulo";
import { useTranslations } from "next-intl";
import LandingLayout from "../landing-layout/layout";
import { Metadata } from "next";
import BackButton from "@/components/common/BackButton";
import { notFound } from "next/navigation";

// Función para generar el metadata dinámicamente
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    // Cargar las traducciones para el idioma actual
    const { locale } = await params;
    const messages = (await import(`@/messages/${locale}.json`)).default;

    return {
        metadataBase: new URL('https://heartoffantasywebsite.vercel.app'), // Asignamos dominio en produccion
        title: messages.LegalNoticeSection.metadata.title,
        description: messages.LegalNoticeSection.metadata.description,
        openGraph: {
            images: messages.Metadata.openGraphImage,
        },
    };
}

type partsProps = {
    title: string;
    description: string;
    contentList: string;
}

export default function Page() {
    notFound();

    const t = useTranslations('LegalNoticeSection');
    return (
        <LandingLayout>
            <div className="container">
                <div data-aos="fade-right">
                    <BackButton />
                </div>
                <div data-aos="fade-right">
                    <Titulo as={"h2"} position="left" className="text-3xl sm:text-4xl font-bold my-4">{t("title")}</Titulo>
                </div>
                <div data-aos="fade-right" className="mb-6">
                    <p dangerouslySetInnerHTML={{ __html: t.raw("update") }} />
                </div>
                <div>
                    {
                        t.raw("parts").map((feature: partsProps, index: number) => (
                            <div key={index} className="mb-6" data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
                                <h3 className="font-bold text-2xl">
                                    {feature.title}
                                </h3>
                                <div dangerouslySetInnerHTML={{ __html: feature.description }} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </LandingLayout>
    );
}