import { Metadata } from "next";
import { allCrafts } from ".contentlayer/generated";

import Link from "@/app/components/ui/Link";
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
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
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
            className="max-w-lg animate-in text-tertiary"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            This is a collection of UI components and designs I&apos;ve created. And really my breakable toy where I can experiment with new things.
          </p>
      </div>
      <ul
        className="animated-list flex animate-in flex-col"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        {crafts.map((craft, index) => (
          <li key={index} className="group py-3 transition-opacity">
            <Link href={`/craft/${craft.slug}`}>
              <Section heading={craft.title} invert>
                <p className="text-secondary">{craft.summary}</p>
              </Section>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
