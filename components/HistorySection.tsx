import { useTranslations } from "next-intl";
import { Titulo } from "./common/Titulo";
import Image from "next/image";

export default function HistorySection() {
    const t = useTranslations('HistorySection');
    return (
        <div className="my-24">
            <div data-aos="fade-right">
                <Titulo as={"h2"} position="left" className="text-4xl font-bold my-4">{t.rich('title')}</Titulo>
            </div>
            <div data-aos="fade-right" data-aos-delay="100" className="grid grid-cols-6">
                <div className="col-span-6 md:col-span-4 flex items-center">
                    <p className="text-lg">
                        {t.rich('description',{
                            important: (chunks) => (<strong>{chunks}</strong>),
                        })}
                    </p>
                </div>
                <div data-aos="fade-left" data-aos-delay="100" className="col-span-6 md:col-span-2">
                    <Image 
                        data-aos="fade-left" 
                        className="float-right" 
                        src="/heart.png" 
                        alt=""
                        width={250}
                        height={250}
                        unoptimized={true} 
                    />
                </div>
            </div>
        </div>
    );
}