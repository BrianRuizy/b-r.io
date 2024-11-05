import Image from "next/image";
import type { Project } from ".contentlayer/generated";

import Link from "@/app/components/Link";
import Halo from "@/app/components/Halo";

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className="animated-list -mx-6 flex snap-x snap-mandatory scroll-pl-6 grid-cols-2 flex-nowrap gap-9 overflow-x-scroll px-6 md:grid md:overflow-auto">
      {projects.map((project) => (
        <li
          key={project.slug}
          className="col-span-1 min-w-80 snap-start transition-opacity"
        >
          <Link href={`/projects/${project.slug}`} className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-md bg-secondary">
              <Halo strength={10}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="h-full w-full object-cover"
                />
              </Halo>
            </div>
            <div className="space-y-1">
              <p className="font-medium leading-tight">{project.title}</p>
              <p className="text-secondary">{project.summary}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
