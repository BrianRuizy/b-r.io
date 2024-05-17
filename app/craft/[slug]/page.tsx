import { notFound } from "next/navigation";
import { allCrafts } from ".contentlayer/generated";

import Mdx from "@/app/craft/components/MdxWrapper";

export default async function Blog({ params }: { params: any }) {
  const craft = allCrafts.find((craft) => craft.slug === params.slug);

  if (!craft) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div className="flex flex-col gap-8">
          <div className="flex max-w-xl flex-col text-pretty">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
              {craft.title}
            </h1>
            
            <p className="text-secondary">
              <time dateTime={craft.date}>{craft.date}</time>
            </p>
          </div>
        </div>

        <div className="h-12" />
        <div className="prose prose-neutral text-pretty prose-headings:text-base">
          <Mdx code={craft.body.code} />
        </div>
      </article>
    </div>
  );
}
