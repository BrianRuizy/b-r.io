"use client";
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { usePathname } from "next/navigation";

import LinkifyIt from "linkify-it";
import tlds from "tlds";
import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Drawer } from "vaul";
import clsx from "clsx";

import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import TopicBadge from "./TopicBadge";
import Avatar from "@/app/components/ui/Avatar";
import Link from "@/app/components/ui/Link";
import { CommunityPostProps } from "@/app/db/queries";
import { formatRelativeTime } from "@/app/_utils/formatDate";

interface PostComponentProps {
  post: CommunityPostProps;
}

function getDisplayName(post: CommunityPostProps) {
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

  return { displayName, initials };
}

function getContentWithLinks(post: CommunityPostProps) {
  const linkify = LinkifyIt();
  linkify.tlds(tlds);

  const contentWithLinks = post.content
    .split(" ")
    .map((word, index) => {
      const match = linkify.match(word);

      if (match) {
        const url = match[0].url;
        const displayUrl = url.replace(/(^\w+:|^)\/\//, ""); // remove http:// or https:// from the url
        const link = ReactDOMServer.renderToStaticMarkup(
          <Link key={index} href={url} className="break-words text-link">
            {displayUrl}
          </Link>,
        );
        return link + " ";
      }

      return word + " ";
    })
    .join("");

  return contentWithLinks;
}

export default function Post({ post }: PostComponentProps) {
  const { displayName, initials } = getDisplayName(post);
  const contentWithLinks = getContentWithLinks(post);

  return (
    <div className="flex gap-3 py-4 first:pt-0 last:pb-0 md:py-6">
      <div className="w-fit">
        <Avatar initials={initials} size="sm" src={post?.user?.imageUrl} />
      </div>

      <div className="flex w-full flex-col flex-wrap gap-1.5">
        <div className="flex items-center gap-1.5">
          <p className="line-clamp-1 inline-flex items-center gap-0.5 break-all font-medium">
            {displayName}
            {post?.user?.username === "brianruizy" ? (
              /* prettier-ignore */
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd"/>
              </svg>
            ) : null}
          </p>
          <p className="whitespace-nowrap text-tertiary">
            {formatRelativeTime(post.created_at)}
          </p>
          <span
            className={clsx(
              usePathname() === "/community" ? "visible" : "hidden",
            )}
          >
            <TopicBadge
              textOnly
              topic={{ id: post.topic_id, name: post.topic_name }}
            />
          </span>
          <span className="ml-auto text-secondary md:ml-0">
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
            </svg>
          </span>
        </div>
        <div
          className="whitespace-pre-wrap text-pretty break-words leading-tight md:text-balance"
          style={{ wordBreak: "break-word" }}
          dangerouslySetInnerHTML={{ __html: contentWithLinks }}
        />
        <div className="mt-1.5 flex items-center gap-6 text-sm text-secondary md:text-base">
          <div className="flex items-center gap-1.5 hover:text-primary">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span>000</span>
          </div>
          <Reaction />
        </div>
      </div>
    </div>
  );
}

interface Reaction {
  id: string;
  emoji: string;
  count: number;
}

const reactionsData: Reaction[] = [
  { id: "love", emoji: "❤️", count: 0 },
  { id: "clap", emoji: "👏", count: 0 },
  { id: "laugh", emoji: "😂", count: 0 },
  { id: "surprise", emoji: "😮", count: 0 },
  { id: "sad", emoji: "😢", count: 0 },
  { id: "angry", emoji: "😡", count: 0 },
];

function Reaction() {
  const [selectedReactions, setSelectedReactions] = useState<string[]>([]);
  const [reactions, setReactions] = useState(reactionsData);

  const handleReactionChange = (reactionId: string) => {
    // Update the selected reactions state
    setSelectedReactions((prevReactions) => {
      if (prevReactions.includes(reactionId)) {
        return prevReactions.filter((r) => r !== reactionId);
      } else {
        return [...prevReactions, reactionId];
      }
    });

    // Update the reaction counts
    setReactions((prevReactions) =>
      prevReactions.map((reaction) =>
        reaction.id === reactionId
          ? { ...reaction, count: reaction.count + 1 } // Increment count by 1 for the selected reaction
          : reaction,
      ),
    );
  };

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <div className="group relative flex items-center gap-3 outline-none">
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 group-hover:text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
          </svg>
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3 absolute bottom-0 -right-1.5 text-tertiary" >
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" clip-rule="evenodd"/>
          </svg>
          </div>
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content
            className="rounded-lg border border-secondary bg-white p-1 shadow-lg dark:bg-primary"
            side="top"
            sideOffset={16}
            align="center"
          >
            <ToggleGroup.Root
              className="flex items-center gap-0.5 text-lg"
              type="multiple"
              value={selectedReactions}
            >
              {reactions.map((reaction) => (
                <ToggleGroup.Item
                  key={reaction.id}
                  value={reaction.id}
                  onClick={() => handleReactionChange(reaction.id)}
                  className="aspect-square w-8 rounded-md outline-none hover:bg-secondary"
                >
                  {reaction.emoji}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <ActiveReactions reactions={reactions} />
    </>
  );
}

function ActiveReactions({ reactions }: { reactions: Reaction[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {reactions.map(
        (reaction) =>
          reaction.count > 0 && (
            <div
              key={reaction.id}
              className="space-x-1 rounded-md bg-secondary px-1.5 py-0.5 ring-1 ring-inset ring-transparent hover:ring-[var(--gray-8)]"
            >
              <span>{reaction.emoji}</span>
              <span className="font-medium text-primary">{reaction.count}</span>
            </div>
          ),
      )}
    </div>
  );
}

function PostDrawer({ post }: PostComponentProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer.Root
      shouldScaleBackground={false}
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <Drawer.Trigger disabled asChild className="cursor-pointer ">
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
