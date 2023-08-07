import { useState, useEffect } from 'react';
import { pick } from "@contentlayer/client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allPosts, Post as PostType } from ".contentlayer/generated";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";

import { formatDate } from "lib/formatdate";
import PostList from "components/postlist";
import Link from "components/Link";
import Image from "next/image";
import NewsletterInput from "components/NewsletterInput";
import Tags from "components/tags";
import LikeButton from "components/likebutton";
import MDXComponents from "components/MDXComponents";
import Parallax from "components/blog/parallax";

type PostProps = {
  post: PostType;
  related: PostType[];
};

export default function Post({ post, related }: PostProps) {
  const seoTitle = `${post.title} | Brian Ruiz`;
  const seoDesc = `${post.summary}`;
  const url = `https://b-r.io/blog/${post.slug}`;
  const Component = useMDXComponent(post.body.code);

  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    async function fetchViews() {
      const res = await fetch(`/api/hitsSlug?slug=${post.slug}`);
      const data = await res.json();
      setViews(data.Views);
      }
    fetchViews();
  }, [post.slug]);


  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        canonical={url}
        openGraph={{
          title: seoTitle,
          url,
          description: seoDesc,
          images: [
            {
              url: post.og
                ? `https://b-r.io${post.og}`
                : `https://og-image.b-r.vercel.app/${encodeURIComponent(
                    post.title
                  )}?desc=${encodeURIComponent(seoDesc)}&theme=dark.png`,
              alt: post.title,
            },
          ],
          site_name: "Brian Ruiz",
          type: "article",
          article: {
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: ["https://b-r.io"],
          },
        }}
      />

      <div className="flex flex-col gap-20">
        <article>
          <div className="flex flex-col gap-3 animate-in">
            <p className="text-secondary">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              {post.updatedAt ? ` (Updated ${formatDate(post.updatedAt)})` : ""}{" "}
              &bull; {views} views
            </p>
            <h1 className="text-primary text-3xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p
              className="text-xl text-secondary animate-in"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              {post.summary}
            </p>
          </div>

          <div className="h-8" />
          {post.slug === "spring-parallax-framer-motion-guide" ? (
            <div
              className="relative h-0 pb-[50%] bg-[#00000c] overflow-hidden rounded-lg animate-in"
              style={{ "--index": 2 } as React.CSSProperties}
            >
              <div className="absolute inset-0">
                <Parallax offset={100}>
                  <Image
                    src="/blog/spring-parallax-framer-motion-guide/bg.png"
                    width="2024"
                    height="1272"
                    alt="Starry sky"
                    sizes="(min-width: 480px) 780px, 100vw"
                    className="w-full min-h-screen"
                  />
                </Parallax>
              </div>
              <div className="absolute top-1/2 left-1/2 w-[50px] h-[50px] -translate-x-1/2 -translate-y-1/2 md:w-[120px] md:h-[120px]">
                <Image
                  src="/blog/spring-parallax-framer-motion-guide/logo.png"
                  width="324"
                  height="324"
                  alt="Framer Motion stylized logo"
                  sizes="(min-width: 540px) 120px, 50px"
                />
              </div>
            </div>
          ) : (
            <Image
              src={post.image}
              alt={`${post.title} post image`}
              width={700}
              height={350}
              className="w-[calc(100%+48px)] -ml-6 lg:w-[calc(100%+128px)] lg:-ml-16 md:rounded-lg max-w-none animate-in"
              style={{ "--index": 2 } as React.CSSProperties}
              priority
              quality={100}
            />
          )}
          <div className="h-16" />
          <div
            className="prose animate-in"
            style={{ "--index": 3 } as React.CSSProperties}
          >
            <Component components={MDXComponents} />
          </div>
        </article>

        <LikeButton slug={post.slug} />

        <Tags tags={post.tags} />

        {/* <div className="flex flex-col gap-6">
          <h2>Subscribe</h2>
          <p className="text-secondary">
            Get notified when I write new posts.
          </p>
          <NewsletterInput />
        </div> */}

        {related.length ? (
          <div className="flex flex-col items-start gap-6">
            <h2>Related posts</h2>
            <div className="will-change-transform">
              <PostList posts={related} />
            </div>
            <Link href="/blog" underline>
              ← See all
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allPosts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((p) => p.slug === params?.slug);
  const related = allPosts
    /* remove current post */
    .filter((p) => p.slug !== params?.slug)
    /* Find other posts where tags are matching */
    .filter((p) => p.tags?.some((tag: string) => post?.tags?.includes(tag)))
    /* return the first three */
    .filter((_, i) => i < 3)
    /* only return what's needed to render the list */
    .map((p) => pick(p, ["slug", "title", "summary", "publishedAt", "image"]));

  return {
    props: {
      post,
      related,
    },
  };
};
