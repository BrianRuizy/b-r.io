import { allBlogs } from ".contentlayer/generated";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

import Link from "@/app/components/Link";
import { allProjects } from ".contentlayer/generated";
import PostList from "@/app/blog/components/PostList";

import ProjectList from "@/app/projects/components/ProjectList";

export default function Home() {
  const blogs = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // 3 most recent
    .filter((_, i) => i < 3);

  const projects = allProjects;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="animate-in text-3xl font-semibold tracking-tight text-primary">
            hey, Brian here!
          </h1>
          <p
            className="max-w-lg animate-in text-secondary"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            I am a software engineer who builds for the web with a
            design-oriented approach. In addition to coding, I make{" "}
            <Link href="https://youtube.com/@brianruizy">YouTube</Link> videos,
            where I focus on tech, and productivity.
          </p>
        </div>
        <ul
          className="flex animate-in gap-3 text-sm"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <li className="flex w-fit items-center rounded-full bg-secondary px-3 py-1 hover:bg-tertiary">
            partners@b-r.io
            <ArrowUpRightIcon className="h-4 w-4 text-tertiary" />
          </li>
          <li className="flex w-fit items-center rounded-full bg-secondary px-3 py-1 hover:bg-tertiary">
            Photos
            <ArrowUpRightIcon className="h-4 w-4 text-tertiary" />
          </li>
          <li className="flex w-fit items-center rounded-full bg-secondary px-3 py-1 hover:bg-tertiary">
            Tweets
            <ArrowUpRightIcon className="h-4 w-4 text-tertiary" />
          </li>
        </ul>
      </div>

      <div
        className="flex animate-in flex-col gap-8"
        style={{ "--index": 4 } as React.CSSProperties}
      >
        <p className="tracking-tight text-secondary">Pinned Projects</p>
        <ProjectList projects={projects} />
      </div>

      <div
        className="flex animate-in flex-col gap-8"
        style={{ "--index": 4 } as React.CSSProperties}
      >
        <div className="space-y-4">
          <Link
            className="group flex items-center gap-2 tracking-tight text-secondary"
            href="/blog"
          >
            Latest blogs
            <ArrowUpRightIcon className="h-5 w-5 text-tertiary transition-all group-hover:text-primary" />
          </Link>
          <p className="max-w-lg text-tertiary">
            I occasionally write about programming, productivity, and more.
            Check me out and subscribe to stay up to date.
          </p>
        </div>
        <PostList posts={blogs} />
      </div>
    </div>
  );
}
