"use client";

import { motion } from "framer-motion";
import { Titulo } from "@/components/ui/Titulo";
import BackButton from "./BackButton";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Locale } from "@/lib/routes";
import { useCookies } from "@/context/CookieContext";
import { Button } from "../ui/Button";

export default function CookiesPolicyContent({
  dict,
  locale,
}: {
  dict: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
}) {
  const { setShowSettings } = useCookies();
  const title = dict.CookiePolicy.title;
  const udpate = dict.CookiePolicy.update;
  const revokeConsent = dict.CookiePolicy.revokeConsent;
  const purposes = dict.CookiePolicy.purposes;
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
        <motion.div
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
          <h2 className="font-bold text-2xl">{purposes.title}</h2>
          <div className="ml-4 mt-4">
            <h3 className="font-bold text-xl">{purposes.essential.title}</h3>
            <p>{purposes.essential.description}</p>
          </div>
           <div className="ml-4 mt-4">
            <h3 className="font-bold text-xl">{purposes.preferences.title}</h3>
            <p>{purposes.preferences.description}</p>
          </div>
        </motion.div>
        <motion.div
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
          <h2 className="font-bold text-2xl">{revokeConsent.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: revokeConsent.text }} />
          <Button variant="contrast" className="mt-6" onClick={() => setShowSettings(true)}>
            {revokeConsent.buttonConfCookies}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
