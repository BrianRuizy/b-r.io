import { allProjects } from ".contentlayer/generated";
import { notFound } from "next/navigation";

import Mdx from "@/app/blog/components/MdxWrapper";
import Link from "@/app/components/ui/Link";

export default function Project({ params }: { params: any }) {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 text-secondary">
            <p>{project.time}</p>
            {project.url && (
              <>
                <span>&middot;</span>
                <Link
                  href={project.url}
                  className="no-underline hover:underline"
                >
                  Visit Project
                </Link>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
            {project.title}
          </h1>
          <p className="text-secondary">{project.summary}</p>
        </div>
        <div className="h-12" />
        <div className="project prose">
          <Mdx code={project.body.code} />
        </div>
      </article>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <h2>Contact</h2>
          <p className="max-w-lg text-secondary">
            Need more details, or interested in working together? Reach out at
            any of my{" "}
            <Link href="/links" underline>
              links
            </Link>
            . I&apos;d be happy to connect!{" "}
          </p>
        </div>

        <Link href="/projects" className="text-primary underline">
          ← All Projects
        </Link>
      </div>
    </div>
  );
}
