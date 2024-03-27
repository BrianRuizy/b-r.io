import Image from "next/image";
import Link from "@/app/components/ui/Link";
import { allPosts } from ".contentlayer/generated";

import PostList from "./blog/components/ui/PostList";
import Avatar from "@/public/avatar.png";
import { FaYoutube } from "react-icons/fa";

import Card from "@/app/components/bento/card";
import Map from "@/app/components/bento/map";

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
        <div className="col-span-2 row-span-1 flex justify-between gap-6 rounded-2xl border border-secondary p-6 p-6 shadow-sm">
          <div className="flex flex-col gap-1.5">
            <div className="flex aspect-square h-10 w-fit items-center justify-center rounded-xl bg-red-500 dark:bg-red-600">
              <FaYoutube className="text-2xl text-white" />
            </div>
            <p className="text-secondary">@brianruizy</p>
            <Link
              className="mt-auto flex gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm text-primary no-underline"
              href="https://youtube.com/@Brianruizy?sub_confirmation=1"
            >
              <span className="font-medium">Subscribe</span>
              <span className="opacity-75">60k</span>
            </Link>
          </div>
          <div className="grid w-full grid-cols-2 grid-rows-2 gap-3">
            <div className="col-span-1 row-span-1 rounded-lg border border-secondary bg-[url('https://i9.ytimg.com/vi_webp/j68U1wBplk8/mqdefault.webp?v=66026be1&sqp=CPyXmbAG&rs=AOn4CLCrhaW7FwazB4VH_vkj1Z-4ICq1XA')] bg-cover bg-center"></div>
            <div className="col-span-1 row-span-1 rounded-lg border border-secondary bg-[url('https://i9.ytimg.com/vi_webp/53KFVt2GRkE/mqdefault.webp?v=65fcb383&sqp=CPyXmbAG&rs=AOn4CLCD92jM3CPVHosay49YOe5ji3jdHg')] bg-cover bg-center"></div>
            <div className="col-span-1 row-span-1 rounded-lg border border-secondary bg-[url('https://i9.ytimg.com/vi/mH4Fs1Pxomo/mqdefault.jpg?v=65f1d403&sqp=CPyXmbAG&rs=AOn4CLCVEVTdWr2uIRhEYnqzLSm_9t5Y8g')] bg-cover bg-center"></div>
            <div className="col-span-1 row-span-1 rounded-lg border border-secondary bg-[url('https://i9.ytimg.com/vi/BlB5wovFmjc/mqdefault.jpg?v=65f53eb0&sqp=CPyXmbAG&rs=AOn4CLCuHnlTYnHH9YuyylOJxjtEk-9onQ')] bg-cover bg-center"></div>
          </div>
        </div>

        <Card className="grid-rows-7 grid aspect-square grid-cols-7 gap-1 p-6">
          {/* 7x7 grid */}
          {Array.from({ length: 49 }).map((_, i) => (
            <div
              key={i}
              className="col-span-1 row-span-1 aspect-square rounded bg-primary"
            ></div>
          ))}
        </Card>
        <div className="col-span-1 row-span-1 rounded-2xl border border-secondary p-6 shadow-sm"></div>
        <Map />
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
