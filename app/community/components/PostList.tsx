"use client";
import { useState, useEffect } from "react";

import PostComponent from "@/app/community/components/PostComponent";
import { Post } from "@/app/community/components/PostComponent";

export default function PostList() {
  const [data, setData] =  useState<Post[] | null>(null);

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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col divide-y divide-secondary">
      {data.map((x) => (
        <PostComponent key={x.id} post={x} />
      ))}
    </div>
  );
}
