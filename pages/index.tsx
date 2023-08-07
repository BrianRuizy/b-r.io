import { GetStaticProps } from "next";
import Image from "next/image";
import { allPosts, Post } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";
import { FaYoutube, FaGithub } from "react-icons/fa";

import PostList from "components/postlist";
import avatar from "public/avatar.png";
import Link from "components/Link";
import { IconArrowDiagonal, IconTrending } from "components/Icons";

import useSWR from "swr";
import fetcher from "lib/fetcher";
import { addCommas } from "lib/utils";

type HomeProps = {
  posts: Post[];
  featured: Post[];
};

export default function Home({ posts }: HomeProps) {
  const username = "brianruizy";
  const { data: data1, error: error1 } = useSWR(
    `/api/github?username=${username}`,
    fetcher
  );
  const { data: data2, error: error2 } = useSWR(`/api/hitsTotal`, fetcher);
  const { data: data3, error: error3 } = useSWR(`/api/youtube`, fetcher);

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
              width={85}
              height={85}
              alt="avatar"
              className="rounded-full bg-secondary"
            />
            <ul className="space-y-2 animated-list">
              <li className="transition-opacity">
                <Link
                  className="flex gap-3 items-center no-underline"
                  href={"https://github.com/" + username}
                >
                  <FaGithub className="text-xl" />
                  {addCommas(data1?.stars)} Repository Stars
                </Link>
              </li>
              <li className="transition-opacity">
                <Link className="flex gap-3 items-center" href="/blog">
                  <IconTrending />
                  {addCommas(data2?.total)} Total Blog Views
                </Link>
              </li>

              <li className="transition-opacity">
                <Link
                  className="flex gap-3 items-center no-underline"
                  href={"https://www.youtube.com/@" + username}
                >
                  <FaYoutube className="text-xl" />
                  {addCommas(data3?.subscribers)} YouTube Subscribers
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
          <Link href="/blog" className="underline">
            See All
          </Link>
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
