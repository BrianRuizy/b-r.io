import Halo from "components/Halo";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import hero from "public/featured/hero.png";

import { useRef } from "react";

export default function CovidGraphic() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const { resolvedTheme } = useTheme();

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-gradient-to-bl from-neutral-900 to-neutral-800 h-[283px] border border-primary will-change-transform"
      ref={ref}
    >
      <Halo strength={resolvedTheme === "light" ? 15 : 8}>
        <motion.div
          className="w-[400px] absolute -right-10 z-20 -bottom-10"
          style={{ y }}
        >
          <Image
            src={hero}
            alt="Covid Dashboard Mockup"
            width={610}
            height={400}
            className="scale-150"
          />
        </motion.div>
      </Halo>
    </div>
  );
}
