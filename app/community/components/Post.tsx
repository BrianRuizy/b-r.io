"use client";
import * as Avatar from "@radix-ui/react-avatar";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import TopicBadge from "./TopicBadge";
import { CommunityPostProps } from "@/app/db/queries";
import { formatRelativeTime } from "@/app/_utils/formatDate";

import { Drawer } from "vaul";
import clsx from "clsx";
import { useState } from "react";

interface PostComponentProps {
  post: CommunityPostProps;
}

export default function PostComponent({ post }: PostComponentProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
  return (
    <Drawer.Root
      shouldScaleBackground={false}
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <Drawer.Trigger
        asChild
        className="cursor-pointer py-4 first:pt-0 last:pb-0 md:py-6"
      >
        <div
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          <Post post={post} />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 md:bg-black/10" />

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

              <div className="flex flex-col justify-center px-6 py-12 text-center leading-tight mb-3 md:mb-6">
                {/* <h2>No Comments</h2>*/}
                <p className="text-tertiary">Pretty quiet here</p> 
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 right-0 mx-auto flex w-full items-center gap-3 px-6 py-3 md:py-6">
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
            <div className="flex-1 flex pl-3 px-1.5 h-10 items-center gap-3 rounded-full bg-secondary">
              <input
                type="text"
                placeholder="Add a reply"
                className="w-full flex-1 overflow-clip border-0 bg-transparent outline-none placeholder:text-tertiary text-primary"
              />
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
              </svg>


            </div>
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
            {post?.user?.username === "brianruizy" && (
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
          <p className="text-nowrap text-secondary">
            {formatRelativeTime(post.created_at)}
          </p>
          <TopicBadge
            textOnly
            topic={{ id: post.topic_id, name: post.topic_name }}
          />
        </div>
        <p className="whitespace-pre-wrap leading-tight">{post.content}</p>
        <div className="mt-1.5 flex items-center gap-6 text-sm text-tertiary ">
          <div className="flex items-center gap-1.5 hover:text-primary">
            <HeartIcon className="h-5 w-5" />
            <span>00 likes</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-primary">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span>00 replies</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostReply({ post }: PostComponentProps) {
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

  return (
    <div className="flex gap-3 py-4 first:pt-0 last:pb-0">
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
            {post.user?.username === "brianruizy" && (
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
          <p className="text-nowrap text-secondary">
            {formatRelativeTime(post.created_at)}
          </p>
        </div>
        <p className="whitespace-pre-wrap leading-tight">{post.content}</p>
      </div>
    </div>
  );
}
