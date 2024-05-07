import { Suspense } from "react";
import { getCommunityPosts } from "@/app/db/queries";
import Post from "@/app/community/components/Post";

export default function TopicPage({ params }: { params: { topic: string } }) {
  return (
    <Suspense>
      <Posts topic={params.topic} />
    </Suspense>
  );
}

async function Posts({ topic }: { topic: string }) {
  let posts = await getCommunityPosts(topic);

  if (posts.length === 0) {
    return (
      <div className="text-tertiary">Lonely here. Be the first to post!</div>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-secondary">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
