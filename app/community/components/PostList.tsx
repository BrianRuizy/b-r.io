"use client";
import { useState, useEffect } from "react";

import PostComponent from "@/app/community/components/PostComponent";
import { Post } from "@/app/community/components/PostComponent";
import { Topic } from "@/app/community/components/TopicBadge";

interface PostListProps {
  topics: Topic[];
}

export default function PostList({ topics }: PostListProps) {
  const [postData, setData] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch(`/api/community/get-posts`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((json) => {
        const postsWithTopics = json.result.map((post: Post) => {
          const topic = topics.find((topic) => topic.id === post.topic_id);
          return { ...post, topic };
        });
        setData(postsWithTopics);
      })
      .catch((err) => console.error(err));
  }, [topics]);

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col divide-y divide-secondary">
      {postData.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
}
