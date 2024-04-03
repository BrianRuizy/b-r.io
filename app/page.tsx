import Image from "next/image";
import Link from "@/app/components/ui/Link";
import { allPosts } from ".contentlayer/generated";

import PostList from "./blog/components/ui/PostList";
import Avatar from "@/public/avatar.png";

import Card from "@/app/components/bento/CardTemplate";
import Map from "@/app/components/bento/map";
import Gumroad from "@/app/components/bento/Gumroad";
import Instagram from "@/app/components/bento/Instagram";
import YouTube from "@/app/components/bento/Youtube";

export default async function Home() {
  const posts = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    // 3 most recent
    .filter((_, i) => i < 3);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex animate-in flex-col gap-8">
        <Image
          src={Avatar}
          width={100}
          height={100}
          alt="avatar"
          className="rounded-full bg-secondaryA"
          style={{ "--index": 1 } as React.CSSProperties}
        />
        <div
          className="animate-in space-y-4"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Brian Ruiz
          </h1>
          <p className="max-w-md leading-relaxed text-secondary">
            Hi there, I&apos;m, a programmer who loves building new things. In
            addition to coding, I also make YouTube videos, where I focus on
            tech, creative vlogging, and personal development.
          </p>
        </div>
      </div>
      <div
        className="grid animate-in grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-8"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <YouTube />
        <Instagram />
        <Gumroad />
        <Card className="relative col-span-2">
          <Map />
          {/* chip showing city bottom left corner of card, above map */}
          <div className="absolute bottom-6 left-6 flex items-center rounded-lg bg-white/25 px-4 py-1.5 backdrop-blur dark:bg-black/25">
            <span className="text-sm font-medium text-primary">Houston, TX</span>
          </div>
        </Card>
      </div>
      <div
        className="flex animate-in flex-col gap-8"
        style={{ "--index": 4 } as React.CSSProperties}
      >
        <h2 className="text-secondary">Latest Posts</h2>
        <PostList posts={posts} />
        <Link
          href="/blog"
          className="text-secondary underline underline-offset-4 hover:text-primary"
        >
          See All
        </Link>
      </div>
    </div>
  );
}
