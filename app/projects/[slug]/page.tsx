import { allProjects } from ".contentlayer/generated";
import { notFound } from "next/navigation";

import Avatar from "@/app/components/Avatar";
import Link from "@/app/components/Link";
import Mdx from "@/app/blog/components/MdxWrapper";
import NewsletterSignupForm from "@/app/blog/components/NewsletterSignupForm";
import Me from "@/public/avatar.png";

export default function Project({ params }: { params: any }) {
  const project = allProjects.find((project) => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div className="flex flex-col gap-8">
          <div className="flex max-w-xl flex-col gap-4 text-pretty">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
              {project.title}
            </h1>
            <p className="text-secondary">
              {project.longSummary || project.summary}
            </p>
          </div>
          <div className="flex max-w-none items-center gap-4">
            <Avatar src={Me} initials="br" size="sm" />
            <div className="leading-tight">
              <p>Brian Ruiz</p>
              <p className="text-secondary">
                <time dateTime={project.date}>{project.date}</time>
                {" · "}

                <Link underline href={project.url || ""}>
                  Visit Project
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="h-16" />
        <div className="project prose prose-neutral">
          <Mdx code={project.body.code} />
        </div>
      </article>

      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <h2>Contact</h2>
          <p className="max-w-md text-pretty text-secondary">
            Questions or need more details? Ping me on{" "}
            <Link href="/discord" underline>
              Discord,
            </Link>{" "}
            or any of my other social media{" "}
            <Link href="/links" underline>
              links
            </Link>
            .
          </p>
        </div>
        <NewsletterSignupForm contained={false} />
      </div>
    </div>
  );
}
