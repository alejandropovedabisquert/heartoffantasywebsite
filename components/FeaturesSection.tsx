import { useTranslations } from "next-intl";
import { Titulo } from "./common/Titulo";

type featureProps = {
    title: string;
    description: string;
}

export default function FeaturesSection() {
    const t = useTranslations('FeaturesSection');
    const subtitle = t("subtitle");
    const conclusion = t("conclusion");
    return (
        <div className="my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-2xl sm:text-4xl font-bold my-4">{t("title")}</Titulo>
            </div>
            {subtitle && (
                <p className="mb-8 text-lg" data-aos="fade-right" data-aos-delay="100">{subtitle}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    t.raw("features").map((feature: featureProps, index: number) => (
                        <div key={index} className="col-span-1" data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
                            <h3 className="font-bold text-xl sm:text-2xl">
                                {feature.title}
                            </h3>
                            {/* HTML seguro: contenido de traducciones controladas por el desarrollador */}
                            <p dangerouslySetInnerHTML={{ __html: feature.description }} />
                        </div>
                    ))
                }
            </div>
            {conclusion && (
                <p className="my-8 text-lg" data-aos="fade-right" data-aos-delay="100">{conclusion}</p>
            )}
        </div>
    );
}