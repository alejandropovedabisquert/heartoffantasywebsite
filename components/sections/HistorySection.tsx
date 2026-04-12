"use client";
import { useTranslations } from "next-intl";
import { Titulo } from "../ui/Titulo";
import HeartV2 from "../ui/HeartV2";
import { motion } from "framer-motion";

export default function HistorySection() {
    const t = useTranslations('HistorySection');
    return (
        <div className="my-24">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut" }}
            >
                <Titulo as={"h2"} position="left" className="text-2xl sm:text-4xl font-bold my-4">{t('title')}</Titulo>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut", delay: .1 }}
                className="grid grid-cols-6"
            >
                <div className="col-span-6 md:col-span-4 flex flex-col">
                    {
                        t.raw('description').map((line: string, index: number) => (
                            // HTML seguro: contenido de traducciones controladas por el desarrollador
                            <p key={index} className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: line }} />
                        ))
                    }
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .3, ease: "easeOut", delay: .2 }}
                    className="col-span-6 md:col-span-2 w-[250px] h-[250px] m-auto"
                >
                    <HeartV2 />
                </motion.div>
            </motion.div>
        </div>
    );
}