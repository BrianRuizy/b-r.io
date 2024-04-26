"use client";
import { useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import TopicBadge from "./TopicBadge";
import { CommunityPostProps } from "@/app/db/queries";
import { formatRelativeTime } from "@/app/_utils/formatDate";
import Link from "@/app/components/ui/Link";

import LinkifyIt from "linkify-it";
import tlds from "tlds";

import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

import { Drawer } from "vaul";
import React from "react";

interface PostComponentProps {
  post: CommunityPostProps;
}

const linkify = LinkifyIt();
linkify.tlds(tlds);

export default function PostComponent({ post }: PostComponentProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer.Root
      shouldScaleBackground={false}
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <Drawer.Trigger
        disabled
        asChild
        className="cursor-pointer py-4 first:pt-0 last:pb-0 md:py-6"
      >
        <div>
          <Post post={post} />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 md:bg-black/20" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mx-auto flex max-h-[96%] max-w-[700px] flex-col rounded-t-[10px] bg-primary outline-none ">
          <div className="fixed left-0 right-0 top-1.5 mx-auto flex h-1.5 w-10 items-center justify-center rounded-full bg-secondary" />
          <div className="flex select-none items-center  justify-between border-b border-secondary px-6 pb-3 pt-6">
            {/* <Drawer.Close className="w-16 text-left">Close</Drawer.Close> */}
            <Drawer.Title className="flex-1 text-center text-lg font-semibold tracking-tight">
              Replies
            </Drawer.Title>
            {/* <button className={clsx("w-16 text-right text-link")}>Share</button> */}
          </div>
          <div className="flex flex-col gap-6 overflow-auto rounded-t-[10px] pb-12">
            <div className="flex flex-col divide-y divide-secondary ">
              <div className="p-6">
                <Post post={post} />
              </div>

              <div className="mb-3 flex flex-col justify-center px-6 py-12 text-center leading-tight md:mb-6">
                {/* <h2>No Comments</h2>*/}
                <p className="text-tertiary">Pretty quiet here</p>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 right-0 mx-auto flex w-full items-center gap-3 px-6 py-3 md:py-6">
            <input
              type="text"
              placeholder="Add a reply"
              className="h-10 w-full flex-1 overflow-clip rounded-full border border-primary bg-transparent px-3 text-primary outline-none placeholder:text-tertiary"
            />
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd"/>
            </svg>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function Post({ post }: PostComponentProps) {
  let displayName = "";
  try {
    displayName =
      post.user.firstName && post.user.lastName
        ? `${post.user.firstName} ${post.user.lastName}`
        : post.user.username || "Anonymous";
  } catch (error) {
    console.error(error);
  }

  const words = displayName.split(" ");
  const initials =
    words.length > 1
      ? words.map((word) => word[0]).join("")
      : displayName.slice(0, 2);

  const contentWithLinks = post.content.split(" ").map((word, index) => {
    const match = linkify.match(word);

    if (match) {
      const url = match[0].url;
      return (
        <React.Fragment key={index}>
          <Link href={url} className="text-link">{url}</Link>{" "}
        </React.Fragment>
      );
    }

    return word + " ";
  });

  return (
    <div className="flex gap-3 ">
      <div className="w-fit">
        <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] border border-secondary object-cover"
            src={post?.user?.imageUrl}
            alt={displayName}
          />
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-xs font-medium"
            delayMs={600}
          >
            {initials}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center gap-0.5">
            <p className="line-clamp-1 font-medium">{displayName}</p>
            {post?.user?.username === "brianruizy" /* prettier-ignore */ && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 text-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <span className="text-tertiary">·</span>
          <p className="text-nowrap text-tertiary">
            {formatRelativeTime(post.created_at)}
          </p>
          <TopicBadge
            textOnly
            topic={{ id: post.topic_id, name: post.topic_name }}
          />
        </div>
        <div className="whitespace-pre-wrap leading-tight">
          {contentWithLinks}
        </div>
        <div className="flex items-center gap-6 text-sm text-secondary ">
          <Reaction />
          <div className="flex items-center gap-1.5 hover:text-primary">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span>00 Replies</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Reaction() {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div onClick={handleClick} className="flex items-center">
      <Popover.Root modal>
        <Popover.Trigger className="group flex items-center gap-3 outline-none">
          <div className="relative ">
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  group-hover:text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 absolute bottom-0 -right-1.5 text-tertiary" >
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" clip-rule="evenodd"/>
            </svg>
          </div>
          <p className="group-hover:text-primary">React</p>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content
            asChild
            className="mr-16 rounded-full bg-white p-1 shadow-lg dark:bg-tertiary"
            side="top"
            sideOffset={16}
          >
            <ToggleGroup.Root
              type="single"
              className="flex items-center gap-0.5 text-lg"
            >
              <ToggleGroup.Item
                className="aspect-square w-10 rounded-full outline-none hover:bg-secondary data-[state=on]:bg-[var(--gray-4)]"
                value="❤️"
              >
                ❤️
              </ToggleGroup.Item>

              <ToggleGroup.Item
                className="aspect-square w-10 rounded-full outline-none hover:bg-secondary data-[state=on]:bg-[var(--gray-4)]"
                value="👍"
              >
                👍
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className="aspect-square w-10 rounded-full outline-none hover:bg-secondary data-[state=on]:bg-[var(--gray-4)]"
                value="😅"
              >
                😅
              </ToggleGroup.Item>

              <ToggleGroup.Item
                className="aspect-square w-10 rounded-full outline-none hover:bg-secondary data-[state=on]:bg-[var(--gray-4)]"
                value="🤯"
              >
                🤯
              </ToggleGroup.Item>
              <ToggleGroup.Item
                className="aspect-square w-10 rounded-full outline-none hover:bg-secondary data-[state=on]:bg-[var(--gray-4)]"
                value="🎉"
              >
                🎉
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
