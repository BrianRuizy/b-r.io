import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { allPosts, Post as PostType } from ".contentlayer/generated";

import Tags from "@/components/Tags";
import Mdx from "@/app/blog/components/ui/MdxWrapper";
import ViewCounter from "@/app/blog/components/ui/ViewCounter";
import Subscribe from "@/app/blog/components/ui/NewsletterSignupForm";
import { formatDate } from "@/utils/formatDate";

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

  const ogImage = image
    ? `https://b-r.io/${image}`
    : `https://b-r.io/api/og?title=${title}`;

  const metadata: Metadata = {
    metadataBase: new URL('https://b-r.io'),
    title: `${title} | Brian Ruiz`,
    description,
    openGraph: {
      title: `${title} | Brian Ruiz`,
      description,
      type: "article",
      publishedTime,
      url: `https://b-r.io/blog/${slug}`,
      images: [{ url: ogImage, alt: title }],
    },
  };

  return metadata;
}

async function getViewsData({ post }: { post: PostType }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/update-views?slug=${post.slug}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch views");
  }

  return response.json();
}

export default async function Post({ params }: { params: any }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const viewsData = await getViewsData({ post });

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div className="flex flex-col gap-8">
          <div className="flex max-w-xl flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
              {post.title}
            </h1>
            <p className="text-secondary">{post.summary}</p>
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
              <p>Brian Ruiz</p>
              <p className="text-secondary">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                {post.updatedAt
                  ? `(Updated ${formatDate(post.updatedAt)})`
                  : ""}
                {" · "}
                <ViewCounter post={post} initialViews={viewsData.views} />
              </p>
            </div>
          </div>
        </div>
        {post.image && (
          <>
            <div className="h-8" />
            <Image
              src={post.image}
              alt={`${post.title} post image`}
              width={700}
              height={350}
              className="-ml-6 w-[calc(100%+48px)] max-w-none  md:rounded-lg lg:-ml-16 lg:w-[calc(100%+128px)]"
              priority
            />
          </>
        )}
        <div className="h-16" />
        <div className="prose prose-neutral">
          <Mdx code={post.body.code} />
        </div>
      </article>
      <div className="flex flex-col gap-6">
        <h2 className="text-secondary">Tags</h2>
        <Tags tags={post.tags} />
      </div>
      <Subscribe />
    </div>
  );
}
