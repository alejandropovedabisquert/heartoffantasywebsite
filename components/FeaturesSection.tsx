import { useLocale, useTranslations } from "next-intl";
import { Titulo } from "./common/Titulo";

interface featureProps {
    title: string;
    description: string;
}

export default function FeaturesSection() {
    const locale = useLocale();
    const t = useTranslations('FeaturesSection');
    return (
        <div className="my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">{t("title")}</Titulo>
            </div>
            {
                locale === 'ja' ? (
                    <p className="mb-8 text-lg" data-aos="fade-right" data-aos-delay="100">{t("subtitle")}</p>
                ) : null
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    t.raw("features").map((feature: featureProps, index: number) => (
                        <div key={index} className="col-span-1" data-aos="fade-up" data-aos-delay={(index + 1) * 50}>
                            <h3 className="font-bold text-2xl">
                                {feature.title}
                            </h3>
                            <p dangerouslySetInnerHTML={{ __html: feature.description }} />
                        </div>
                    ))
                }
            </div>
            {
                locale === 'ja' ? (
                    <p className="my-8 text-lg" data-aos="fade-right" data-aos-delay="100">{t("conclusion")}</p>
                ) : null
            }
        </div>
    );
}