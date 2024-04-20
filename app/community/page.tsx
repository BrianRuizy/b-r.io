import { Suspense } from "react";
import { getCommunityPosts } from "@/app/db/queries";
import Post from "@/app/community/components/Post";

export default function CommunityPage() {
  return (
    <Suspense>
      <Posts />
    </Suspense>
  );
}

async function Posts() {
  let posts = await getCommunityPosts();

  if (posts.length === 0) {
    return <div className="text-tertiary">
      It&apos;s lonely here. Be the first to post!
    </div>;
  }

  return (
    <div className="flex flex-col divide-y divide-secondary">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
