"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  heading: string;
  headingAlignment?: "right" | "left";
  children: ReactNode;
  invert?: boolean;
};

export default function Section({
  heading,
  headingAlignment,
  children,
  invert = false,
}: SectionProps) {
  return (
    <section className="col-reverse flex flex-col gap-2 md:flex-row md:gap-9">
      <h2
        className={clsx(
          "shrink-0 md:w-32",
          headingAlignment === "right" && "md:text-right",
          invert ? "text-primary font-medium" : "text-secondary",
        )}
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}
