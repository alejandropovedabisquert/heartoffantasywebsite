"use client";
import { Titulo } from "../ui/Titulo";
import HeartV2 from "../ui/HeartV2";
import Image from "next/image";
import { motion } from "framer-motion";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default function HistorySection({
    dict
}:{
    dict: Awaited<ReturnType<typeof getDictionary>>["HistorySection"],
}) {
    const title = dict.title
    const description = dict.description
    return (
        <div className="my-24">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut" }}
            >
                <Titulo as={"h2"} position="left" className="text-2xl sm:text-4xl font-bold my-4">{title}</Titulo>
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
                        description.map((line: string, index: number) => (
                            <p key={index} className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: line }} />
                        ))
                    }
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: .3, ease: "easeOut", delay: .2 }}
                    className="col-span-6 md:col-span-2 w-90 h-62.5 m-auto"
                >
                    {/* <HeartV2 /> */}
                    <Image
                        src={"/heart.webp"}
                        className="image-rendering-pixelated"
                        width={800}
                        height={800}
                        alt="logo"
                        priority={true}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}