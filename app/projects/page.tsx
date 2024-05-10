import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { allProjects, Project } from ".contentlayer/generated";
import Halo from "@/app/components/ui/Halo";

export const metadata: Metadata = {
  title: "Projects | Brian Ruiz",
  description: "Here are some of the projects I've worked on.",
};

export default function Blog() {
  const projects = allProjects;

  return (
    <div className="mx-auto max-w-[700px]">
      <div className="flex flex-col gap-16 md:gap-24 ">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              Projects
            </h1>
            <p
              className="animate-in text-secondary"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              Here are some of the projects I&apos;ve worked on.
            </p>
          </div>
        </div>
        <ul
          className="animated-list flex animate-in flex-col"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          {projects.map((project, i) => (
            <li
              key={project.slug}
              className={clsx(
                "flex flex-col gap-4 py-6 transition-opacity first:pt-0 last:pb-0 md:flex-row md:gap-6",
              )}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="aspect-video w-full select-none overflow-clip rounded-lg border border-secondary bg-tertiary md:w-2/5"
              >
                <Halo strength={10}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="h-full w-full object-cover"
                  />
                </Halo>
              </Link>
              <div className="w-full space-y-2 md:w-3/5">
                <div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {project.title}
                  </Link>
                  <time className="text-secondary"> · {project.time}</time>
                </div>

                <p className="line-clamp-3 text-tertiary">
                  {project.summary}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
