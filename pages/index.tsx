import { useState, useEffect } from 'react';
import { GetStaticProps } from "next";
import Image from "next/image";
import { allPosts, Post } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";
import { FaYoutube, FaGithub } from "react-icons/fa";

import PostList from "components/postlist";
import avatar from "public/avatar.png";
import Link from "components/Link";
import { IconArrowDiagonal, IconTrending } from "components/Icons";

type HomeProps = {
  posts: Post[];
  featured: Post[];
};

function addCommas(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Home({ posts }: HomeProps) {

  const username = 'brianruizy'

  const [stars, setStars] = useState<number>(0);
  const [subscribers, setSubscribers] = useState(0);
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    async function fetchStars() {
      const res = await fetch(`api/github?username=${username}`);
      const data = await res.json();
      setStars(addCommas(data.stars));
    }
    fetchStars();
  }, []);

  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const res = await fetch(`/api/youtube`);
        const data = await res.json();
        setSubscribers(addCommas(data.subscribers));
      } catch (error) {
        console.error(error);
      }
    }
    fetchSubscribers();
  }, []);

  useEffect(() => {
    async function fetchViews() {
      const res = await fetch(`/api/hitsTotal`);
      const data = await res.json();
      setViews(addCommas(data.total));
    }
    fetchViews();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-8 animate-in">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              Brian Ruiz
            </h1>
            <p
              className="text-secondary animate-in"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              I write code and make videos.
            </p>
          </div>
          <div
            className="animate-in flex flex-col md:flex-row gap-6 text-secondary md:items-center"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            <Image
              src={avatar}
              width={80}
              height={80}
              alt="avatar"
              className="rounded-full bg-secondary"
            />
            <ul className="space-y-2 animated-list">
              <li className="transition-opacity">
                <Link className="flex gap-3 items-center no-underline" 
                  href={'https://github.com/' + username}
                >
                  <FaGithub className="text-xl" />
                  {stars} Repository Stars
                </Link>
              </li>
              <li className="transition-opacity">
                <Link className="flex gap-3 items-center" href="/blog">
                  <IconTrending />
                  {views} Total Blog Views
                </Link>
              </li>

              <li className="transition-opacity">
                <Link className="flex gap-3 items-center no-underline" 
                  href={'https://www.youtube.com/@' + username}
                >
                  <FaYoutube className="text-xl" />
                  {subscribers} YouTube Subscribers
                </Link>
              </li>
            </ul>
          </div>
          <p
            className="text-primary max-w-lg animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            Hi, I&apos;m Brian Ruiz, a software engineer who loves building cool
            things with code. In addition to coding, I also make YouTube videos,
            where I focus on tech, creative vlogs, and personal development.
          </p>
          <ul
            className="flex flex-col md:flex-row gap-2 md:gap-6 text-secondary animated-list animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <li className="transition-opacity">
              <Link
                href="mailto:contact@b-r.io"
                className="flex gap-2 items-center no-underline"
              >
                <IconArrowDiagonal />
                <span>Email me</span>
              </Link>
            </li>
            <li className="transition-opacity">
              <Link
                href="/links"
                className="flex gap-2 items-center no-underline"
              >
                <IconArrowDiagonal />
                <span>Connect with me</span>
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <h2>Latest Blogs</h2>
          <PostList posts={posts} />
          <Link href="/blog" className="underline">See All</Link>
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
    .filter((post) => !post.featured)
    .filter((_, i) => i < 3)
    .map((post) => pick(post, ["slug", "title", "publishedAt", "image"]));

  const featured = allPosts
    .filter((post) => post.featured)

    .map((post) =>
      pick(post, ["slug", "title", "publishedAt", "image", "summary"])
    );

  return {
    props: { posts, featured },
  };
};
