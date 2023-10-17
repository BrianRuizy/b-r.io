import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { allProjects, Project } from ".contentlayer/generated";
import Halo from "@/components/ui/Halo";

export const metadata: Metadata = {
  title: "Projects | Brian Ruiz",
  description:
    "I write about programming, design, and occasionally life updates!",
};

export default function Blog() {
  const projects = allProjects;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight">
            Projects
          </h1>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            Here are some of the projects I&apos;ve worked on.
          </p>
        </div>
      </div>
      <ul
        className="animate-in flex flex-col animated-list"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        {projects.map((project, i) => (
          <li
            key={project.slug}
            className={clsx(
              "py-6 flex flex-col md:flex-row gap-4 md:gap-6 transition-opacity first:pt-0 last:pb-0"
            )}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="w-full md:w-2/5 aspect-video bg-secondary rounded-lg border border-primary overflow-clip select-none"
            >
              <Halo strength={24}>
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full "
                />
              </Halo>
            </Link>
            <div className="w-full md:w-3/5 space-y-1">
              <div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-primary font-medium hover:underline"
                >
                  {project.title}
                </Link>
                <span className="text-secondary"> &bull; {project.time}</span>
              </div>

              <p className="line-clamp-3 text-secondary">
                {project.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
