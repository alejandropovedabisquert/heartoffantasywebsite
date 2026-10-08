"use client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Titulo } from "@/components/ui/Titulo";
import Image from "next/image";
import { motion } from "framer-motion";


export default function TeamSection({
    dict
}: {
    dict: Awaited<ReturnType<typeof getDictionary>>["TeamSection"],
}) {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .3, ease: "easeOut" }}
            >
                <Titulo
                    as={"h2"}
                    position="left"
                    className="text-2xl sm:text-4xl font-bold my-4"
                >
                    {dict.title}
                </Titulo>
            </motion.div>
            <div className="flex flex-wrap flex-row -mx-4 justify-center">
                {dict.members.map((member, index) => (
                    <motion.div
                        key={index}
                        className="shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: .3, ease: "easeOut", delay: (index + 1) * 0.1 }}
                    >
                        <div className="relative overflow-hidden mb-12 hover-grayscale-0 wow fadeInUp">
                            <div className="relative overflow-hidden px-6">
                                <Image src={member.image} width={300} height={300} className="max-w-full h-auto mx-auto rounded-full" alt={member.name} />
                            </div>
                            <div className="pt-6 text-center">
                                <p className="text-lg leading-normal font-bold mb-1">{member.name}</p>
                                <p className="text-gray-200 leading-relaxed font-light">{member.role}</p>
                                <div className="mt-2 mb-5 space-x-2 flex justify-center items-center gap-4" aria-label="Social media links">
                                    {
                                        member.socials &&
                                        member.socials.map((social, idx) => (
                                            <a key={idx} target="_blank" rel="noopener noreferrer" aria-label={`${social.icon} link`} href={social.link}>
                                                <img src={`/rrss_svg/${social.icon}.svg`} alt={`${social.icon} icon`} className="w-6 h-6 scale-100 transition-all hover:scale-150" />
                                            </a>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
