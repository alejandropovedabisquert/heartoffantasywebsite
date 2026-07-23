"use client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Titulo } from "../../ui/Titulo";
import GridVideo from "../../common/GridVideo";
import { motion } from "framer-motion";

export default function VideosSection({
    dict
}:{
    dict: Awaited<ReturnType<typeof getDictionary>>["VideosSection"],
}) {
    return (
        <div className="relative my-24">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut" }}
            >
                <Titulo as={"h2"} position="left" className="text-2xl sm:text-4xl font-bold my-4">{dict.title}</Titulo>
            </motion.div>
            <GridVideo/>
        </div>
    );
}
