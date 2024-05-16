import { Metadata } from "next";
import { allCrafts } from ".contentlayer/generated";

import Link from "@/app/components/Link";
import Section from "@/app/components/Section";

export const metadata: Metadata = {
  title: "Craft | Brian Ruiz",
  description:
    "I write about programming, design, and occasionally life updates!",
  openGraph: {
    title: "Craft | Brian Ruiz",
    description:
      "I write about programming, design, and occasionally life updates!",
    type: "website",
    url: "https://b-r.io/craft/",
    images: [{ url: "https://b-r.io/api/og?title=Craft", alt: "Craft" }],
  },
};

export default function CraftPage() {
  const crafts = allCrafts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight">
            Craft
          </h1>
          <p
            className="animate-in text-secondary"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            My UI sandbox.
          </p>
        </div>
        <p
          className="max-w-md animate-in text-tertiary"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          This is where I experiment with UI and interaction design. I use this
          space to explore new ideas or recreate cool things.
        </p>
      </div>
      <ul
        className="animated-list flex animate-in flex-col"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        {crafts.map((craft, index) => (
          <li key={index} className="group py-3 transition-opacity first:pt-0">
            <Link href={`/craft/${craft.slug}`}>
              <Section heading={craft.title} invert>
                <p className="text-pretty text-secondary">{craft.summary}</p>
              </Section>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
