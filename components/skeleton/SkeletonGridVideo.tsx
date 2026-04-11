import { motion } from "framer-motion";

export default function SkeletonGridVideo({ length = 2 }: { length?: number }) {
  // Crear un array con la longitud especificada
  const skeletons = Array.from({ length }, (_, index) => index);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {skeletons.map((_, index) => (
        <motion.div
          key={index}
          className="col-span-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .3, ease: "easeOut", delay: (index + 1) * 0.1 }}
        >
          <div className="relative overflow-hidden w-full h-[200px] animate-pulse bg-slate-300">
            <div className="absolute w-full h-full bg-black opacity-40 z-10 group-hover/image:opacity-20 transition-all"></div>
            <div className="mt-4 ml-4 w-[80%] h-[10px] animate-pulse bg-slate-500 rounded-md"></div>
            <div className="mt-4 ml-4 w-[70%] h-[10px] animate-pulse bg-slate-500 rounded-md"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}