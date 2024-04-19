"use client";
import * as Avatar from "@radix-ui/react-avatar";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import TopicBadge from "./TopicBadge";
import { CommunityPostProps } from "@/app/db/queries";
import { formatRelativeTime } from "@/app/_utils/formatDate";

interface PostComponentProps {
  post: CommunityPostProps;
}

export default function Post({ post }: PostComponentProps) {
  let initials = post.author_name
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");
  const displayInitials =
    initials.length > 1 ? initials : post.author_name.slice(0, 2).toUpperCase();

  return (
    <div className="flex gap-3 py-4 first:pt-0 last:pb-0 md:py-6">
      <div className="w-fit">
        <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] border border-secondary object-cover"
            src={post.author_image}
            alt={post.author_name}
          />
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-xs font-medium"
            delayMs={600}
          >
            {displayInitials}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 leading-none">
            <p className="font-semibold">{post.author_name}</p>
            <span className="text-tertiary">·</span>
            <p className="text-secondary">
              {formatRelativeTime(post.created_at)}
            </p>
            <TopicBadge
              textOnly
              topic={{ id: post.topic_id, name: post.topic_name }}
            />
          </div>
        </div>
        <h2 className="leading-tight">{post.content}</h2>
        <div className="mt-1.5 flex items-center gap-6 text-sm text-tertiary">
          <div className="flex items-center gap-1.5">
            <HeartIcon className="h-5 w-5" />
            <span>00 likes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span>00 replies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
