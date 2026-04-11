"use client";
import { useTranslations } from "next-intl";
import { Titulo } from "./common/Titulo";
import { motion } from "framer-motion";

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
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut" }}
            >
                <Titulo as={"h2"} position="left" className="text-2xl sm:text-4xl font-bold my-4">{t("title")}</Titulo>
            </motion.div>
            {subtitle && (
                <motion.p
                    className="mb-8 text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .3, ease: "easeOut", delay: .1 }}
                >{subtitle}</motion.p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    t.raw("features").map((feature: featureProps, index: number) => (
                        <motion.div
                            key={index}
                            className="col-span-1"
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: .3, ease: "easeOut", delay: (index + 1) * 0.1 }}
                        >
                            <h3 className="font-bold text-xl sm:text-2xl">
                                {feature.title}
                            </h3>
                            <p dangerouslySetInnerHTML={{ __html: feature.description }} />
                        </motion.div>
                    ))
                }
            </div>
            {conclusion && (
                <motion.p
                    className="my-8 text-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .3, ease: "easeOut", delay: .1 }}
                >
                    {conclusion}
                </motion.p>
            )}
        </div>
    );
}