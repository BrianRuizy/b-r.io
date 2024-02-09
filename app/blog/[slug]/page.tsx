import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { allPosts, Post as PostType } from ".contentlayer/generated";

import Tags from "@/components/Tags";
import Link from "@/components/ui/Link";
import Mdx from "@/app/blog/components/ui/MdxWrapper";
import ViewCounter from "@/app/blog/components/ui/ViewCounter";
import PostList from "@/app/blog/components/ui/PostList";
import Subscribe from "@/app/blog/components/ui/NewsletterSignupForm";
import { formatDate } from "lib/formatdate";

import Avatar from "@/public/avatar.png";

type PostProps = {
  post: PostType;
  related: PostType[];
};

type Props = {
  params: {
    slug: string;
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    throw new Error("Post not found");
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;

  const ogImage = `https://b-r.io/${image}`;

  const metadata: Metadata = {
    title: `${title} | Brian Ruiz`,
    description,
    openGraph: {
      title: `${title} | Brian Ruiz`,
      description,
      type: "article",
      publishedTime,
      url: `https://b-r.io/blog/${slug}`,
      images: [
        {
          url: `https://b-r.io/api/og?title=${title}`,
          alt: title,
        },
        { url: ogImage, alt: title },
      ],
    },
  };

  return metadata;
}

export default async function Post({ params }: { params: any }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt);

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div className="flex flex-col gap-8">
          <div className="flex max-w-xl flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
              {post.title}
            </h1>
            <p className="text-lg tracking-tight text-tertiary ">
              {post.summary}
            </p>
          </div>
          <div className="flex max-w-none items-center gap-4">
            <Image
              src={Avatar}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full bg-secondary"
            />
            <div className="leading-tight">
              <p className="text-primary">Brian Ruiz</p>
              <p className="text-secondary">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                {post.updatedAt
                  ? `(Updated ${formatDate(post.updatedAt)})`
                  : ""}
                {" · "}
                <ViewCounter post={post} />
              </p>
            </div>
          </div>
        </div>
        {!post.imageless && (
          <>
            <div className="h-8" />
            <Image
              src={post.image}
              alt={`${post.title} post image`}
              width={700}
              height={350}
              className="-ml-6 w-[calc(100%+48px)] max-w-none  md:rounded-lg lg:-ml-16 lg:w-[calc(100%+128px)]"
              priority
              quality={100}
            />
          </>
        )}
        <div className="h-16" />
        <div className="prose prose-neutral">
          <Mdx code={post.body.code} />
        </div>
      </article>
      <Tags tags={post.tags} />
      <Subscribe />
      <Link href="/blog">← All Blogs</Link>
    </div>
  );
}
