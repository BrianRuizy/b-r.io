"use client";

import Image from "next/image";
import Link from "@/components/ui/Link";
import ConnectLinks from "@/components/ConnectLinks";
import avatar from "public/avatar.png";
import * as Avatar from "@radix-ui/react-avatar";

import * as Tabs from "@radix-ui/react-tabs";

import { getServerSession } from "next-auth/next";
import Profile from "@/components/Profile";

export default function Community() {
  let isMobile = false;
  if (typeof window !== "undefined") {
    isMobile = window.matchMedia("(max-width: 768px)").matches;
  }

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div
        className="flex animate-in items-center justify-between gap-8"
        style={{ "--index": 1 } as React.CSSProperties}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        </div>
        <Profile />
      </div>

      <Tabs.Root
        defaultValue="posts"
        className="-mt-3 block animate-in md:hidden"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <Tabs.List className="mb-6 border-b border-secondary">
          <Tabs.Trigger
            value="posts"
            className="px-3 py-1.5 font-normal text-secondary data-[state=active]:font-medium  data-[state=active]:text-primary"
          >
            Posts
          </Tabs.Trigger>
          <Tabs.Trigger
            value="info"
            className="px-3 py-1.5 font-normal text-secondary data-[state=active]:font-medium  data-[state=active]:text-primary"
          >
            Info
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="posts">
          <Posts />
        </Tabs.Content>
        <Tabs.Content value="info">
          <Info />
        </Tabs.Content>
      </Tabs.Root>

      <div
        className="cols-1 relative hidden animate-in gap-9 md:grid md:grid-cols-3"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <div className="col-span-3 md:col-span-2 md:space-y-6">
          <div className="hidden md:block">
            <textarea
              className="w-full rounded-lg border border-secondary  bg-transparent p-3 shadow-sm placeholder:text-tertiary"
              rows={3}
              placeholder="Share your thoughts..."
            ></textarea>
          </div>

          <Posts />
        </div>
        <div className="col-span-3 md:col-span-1">
          <Info />
        </div>
      </div>
    </div>
  );
}

function Posts() {
  return (
    <div className="divide-y divide-secondary ">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 py-4 first:pt-0 md:flex-col md:py-6"
        >
          <div className="w-fit md:hidden">
            <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:hidden">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                alt="Colm Tuite"
              />
              <Avatar.Fallback
                className="flex h-full w-full items-center justify-center bg-secondary text-sm font-medium text-primary"
                delayMs={600}
              >
                CT
              </Avatar.Fallback>
            </Avatar.Root>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 leading-none">
              <Avatar.Root className="hidden h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:inline-flex">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                />
                <Avatar.Fallback
                  className="flex h-full w-full items-center justify-center bg-secondary text-sm font-medium text-primary"
                  delayMs={600}
                >
                  CT
                </Avatar.Fallback>
              </Avatar.Root>
              <p className="font-medium">@brianruizy</p>
              <div className="flex items-center gap-1.5 text-secondary">
                <p>6h</p>
                <p className="flex items-center rounded bg-tertiary px-1 py-0.5 text-sm">
                  <span className="text-tertiary"># </span>general
                </p>
              </div>
            </div>

            <h2 className="line-clamp-4">
              {index % 2 === 0
                ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            </h2>
            <div className="flex items-center gap-6 text-sm text-tertiary">
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                <span>12 likes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                  />
                </svg>
                <span>7 replies</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Info() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-tertiary dark:bg-secondaryA md:text-sm">
        <div className="space-y-3 p-4">
          <h2 className="font-medium">Community Info</h2>
          <p className="text-secondary">
            A private space for us to connect, share ideas, and grow together.
          </p>
        </div>

        <hr className="border-secondary" />
        <div className="grid grid-cols-2 gap-3 divide-x divide-secondary p-3">
          <div className="col-span-1 flex flex-col items-center">
            <p className="text-secondary">Members</p>
            <p className="text-base font-medium">2k</p>
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <p className="text-secondary">Online</p>
            <p className="text-base font-medium flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              32
            </p>
          </div>
        </div>
      </div>
      <div className="hidden space-y-6 rounded-xl bg-tertiary p-4 dark:bg-secondaryA md:block md:text-sm">
        <div className="space-y-3">
          <h2 className="font-medium">Topics</h2>
          <p className="text-secondary">
            Explore the various conversation topics.
          </p>
        </div>
        <ul className="animated-list gap-y-1.Z flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="transition-opacity">
              <Link
                href=""
                className="flex items-center whitespace-nowrap text-sm lowercase text-primary no-underline"
              >
                <span className="text-tertiary">#</span>general
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6 rounded-xl p-4 md:bg-tertiary md:text-sm md:dark:bg-secondaryA">
        <div className="space-y-3">
          <h2 className="font-medium">Leaderboard</h2>
          <p className="text-secondary">
            Top contributors of the month. Gain points with likes and comments.
          </p>
        </div>
        <ul className="animated-list space-y-2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center gap-3 transition-opacity"
            >
              <p className="mr-3 text-tertiary md:mr-0">{index + 1}</p>
              <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:h-[24px] md:w-[24px]">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                />
                <Avatar.Fallback
                  className="flex h-full w-full items-center justify-center bg-secondary text-sm font-medium text-primary"
                  delayMs={600}
                >
                  CT
                </Avatar.Fallback>
              </Avatar.Root>
              <p>username</p>
              <p className="text-tertiary md:hidden">100 points</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
