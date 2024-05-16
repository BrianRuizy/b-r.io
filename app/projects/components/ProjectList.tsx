import Image from "next/image";
import type { Project } from ".contentlayer/generated";

import Halo from "@/app/components/Halo";

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className="grid grid-cols-2 gap-9">
      {projects.map((project) => (
        <li key={project.slug} className="col-span-1 space-y-3">
          <div className="aspect-video bg-secondary">
            <Halo strength={10}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="h-full w-full object-cover"
              />
            </Halo>
          </div>
          <div>
            <p> {project.title} </p>
            <p className="text-balance text-secondary">{project.summary}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
