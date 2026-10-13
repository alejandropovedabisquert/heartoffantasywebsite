"use client";
import { motion } from "framer-motion";
import { Titulo } from "../Titulo";

export default function AnimatedTitle({
    dict
}: {
    dict: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .3, ease: "easeOut" }}
        >
            <Titulo as={"h2"} position="left" className="text-2xl sm:text-4xl font-bold my-4">{dict}</Titulo>
        </motion.div>
    );
}