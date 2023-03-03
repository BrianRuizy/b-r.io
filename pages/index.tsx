import { GetStaticProps } from "next";
import Image from "next/image";
import { allPosts, allProjects, Post, Project } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";

import Link from "components/Link";
import Section from "components/Section";
import PostList from "components/postlist";
import avatar from "public/avatar.png";

import BitrefillGraphic from "components/projects/BitrefillGraphic";
import TrailRoutesGraphic from "components/projects/TrailRoutesGraphic";
import TracklibGraphic from "components/projects/TracklibGraphic";

import { FaYoutube, FaGithub } from "react-icons/fa";


type HomeProps = {
  posts: Post[];
  projects: Project[];
};

export default function Home({ posts, projects }: HomeProps) {
  return (
    <>
      <div className="flex flex-col gap-20 md:gap-28">
        <div className="flex flex-col gap-8 animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">Brian Ruiz</h1>
            <p className="animate-in text-secondary" style={{ "--index": 1 } as React.CSSProperties}>I write code and make videos.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 text-secondary md:items-center">
            <Image src={avatar} width={80} height={80} alt="avatar" className="rounded-full bg-secondary"/>
            <ul className="space-y-2 animated-list">
              <li className="transition-opacity">
                <p className="flex gap-3 items-center">
                  <FaGithub className="text-xl"/>
                  908 All Repository Stars
                </p>
              </li>
              <li className="transition-opacity">
                <p className="flex gap-3 items-center">
                  <FaYoutube className="text-xl"/> 
                  24,908 YouTube Subscribers
                </p>
              </li>
              <li className="transition-opacity">
                <p className="flex gap-3 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                  </svg>
                  2,908 Social Media Followers
                </p>
              </li>
            </ul>
          </div>
          <p className="text-primary max-w-xl">
            Hey, I&apos;m Brian Ruiz, a software engineer who loves building cool things with code.
            In addition to coding, I also make YouTube videos, where I focus on tech, creative vlogs, and personal development.
          </p>
          <ul className="flex flex-col md:flex-row gap-2 md:gap-6 text-secondary animated-list">
            <li className="transition-opacity">
              <Link href="mailto:contact@b-r.io" className="flex gap-2 items-center no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
                <span>Email me</span>
              </Link>
            </li>

            <li className="transition-opacity">
              <Link href="/about" className="flex gap-2 items-center no-underline">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
                <span>Subscribe to newsletter</span>
              </Link>
            </li>

          </ul>
        </div>
        <div
          className="flex flex-col gap-4 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2>Selected projects</h2>
          <ul className="relative flex gap-8 md:gap-16 flex-nowrap overflow-x-scroll snap-x md:overflow-auto snap-mandatory md:flex-col -mx-6 px-6 scroll-pl-6 touch-auto">
            {projects.map((project) => (
              <li key={project.title} className="snap-start min-w-[90%]">
                <Section heading={project.time}>
                  <div className="flex flex-col gap-5">
                    <Link href={`/project/${project.slug}`}>
                      {project.slug === "tracklib" && <TracklibGraphic />}
                      {project.slug === "bitrefill" && <BitrefillGraphic />}
                      {project.slug === "trailroutes" && <TrailRoutesGraphic />}
                    </Link>
                    <div className="flex flex-col gap-1">
                      <Link href={`/project/${project.slug}`} >
                        <h3 className="font-medium">{project.title}</h3>
                      </Link>
                      <p className="text-secondary line-clamp-3">{project.description}</p>
                    </div>
                  </div>
                </Section>
              </li>
            ))}
          </ul>
        </div>
        
        <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <div className="flex justify-between">
            <h2 >Latest Blogs</h2>
            
            <Link href="/blog" className="items-start hover:underline text-secondary">
              See All 
            </Link>
          </div>
          <PostList posts={posts} />
       
        </div>
        {/* <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 4 } as React.CSSProperties}
        >
          <div className="flex justify-between">
            <h2>Latest Videos</h2>
            <a href="https://youtube.com/@brianruizy/videos" target="__blank" className="items-start hover:underline text-secondary">
              See All 
            </a>
          </div>
          <PostList posts={posts} />
        
        </div> */}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .filter((_, i) => i < 4)
    .map((post) => pick(post, ["slug", "title", "publishedAt", "image"]));

  const projects = allProjects.map((post) =>
    pick(post, ["slug", "title", "description", "time"])
  );

  return {
    props: { posts, projects },
  };
};
