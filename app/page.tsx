"use client";
import Image from "next/image";
import Link from "@/components/ui/Link";
import { allPosts } from ".contentlayer/generated";

import PostList from "./blog/components/ui/PostList";
import Stats from "@/components/Stats";

import { useLang } from "@/components/LanguageProvider";
import { homeTranslations } from "@/translations/homeTranslations";

import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import profilePicture from "@/public/profile_picture.svg";

export default function Home() {
  const { lang } = useLang();
  const text = homeTranslations[lang];
  const posts = allPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .filter((post) => post._id.includes(`/${lang.toLowerCase()}/`)) // Posts for the concerning language
    .filter((_, i) => i < 3); // 3 most recent

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex animate-in flex-col gap-8">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight text-primary">
            Oscar Decloquemement
          </h1>
          <p
            className="animate-in text-secondary"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            {text.subHome}
          </p>
        </div>
        <div
          className="flex animate-in flex flex-col gap-6 text-secondary md:flex-row md:items-center"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <Image
            src={profilePicture}
            width={85}
            height={85}
            alt="profilePicture"
            className="rounded-full bg-secondary"
          />
          <Stats />
        </div>
        <p
          className="text-primary max-w-lg animate-in text-primary"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          {text.description}
        </p>
        <ul
          className="animated-list flex animate-in flex-col gap-2 text-secondary md:flex-row md:gap-6"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <li className="transition-opacity">
            <Link
              href="mailto:contact@b-r.io"
              className="flex items-center gap-2 no-underline"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>{text.mail}</span>
            </Link>
          </li>
          <li className="transition-opacity">
            <Link
              href="/links"
              className="flex items-center gap-2 no-underline"
            >
              <ArrowUpRightIcon className="h-5 w-5" />
              <span>{text.contact}</span>
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="flex animate-in flex-col gap-8"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <h2 className="text-secondary">{text.publication}</h2>
        <PostList posts={posts} />
        <Link 
          href="/blog" 
          className="underline dark:text-neutral-100"
        >
          {text.seeAll}
        </Link>
      </div>
    </div>
  );
}
