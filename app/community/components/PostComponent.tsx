import * as Avatar from "@radix-ui/react-avatar";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

import { relativeDateTime } from "@/app/_utils/formatDate";
import TopicBadge from "./TopicBadge";
import { Topic } from "./TopicBadge";


export interface Post {
  id: number;
  content: string;
  author_id: number;
  created_at: string;
  name: string; // author's name
  email: string; // author's email
  image: string; // author's image
  topic_id: number;
  topic: Topic
}

interface PostProps {
  post: Post;
}

export default function PostComponent({ post }: PostProps) {
  return (
    <div className="flex gap-3 py-4 md:flex-col md:py-6 md:first:pt-0">
      <div className="w-fit md:hidden">
        <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:hidden">
          <Avatar.Image
            className="h-full w-full rounded-[inherit] border border-secondary object-cover"
            src={post.image}
            alt={post.name}
          />
          <Avatar.Fallback
            className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-xs font-medium"
            delayMs={600}
          >
            {post?.name?.[0]}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <Avatar.Root className="hidden h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:inline-flex">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] border border-secondary object-cover"
              src={post.image}
              alt={post.name}
            />
            <Avatar.Fallback
              className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-xs font-medium"
              delayMs={600}
            >
              {post.name[0]}
            </Avatar.Fallback>
          </Avatar.Root>
          <div className="flex items-center gap-1.5 leading-none">
            <p className="font-semibold">{post.name}</p>
            <span className="text-tertiary">·</span>
            <p className="text-secondary">{relativeDateTime(post.created_at)}</p>
            <TopicBadge topic={post.topic} textOnly />
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
