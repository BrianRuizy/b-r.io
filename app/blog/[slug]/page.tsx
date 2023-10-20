import { allPosts, Post as PostType } from ".contentlayer/generated";
import Image from "next/image";
import { notFound } from "next/navigation";

import Mdx from "@/app/blog/components/ui/MdxWrapper";
import ViewCounter from "@/app/blog/components/ui/ViewCounter";
import PostList from "@/app/blog/components/ui/PostList";
import Parallax from "@/app/blog/components/mdx/parallax";
import Tags from "@/components/Tags";
import Link from "@/components/ui/Link";
import { formatDate } from "lib/formatdate";

type PostProps = {
  post: PostType;
  related: PostType[];
};

export default function Post({ params }: { params: any }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  // const seoTitle = `${post.title} | Brian Ruiz`;
  // const seoDesc = `${post.summary}`;
  // const url = `https://b-r.io/blog/${post.slug}`;
  // const MDXContent = useMDXComponent(post?.body.code);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div className="flex max-w-xl animate-in flex-col gap-3">
          <p className="text-secondary">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            {post.updatedAt ? `(Updated ${formatDate(post.updatedAt)})` : ""}
            {" · "}
            <ViewCounter post={post} />
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
            {post.title}
          </h1>
          <p
            className="animate-in text-lg leading-tight text-secondary md:text-xl"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            {post.summary}
          </p>
        </div>
        {post.image && (
          <>
            <div className="h-8" />
            <Image
              src={post.image}
              alt={`${post.title} post image`}
              width={700}
              height={350}
              className="-ml-6 w-[calc(100%+48px)] max-w-none animate-in md:rounded-lg lg:-ml-16 lg:w-[calc(100%+128px)]"
              style={{ "--index": 2 } as React.CSSProperties}
              priority
              quality={100}
            />
          </>
        )}

        <div className="h-16" />
        <div
          className="prose prose-neutral animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <Mdx code={post.body.code} />
        </div>
      </article>

      <Tags tags={post.tags} />

      <Link href="/blog">← All Blogs</Link>
      {/* {related.length ? (
        <div className="flex flex-col items-start gap-6">
          <h2>Related posts</h2>
          <div className="will-change-transform">
            <PostList posts={related} />
          </div>
          <Link href="/blog" underline>
            ← See all
          </Link>
        </div>
      ) : null} */}
    </div>
  );
}
