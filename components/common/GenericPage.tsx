"use client";

import { motion } from "framer-motion";
import { Titulo } from "@/components/ui/Titulo";
import { useTranslations } from "next-intl";
import BackButton from "./BackButton";

type partsProps = {
    title: string;
    description: string;
    contentList: string;
}

export default function GenericPage({ translationsKey }: { translationsKey: string }) {
    const t = useTranslations(translationsKey);
    return (
        <div className="container">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut" }}
            >
                <BackButton />
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut", delay: .1 }}
            >
                <Titulo as={"h2"} position="left" className="text-3xl sm:text-4xl font-bold my-4">{t("title")}</Titulo>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut", delay: .2 }}
                className="mb-6"
            >
                <p dangerouslySetInnerHTML={{ __html: t.raw("update") }} />
            </motion.div>
            <div>
                {
                    t.raw("parts").map((feature: partsProps, index: number) => (
                        <motion.div 
                        key={index} 
                        className="mb-6" 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: .3, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                        >
                            <h3 className="font-bold text-2xl">
                                {feature.title}
                            </h3>
                            <div dangerouslySetInnerHTML={{ __html: feature.description }} />
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
}