"use client"; 
import { useState, useEffect } from "react";
import { Post as PostType } from ".contentlayer/generated";
import FlipNumber from "@/app/components/FlipNumber";

export default function ViewCounter({ post }: { post: PostType }) {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    async function fetchViews() {
      const res = await fetch(`/api/hitsSlug?slug=${post.slug}`);
      const data = await res.json();
      setViews(data.Views);
    }

    // Add an empty dependency array to ensure the effect runs only once
    if (views === 0) {
      fetchViews();
    }
  }, [post.slug]);

  return (
    <span>
      <FlipNumber>{views}</FlipNumber> views
    </span>
  );
}
