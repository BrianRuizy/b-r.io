"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";


type SectionProps = {
  heading: string;
  headingAlignment?: "right" | "left";
  children: ReactNode;
};

export default function Section({
  heading,
  headingAlignment,
  children,
}: SectionProps) {

  const { theme } = useTheme();

  return (
    <section className="flex flex-col md:flex-row gap-2 md:gap-9 col-reverse">
      <h2
        className={clsx(
          "md:w-32 text-secondary shrink-0",
          headingAlignment === "right" && "md:text-right",
          theme === "terminal" ? "font-mono tracking-tight" : ""
          )}
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}
