import { Suspense } from "react";
import { getCommunityPostsForTopic } from "@/app/db/queries";
import Post from "@/app/community/components/Post";

export default function TopicPage({ params }: { params: { topic: string } }) {
  return (
    <Suspense>
      <Posts topic={params.topic} />
    </Suspense>
  );
}

async function Posts({ topic }: { topic: string }) {
  let posts = await getCommunityPostsForTopic(topic);

  if (posts.length === 0) {
    return <div className="text-tertiary">Nothing to see here.</div>;
  }

  return (
    <div className="flex flex-col divide-y divide-secondary">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
