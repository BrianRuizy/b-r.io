"use client";
import { allProjects, Post as PostType } from ".contentlayer/generated";
import Image from "next/image";
import { notFound } from "next/navigation";

import Mdx from "@/app/blog/components/ui/MdxWrapper";
import PostList from "@/app/blog/components/ui/PostList";
import Tags from "@/components/Tags";
import Link from "@/components/ui/Link";
import { formatDate } from "lib/formatdate";

import { useLang } from "@/components/LanguageProvider";
import { projectTranslations } from "@/translations/projectTranslations";

type PostProps = {
  post: PostType;
  related: PostType[];
};

export default function Project({ params }: { params: any }) {
  const post = allProjects.find((post) => post.slug === params.slug);

  const { lang } = useLang();
  const text = projectTranslations[lang];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20">
      <article>
        <div className="flex animate-in flex-col gap-3">
          <div className="flex gap-3 text-secondary">
            <p>{post.time}</p>
            {post.url && (
              <>
                <span>&middot;</span>
                <Link href={post.url} className="hover:text-primary">
                  {text.seeProject}
                </Link>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-primary">
            {post.title}
          </h1>
          <p
            className="animate-in text-lg leading-tight text-secondary md:text-xl"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            {post.description[lang]}
          </p>
        </div>

        <div className="h-12" />
        <div
          className="prose prose animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Mdx code={post.body.code} />
        </div>
      </article>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-6">
          <h2>Tags</h2>
          <div className="flex flex-wrap gap-3 ">
            {typeof post.tags === "object" && post.tags[lang]
              ? post.tags[lang].map((tag: string) => (
                  <div
                    key={tag}
                    className="whitespace-nowrap rounded-lg bg-secondary px-4 py-1.5 text-sm text-secondary"
                  >
                    {tag}
                  </div>
                ))
              : post.tags.map((tag: string) => (
                  <div
                    key={tag}
                    className="whitespace-nowrap rounded-lg bg-secondary px-4 py-1.5 text-sm text-secondary"
                  >
                    {tag}
                  </div>
                ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2>Contact</h2>
          <p className="max-w-lg text-secondary ">
            {text.contact}{" "}
            <Link
              href="mailto:contact@b-r.io"
              className="text-primary underline"
            >
              contact@o-d.me
            </Link>
          </p>
        </div>

        <Link href="/projects" className="text-primary underline">
          ← {text.allProjects}
        </Link>
      </div>

      <div />
    </div>
  );
}
