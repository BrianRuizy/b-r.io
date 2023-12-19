"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { allProjects, Project } from ".contentlayer/generated";
import Halo from "@/components/ui/Halo";

import { useLang } from "@/components/LanguageProvider";
import { projectTranslations } from "@/translations/projectTranslations";

export default function Project() {
  const projects = allProjects;
  const { lang } = useLang();
  const text = projectTranslations[lang];

  return (
    <div className="max-w-[700px] mx-auto">
    <div className="flex flex-col gap-16 md:gap-24 ">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight">
            {text.title}
          </h1>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            {text.subTitle}
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
              className="w-full md:w-2/5 aspect-video bg-tertiary rounded-lg border border-secondary overflow-clip select-none"
            >
              <Halo strength={10}>
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </Halo>
            </Link>
            <div className="w-full md:w-3/5 space-y-2">
              <div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-primary font-medium hover:underline"
                >
                  {project.title}
                </Link>
                <time className="text-secondary"> · {project.time}</time>
              </div>

              <p className="line-clamp-3 text-tertiary">
                {project.description[`${lang}`]}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}
