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
    <div className="flex gap-3 py-4 first:pt-0 last:pb-0 md:py-6">
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
          <div className="inline-flex gap-0.5 items-center">
            <p className="line-clamp-1 font-medium">{displayName}</p>
            {post.user?.username === "brianruizy" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-primary">
                <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd"/>
              </svg>
            )}
          </div>
          <span className="text-tertiary">·</span>
          <p className="text-secondary text-nowrap">
            {formatRelativeTime(post.created_at)}
          </p>
          <TopicBadge
            textOnly
            topic={{ id: post.topic_id, name: post.topic_name }}
          />
        </div>
        <h2 className="leading-tight whitespace-pre-wrap">{post.content}</h2>
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
