"use client";
import { useState, useEffect } from "react";

import PostComponent from "@/app/community/components/PostComponent";
import { Post } from "@/app/community/components/PostComponent";

export default function PostList() {
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
        setData(json.result);
      })
      .catch((err) => console.error(err));
  }, []);

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