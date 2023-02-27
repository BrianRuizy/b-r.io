import { GetStaticProps } from "next";
import Image from "next/image";
import { allPosts, allProjects, Post, Project } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";

import Link from "components/Link";
import Section from "components/Section";
import PostList from "components/postlist";
import Gallery from "components/Gallery";
import avatar from "public/avatar.png";

import BitrefillGraphic from "components/projects/BitrefillGraphic";
import TrailRoutesGraphic from "components/projects/TrailRoutesGraphic";
import TracklibGraphic from "components/projects/TracklibGraphic";

import { FaYoutube, FaGithub, FaInstagram } from "react-icons/fa";


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
            <h1 className="text-3xl font-bold tracking-tight">Brian Ruiz</h1>
            <p className="text-secondary">I write code and make videos.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 text-secondary md:items-center">
            <Image src={avatar} width={75} height={75} alt="avatar" className="rounded-full bg-secondaryA"/>
            <div className="space-y-2">
              <p className="flex gap-3 items-center"><FaGithub className="text-xl"/> 908 All Repository Stars</p>
              <p className="flex gap-3 items-center"><FaInstagram className="text-xl"/> 2,908 IG Followers</p>
              <p className="flex gap-3 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                </svg>
                24,908 YouTube Subscribers</p>
            </div>
          </div>
          <p className="text-primary max-w-xl">
            Hey, I&apos;m Brian Ruiz, a software engineer who loves building cool things with code.
            In addition to coding, I also make YouTube videos, where I focus on tech, creative vlogs, and personal development.
          </p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-secondary">
            {/* contact me mail to  */}
            <Link href="mailto:contact@b-r.io" className="flex gap-2 items-center no-underline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
              </svg>
              <span>Email me</span>
            </Link>
            {/* more about me  */}
            <Link href="/about" className="flex gap-2 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
              </svg>
              <span>More about me</span>
            </Link>
          </div>
        </div>
        <div
          className="flex flex-col gap-4 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2>Selected projects</h2>
          <ul className="flex flex-col gap-16">
            {projects.map((project) => (
              <li key={project.title}>
                <Section heading={project.time}>
                  <div className="flex flex-col gap-5">
                    <Link href={`/project/${project.slug}`}>
                      {project.slug === "tracklib" && <TracklibGraphic />}
                      {project.slug === "bitrefill" && <BitrefillGraphic />}
                      {project.slug === "trailroutes" && <TrailRoutesGraphic />}
                    </Link>
                    <div className="flex flex-col gap-1">
                      <h3>{project.title}</h3>
                      <p className="text-secondary">{project.description}</p>
                      <Link href={`/project/${project.slug}`} underline>
                        Read case study
                      </Link>
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
            <h2 className="font-semibold text-2xl">Latest Blogs</h2>
            <Link href="/blog" className="items-start hover:underline">
              See All →
            </Link>
          </div>
          <PostList posts={posts} />
       
        </div>
        <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <div className="flex justify-between">
            <h2 className="font-semibold text-2xl">Latest Videos</h2>
            <a href="https://youtube.com/@brianruizy/videos" target="__blank" className="items-start hover:underline">
              See All →
            </a>
          </div>
          <PostList posts={posts} />
        
        </div>
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
