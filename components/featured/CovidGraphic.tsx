import { useRef } from "react";
import Image from "next/image";
import Halo from "components/Halo";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useTheme } from "next-themes";

import covidMockup from "public/featured/covidMockup.png";

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
      className="relative rounded-xl bg-tertiary overflow-hidden h-[283px] will-change-transform border border-primary"
      ref={ref}
    >
      <Halo strength={resolvedTheme === "light" ? 15 : 8}>
        <motion.div className="absolute z-20" style={{ y }}>
          <Image
            src={covidMockup}
            alt="Covid Dashboard Mockup"
            width={610}
            height={400}
          />
        </motion.div>
      </Halo>
    </div>
  );
}
