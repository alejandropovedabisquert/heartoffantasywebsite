import { useTranslations } from "next-intl";
import { Titulo } from "./common/Titulo";
// import Image from "next/image";
// import Heart from "./common/Heart";
import HeartV2 from "./common/HeartV2";

export default function HistorySection() {
    const t = useTranslations('HistorySection');
    return (
        <div className="my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">{t('title')}</Titulo>
            </div>
            <div data-aos="fade-right" data-aos-delay="100" className="grid grid-cols-6">
                <div className="col-span-6 md:col-span-4 flex items-center">
                    <p className="text-lg" dangerouslySetInnerHTML={{__html: t.raw('description')}} />
                </div>
                <div data-aos="fade-left" data-aos-delay="100" className="col-span-6 md:col-span-2 w-[160px] h-[160px] m-auto">
                    <HeartV2/>
                </div>
            </div>
        </div>
    );
}