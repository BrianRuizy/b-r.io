"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Drawer } from "vaul";
import clsx from "clsx";
import { useUser } from "@clerk/nextjs";

import Avatar from "@/app/components/ui/Avatar";
import { CommunityPostProps, getReplies } from "@/app/db/queries";
import { saveReply } from "@/app/db/actions";
import { getContentWithLinks } from "@/app/_utils/postFormatting";
import { formatRelativeTime } from "@/app/_utils/formatDate";
import FlipNumber from "@/app/components/FlipNumber";

import createDOMPurify from "dompurify";

let DOMPurify: createDOMPurify.DOMPurifyI;
if (typeof window !== "undefined") {
  DOMPurify = createDOMPurify(window);
}

const config = {
  ALLOWED_TAGS: [], // Add any other tags you want to allow
  ALLOWED_ATTR: ["href"], // Add any other attributes you want to allow
};

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

function getDisplayName(post: CommunityPostProps) {
  let displayName = "";
  if (!post.user) return { displayName: "No Name", initials: "NA" };

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

export default function Post({ post }: { post: CommunityPostProps }) {
  const { displayName, initials } = getDisplayName(post);

  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const DOMPurify = require("dompurify")(window);
      setSanitizedContent(DOMPurify.sanitize(post.content, config));
    }
  }, [post.content]);

  let formattedContent = getContentWithLinks(sanitizedContent);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [replies, setReplies] = useState<CommunityPostProps[]>([]);

  async function handleOpenDrawer() {
    const fetchedReplies = await getReplies(post.id);
    setReplies(fetchedReplies);
    setIsDrawerOpen(true);
  }

  return (
    <div className="flex gap-3 py-4 first:pt-0 last:pb-0">
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
            {post.topic_name && (
              <span className="text-tertiary">#{post.topic_name}</span>
            )}
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
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
        <div className="flex min-h-8 items-center gap-6 text-sm text-secondary md:text-base">
          <div
            className="flex items-center gap-1.5 hover:text-primary"
            onClick={handleOpenDrawer}
          >
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
              </svg>
            <span>{post.reply_count || 0}</span>
          </div>
          <RepliesDrawer
            op={post}
            replies={replies}
            setReplies={setReplies}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
          <Reaction />
        </div>
      </div>
    </div>
  );
}

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
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" clipRule="evenodd"/>
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
              <span className="font-medium text-primary">
                <FlipNumber>{reaction.count}</FlipNumber>
              </span>
            </div>
          ),
      )}
    </div>
  );
}

function RepliesDrawer({
  op,
  replies,
  setReplies,
  isDrawerOpen,
  setIsDrawerOpen,
}: {
  op: CommunityPostProps;
  replies: CommunityPostProps[];
  setReplies: (state: CommunityPostProps[]) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (state: boolean) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [contentValid, setContentValid] = useState("");
  const { isSignedIn, user } = useUser();

  return (
    <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 mx-auto flex max-h-[96%] max-w-[700px] flex-col rounded-t-2xl bg-primary p-6 outline-none md:p-8">
          <div className="fixed left-0 right-0 top-1.5 mx-auto flex h-1.5 w-10 items-center justify-center rounded-full bg-secondary" />

          <div className="flex select-none items-center  justify-between ">
            <Drawer.Title className="text-center text-lg font-semibold tracking-tight">
              Replies
            </Drawer.Title>
            <Drawer.Close className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary hover:bg-tertiary hover:text-primary">
              {/* prettier-ignore */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </Drawer.Close>
          </div>

          <div className="no-scrollbar flex flex-col gap-6 overflow-auto rounded-t-[10px] pb-12">
            <div className="flex flex-col py-6">
              <OriginalPost post={op} />
              <hr className="my-4 border-primary" />
              <div>
                {replies &&
                  replies.map((reply) => (
                    <ReplyPost key={reply.id} post={reply} />
                  ))}
              </div>
              {replies && !replies.length && (
                <div className="flex flex-col items-center justify-center py-6">
                  <h2 className="">It&apos;s quiet here</h2>
                  <p className="text-tertiary">Be the first to reply!</p>
                </div>
              )}
            </div>
          </div>

          <div className="fixed bottom-0 right-0 mx-auto flex w-full items-center gap-3 bg-primary px-6 py-1 pb-3 md:p-8">
            <form
              ref={formRef}
              className="flex h-10 w-full rounded-full border border-primary p-1.5"
              action={async (formData) => {
                await saveReply(formData);
                formRef.current?.reset();
                setContentValid("");
                setReplies(await getReplies(op.id));
              }}
            >
              <input type="hidden" name="clerk_user_id" value={user?.id} />
              <input type="hidden" name="post_id" value={op.id} />
              <input
                type="text"
                name="content"
                autoComplete="off"
                minLength={1}
                placeholder="Add a reply"
                className="w-full flex-1 overflow-clip bg-transparent  px-3 text-primary outline-none placeholder:text-tertiary"
                disabled={!isSignedIn}
                onChange={(e) => setContentValid(e.target.value)}
              />
              <button
                className="flex aspect-square h-full items-center justify-center rounded-full bg-[var(--blue-10)] text-white transition-all disabled:bg-tertiary disabled:text-tertiary"
                type="submit"
                disabled={!isSignedIn || !contentValid}
              >
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function OriginalPost({ post }: { post: CommunityPostProps }) {
  const { displayName, initials } = getDisplayName(post);

  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const DOMPurify = require("dompurify")(window);
      setSanitizedContent(DOMPurify.sanitize(post.content, config));
    }
  }, [post.content]);

  let formattedContent = getContentWithLinks(sanitizedContent);

  return (
    <div className="flex gap-3 py-2">
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
            {post.topic_name && (
              <span className="text-tertiary">#{post.topic_name}</span>
            )}
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
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
        <div className="flex min-h-8 items-center gap-6 text-sm text-secondary md:text-base">
          <div className="flex items-center gap-1.5">
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
            <span>{post.reply_count || 0}</span>
          </div>
          <Reaction />
        </div>
      </div>
    </div>
  );
}

function ReplyPost({ post }: { post: CommunityPostProps }) {
  const { displayName, initials } = getDisplayName(post);

  return (
    <div className="flex gap-3 py-2">
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
        </div>
        <div
          className="whitespace-pre-wrap text-pretty break-words leading-tight md:text-balance"
          style={{ wordBreak: "break-word" }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(getContentWithLinks(post.content)),
          }}
        />
        <div className="flex min-h-8 items-center gap-6 text-sm text-secondary md:text-base">
          <Reaction />
        </div>
      </div>
    </div>
  );
}
