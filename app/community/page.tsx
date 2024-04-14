"use client";

import React from 'react';
import * as Tabs from "@radix-ui/react-tabs";

import MobileForm from "@/app/community/components/MobileForm";
import DesktopForm from "@/app/community/components/DesktopForm";
import Profile from "@/app/community/components/Profile";
import PostList from "@/app/community/components/PostList";
import Info from "@/app/community/components/Info";

export default function Community() {
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
          <PostList />
        </Tabs.Content>
        <Tabs.Content value="info">
          <Info />
        </Tabs.Content>
      </Tabs.Root>

      <MobileForm />

      {/* grid layout for desktop */}
      <div
        className="cols-1 relative hidden animate-in gap-9 md:grid md:grid-cols-3"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <div className="col-span-3 md:col-span-2 md:space-y-6">
          <DesktopForm />
          <PostList />
        </div>
        <div className="col-span-3 md:col-span-1">
          <Info />
        </div>
      </div>
    </div>
  );
}
