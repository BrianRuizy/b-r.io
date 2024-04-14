"use client";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

import clsx from "clsx";
import { Drawer } from "vaul";
import * as Avatar from "@radix-ui/react-avatar";
import * as Tabs from "@radix-ui/react-tabs";
import * as Form from "@radix-ui/react-form";

import Link from "@/components/ui/Link";
import Profile from "@/components/Profile";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function Community() {
  const { data: session } = useSession();
  // valid state for textarea input
  const [isValid, setIsValid] = React.useState(false);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div
        className="flex animate-in items-center justify-between gap-8"
        style={{ "--index": 1 } as React.CSSProperties}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-secondary">Let&apos;s talk about it.</p>
        </div>
        <Profile />
      </div>

      {/* tabbed layout for mobile */}
      <Tabs.Root
        defaultValue="posts"
        className="block animate-in md:hidden"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <Tabs.List className="-mt-1.5 mb-3 flex w-full border-b border-secondary">
          <Tabs.Trigger
            value="posts"
            className="border-b-2 border-transparent px-3 py-1.5 text-secondary data-[state=active]:border-black data-[state=active]:text-primary data-[state=active]:dark:border-white"
          >
            Posts
          </Tabs.Trigger>
          <Tabs.Trigger
            value="info"
            className="border-b-2 border-transparent px-3 py-1.5 text-secondary data-[state=active]:border-black data-[state=active]:text-primary data-[state=active]:dark:border-white"
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

      {/* button for mobile */}

      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <div className="fixed bottom-6 right-6 transition-all md:hidden">
          <button className="rounded-xl bg-primary p-3 text-primary invert drop-shadow-2xl">
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Form.Root>
            <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 h-[96%] rounded-t-[10px] bg-primary outline-none">
              <div className="h-full flex-1 space-y-6 rounded-t-[10px] bg-primary">
                <div className="flex items-center justify-between border-b border-secondary px-6 py-3">
                  <button className="w-16 text-left">
                    Cancel
                  </button>
                  <Drawer.Title className="flex-1 text-center text-lg font-bold tracking-tight">
                    New Post
                  </Drawer.Title>
                  <button
                    className={clsx(
                      "text-link w-16 text-right",
                      isValid ? "text-link font-medium" : "text-tertiary",
                    )}
                  >
                    Share
                  </button>
                </div>
                <div className="mb-3 flex gap-3 p-6">
                  <div>
                    <Avatar.Root className="inline-flex h-[36px] w-[36px] select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
                      <Avatar.Image
                        className="h-full w-full rounded-[inherit] object-cover"
                        src={session?.user?.image ?? ""}
                        alt="Avatar image"
                      />
                      <Avatar.Fallback
                        className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-sm font-medium text-primary"
                        delayMs={600}
                      >
                        {session?.user?.name?.slice(0, 2) ?? ""}
                      </Avatar.Fallback>
                    </Avatar.Root>
                  </div>

                  <div className="mt-1.5 w-full space-y-1.5">
                    <p className="font-medium leading-none">
                      {session?.user?.name || "Anonymous User"}
                    </p>
                    <Form.Field name="post">
                      <Form.Control asChild>
                        <textarea
                          className="w-full resize-none bg-primary leading-tight outline-none placeholder:text-tertiary focus:outline-none"
                          placeholder="Share your thoughts..."
                          minLength={1}
                          rows={3}
                          maxLength={280}
                          required
                          style={{ height: "auto" }}
                          onInput={(event) => {
                            event.currentTarget.style.height = "auto";
                            event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                            setIsValid(event.currentTarget.value.length > 0);
                          }}
                        />
                      </Form.Control>
                    </Form.Field>
                  </div>
                </div>
              </div>

              <Form.Submit asChild className="ml-auto mt-auto">
                <button
                  className="w-fit rounded bg-black px-4 py-1 text-sm text-white transition-opacity disabled:opacity-20 dark:bg-neutral-100 dark:text-black"
                  disabled={!isValid}
                  type="submit"
                >
                  Post
                </button>
              </Form.Submit>
            </Drawer.Content>
          </Form.Root>
        </Drawer.Portal>
      </Drawer.Root>

      {/* grid layout for desktop */}
      <div
        className="cols-1 relative hidden animate-in gap-9 md:grid md:grid-cols-3"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <div className="col-span-3 md:col-span-2 md:space-y-6">
          <Form.Root className="flex flex-col gap-0.5 rounded-lg border border-secondary p-3 shadow-sm">
            <Form.Field name="post">
              <Form.Control asChild>
                <textarea
                  className="w-full resize-none bg-transparent leading-tight outline-none placeholder:text-tertiary"
                  placeholder="Share your thoughts..."
                  minLength={1}
                  rows={3}
                  maxLength={280}
                  required
                  onInput={(event) => {
                    setIsValid(event.currentTarget.value.length > 0);
                  }}
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild className="ml-auto">
              <button
                className="rounded bg-black px-4 py-1 text-sm text-white transition-opacity disabled:opacity-20 dark:bg-neutral-100 dark:text-black"
                disabled={!isValid}
                type="submit"
              >
                Post
              </button>
            </Form.Submit>
          </Form.Root>
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
    <div className="flex flex-col divide-y divide-secondary">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex gap-3 py-4 md:flex-col md:py-6">
          <div className="w-fit md:hidden">
            <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:hidden">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] border border-secondary object-cover"
                src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                alt="Colm Tuite"
              />
              <Avatar.Fallback
                className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-xs font-medium"
                delayMs={600}
              >
                CT
              </Avatar.Fallback>
            </Avatar.Root>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <Avatar.Root className="hidden h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:inline-flex">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] border border-secondary object-cover"
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                />
                <Avatar.Fallback
                  className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-xs font-medium"
                  delayMs={600}
                >
                  CT
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="flex items-center gap-1.5 leading-none">
                <p className="font-medium">Alexandra Monroe</p>
                <p className="text-tertiary">2h</p>
              </div>
            </div>
            <h2 className="line-clamp-4 leading-tight">
              {index % 2 === 0
                ? "Lorem ipsum dolor sit amet, consectetur adipiscing. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
                : "Ut enim ad minim veniam, quis nostrud exercitation ut aliquip ex ea commodo consequat."}
            </h2>
            <div className="mt-1.5 flex items-center gap-6 text-sm text-tertiary">
              <div className="flex items-center gap-1.5">
                <HeartIcon className="h-5 w-5" />
                <span>12 likes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
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
    <div className="flex flex-col gap-6 pt-3 md:pt-0">
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
            <p className="flex items-center gap-1 text-base font-medium">8</p>
          </div>
        </div>
      </div>
      <div className="hidden space-y-6 rounded-xl bg-tertiary p-4 dark:bg-secondaryA md:block md:text-sm">
        <div className="space-y-3">
          <h2 className="font-medium">Tags</h2>
          <p className="text-secondary">
            Explore the various conversation topics.
          </p>
        </div>
        <ul className="animated-list gap-y-1.Z flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="transition-opacity">
              <Link
                href=""
                className="flex items-center whitespace-nowrap text-sm lowercase no-underline"
              >
                <span className="text-tertiary">#</span>general
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-6 rounded-xl bg-tertiary p-4 dark:bg-secondaryA md:text-sm">
        <div className="space-y-3">
          <h2 className="font-medium">Leaderboard</h2>
          <p className="text-secondary">
            Top contributors of the month. Gain points with likes and comments.
          </p>
        </div>
        <ul className="animated-list space-y-3 md:space-y-2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center gap-3 transition-opacity"
            >
              <p className="text-sm text-tertiary">{index + 1}</p>
              <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:h-[24px] md:w-[24px]">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] border border-secondary object-cover"
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                />
                <Avatar.Fallback
                  className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-sm font-medium"
                  delayMs={600}
                >
                  CT
                </Avatar.Fallback>
              </Avatar.Root>
              <p>username</p>
              <p className="ml-3 text-tertiary md:hidden">100 points</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
