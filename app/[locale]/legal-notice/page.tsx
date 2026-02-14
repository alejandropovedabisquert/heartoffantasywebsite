import { Titulo } from "@/components/common/Titulo";
import { useTranslations } from "next-intl";
import LandingLayout from "../landing-layout/layout";
import { Metadata } from "next";
import BackButton from "@/components/common/BackButton";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'LegalNoticeSection'});

    return {
        metadataBase: new URL('https://www.heartoffantasy.com'),
        title: t('metadata.title'),
        description: t('metadata.description'),
        openGraph: {
            images: t('metadata.openGraphImage'),
        },
    };
}

type partsProps = {
    title: string;
    description: string;
    contentList: string;
}

export default function Page() {
    // Temporalmente deshabilitado: eliminar notFound() cuando el contenido legal este finalizado
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
                    {/* HTML seguro: contenido de traducciones controladas por el desarrollador */}
                    <p dangerouslySetInnerHTML={{ __html: t.raw("update") }} />
                </div>
                <div>
                    {
                        t.raw("parts").map((feature: partsProps, index: number) => (
                            <div key={index} className="mb-6" data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
                                <h3 className="font-bold text-2xl">
                                    {feature.title}
                                </h3>
                                {/* HTML seguro: contenido de traducciones controladas por el desarrollador */}
                                <div dangerouslySetInnerHTML={{ __html: feature.description }} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </LandingLayout>
    );
}