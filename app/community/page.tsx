import { Suspense } from "react";
import { getCommunityPosts } from "@/app/db/queries";
import Post from "@/app/community/components/Post";
import { clerkClient } from "@clerk/clerk-sdk-node";

export default async function CommunityPage() {
  const userList = await clerkClient.users.getUserList();

  return (
    <Suspense>
      <Posts />
      {userList.map((user) => (
        <div key={user.id}>{user?.primaryEmailAddress?.emailAddress}</div>
      ))}
    </Suspense>
  );
}

async function Posts() {
  let posts = await getCommunityPosts();

  if (posts.length === 0) {
    return (
      <div className="text-tertiary">
        It&apos;s lonely here. Be the first to post!
      </div>
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
