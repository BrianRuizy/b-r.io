"use client";

import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";

import MobileForm from "@/app/community/components/MobileForm";
import DesktopForm from "@/app/community/components/DesktopForm";
import User from "@/app/community/components/User";
import PostList from "@/app/community/components/PostList";
import Info from "@/app/community/components/Info";
import TopicBadge from "@/app/community/components/TopicBadge";

export default function Community() {
  const [topics, setTopics] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    fetch(`/api/community/get-topics`)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const json = await res.json();
        setTopics(json.result);
      })
      .catch((err) => console.error(err));
  }, []);

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
        <User />
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
          <div className="-mx-6 flex gap-2 overflow-x-scroll px-6 py-3">
            <div className="text-sm1 flex cursor-pointer items-center whitespace-nowrap rounded bg-secondary px-2 py-0.5 lowercase no-underline invert">
              <span className="text-tertiary">#</span>
              <span>All</span>
            </div>
            {topics.map((topic) => (
              <TopicBadge key={topic.id} topic={topic} />
            ))}
          </div>
          <PostList />
        </Tabs.Content>
        <Tabs.Content value="info">
          <Info topics={topics} />
        </Tabs.Content>
      </Tabs.Root>

      <MobileForm topics={topics} />

      {/* grid layout for desktop */}
      <div
        className="cols-1 relative hidden animate-in gap-9 md:grid md:grid-cols-3"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <div className="col-span-3 md:col-span-2 md:space-y-6">
          <DesktopForm topics={topics} />
          <PostList />
        </div>
        <div className="col-span-3 md:col-span-1">
          <Info topics={topics} />
        </div>
      </div>
    </div>
  );
}
