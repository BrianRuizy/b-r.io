import * as Avatar from "@radix-ui/react-avatar";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

import { relativeDateTime } from "@/app/_utils/formatDate";
import TopicBadge from "./TopicBadge";

export interface Post {
  id: number;
  content: string;
  author_id: number;
  created_at: string;
  author_name: string; // author's name
  author_email: string; // author's email
  author_image: string; // author's image
  topic_id: number;
  topic_name: string; // topic's name
}

interface PostProps {
  post: Post;
}

export default function PostComponent({ post }: PostProps) {
  const initials = post.author_name
    .split(" ")
    .map((name) => name[0].toUpperCase())
    .join("");
  const displayInitials =
    initials.length > 1 ? initials : post.author_name.slice(0, 2).toUpperCase();
  return (
    <div className="flex gap-3 py-4 md:flex-col md:py-6 md:first:pt-0">
      <div className="w-fit md:hidden">
        <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:hidden">
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
          <Avatar.Root className="hidden h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:inline-flex">
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
          <div className="flex items-center gap-1.5 leading-none">
            <p className="font-semibold">{post.author_name}</p>
            <span className="text-tertiary">·</span>
            <p className="text-secondary">
              {relativeDateTime(post.created_at)}
            </p>
            <TopicBadge
              textOnly
              topic={{ id: post.topic_id, name: post.topic_name }}
            />
          </div>
        </div>
        <h2 className="line-clamp-4 leading-tight">{post.content}</h2>
        <div className="mt-1.5 flex items-center gap-6 text-sm text-tertiary">
          <div className="flex items-center gap-1.5">
            <HeartIcon className="h-5 w-5" />
            <span>000 likes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span>000 replies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
