import * as Avatar from "@radix-ui/react-avatar";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { relativeDatetime } from "@/app/_utils/formatDate";

interface Post {
  id: number;
  content: string;
  author_id: number;
  created_at: string;
  name: string; // author's name
  email: string; // author's email
  image: string; // author's image
}
interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  console.log(post);
  return (
    <div className="flex gap-3 py-4 md:flex-col md:py-6">
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
            <p className="font-medium">{post.name}</p>
            <p className="text-tertiary">
              {relativeDatetime(post.created_at)}
            </p>
          </div>
        </div>
        <h2 className="line-clamp-4 leading-tight">{post.content}</h2>
        <div className="mt-1.5 flex items-center gap-6 text-sm text-tertiary">
          <div className="flex items-center gap-1.5">
            <HeartIcon className="h-5 w-5" />
            <span>12 likes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChatBubbleOvalLeftIcon className="h-5 w-5" />
            <span>7 replies</span>
          </div>
        </div>
      </div>
    </div>
  );
}