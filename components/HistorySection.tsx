import { useTranslations } from "next-intl";
import { Titulo } from "./common/Titulo";
import HeartV2 from "./common/HeartV2";

export default function HistorySection() {
    const t = useTranslations('HistorySection');
    return (
        <div className="my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-2xl sm:text-4xl font-bold my-4">{t('title')}</Titulo>
            </div>
            <div data-aos="fade-right" data-aos-delay="100" className="grid grid-cols-6">
                <div className="col-span-6 md:col-span-4 flex flex-col">
                    {
                        t.raw('description').map((line: string, index: number) => (
                            // HTML seguro: contenido de traducciones controladas por el desarrollador
                            <p key={index} className="text-lg mb-4" dangerouslySetInnerHTML={{__html: line}} />
                        ))
                    }
                </div>
                <div data-aos="fade-left" data-aos-delay="100" className="col-span-6 md:col-span-2 w-[250px] h-[250px] m-auto">
                    <HeartV2/>
                </div>
            </div>
        </div>
    );
}