"use client";
import { useTranslations } from "next-intl";
import { Titulo } from "../ui/Titulo";
import GridVideo from "./GridVideo";
import { motion } from "framer-motion";

export default function VideosSection() {
    const t = useTranslations('VideosSection');
    return (
        <div className="relative my-24">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut" }}
            >
                <Titulo as={"h2"} position="left" className="text-2xl sm:text-4xl font-bold my-4">{t("title")}</Titulo>
            </motion.div>
            <GridVideo/>
        </div>
    );
}
