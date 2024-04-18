import { Suspense } from "react";
import { getCommunityTopics, getCommunityPosts } from "@/app/db/queries";
import User from "@/app/community/components/User";
import Form from "@/app/community/components/Form";
import PostComponent from "@/app/community/components/PostComponent";
import TopicBadge from "@/app/community/components/TopicBadge";

export default function Community() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-secondary">Let&apos;s talk about it.</p>
        </div>
        <User />
      </div>

      <Suspense>
        <Topics />
        <div className="space-y-2">
          <Form />
          <Posts />
        </div>
      </Suspense>
    </div>
  );
}

async function Topics() {
  let topics = await getCommunityTopics();

  return (
    <ul className="animated-list no-scrollbar -mx-6 flex gap-3 overflow-x-scroll px-6">
      <li className="transition-opacity">
        <TopicBadge topic={{ id: 0, name: "All" }} active />
      </li>
      {topics.map((topic) => (
        <li key={topic.id} className="transition-opacity">
          <TopicBadge topic={topic} />
        </li>
      ))}
    </ul>
  );
}

async function Posts() {
  let posts = await getCommunityPosts();

  return (
    <div className="flex flex-col divide-y divide-secondary">
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}
