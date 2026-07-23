"use client";

import { motion } from "framer-motion";
import { Titulo } from "@/components/ui/Titulo";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/routes";
import BackButton from "@/components/common/BackButton";

export default function PrivacyPolicyContent({
  dict,
  locale
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale
}) {
    const title = dict.PrivacyPolicySection.title
    const udpate = dict.PrivacyPolicySection.update
    const parts = dict.PrivacyPolicySection.parts
  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <BackButton dict={dict.BackButton} locale={locale} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
      >
        <Titulo
          as={"h1"}
          position="left"
          className="text-3xl sm:text-4xl font-bold mt-10"
        >
          {title}
        </Titulo>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        className="mb-6"
      >
        <p dangerouslySetInnerHTML={{ __html: udpate }} />
      </motion.div>
      <div>
        {parts.map((feature, index: number) => (
          <motion.div
            key={index}
            className="mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: 0.3,
            }}
          >
            <h3 className="font-bold text-2xl">{feature.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: feature.description }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
