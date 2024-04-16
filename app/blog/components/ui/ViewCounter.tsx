"use client";
import { useEffect, useState } from "react";

import { Post as PostType } from ".contentlayer/generated";
import FlipNumber from "@/components/FlipNumber";

export default function ViewCounter({
  post,
  initialViews,
}: {
  post: PostType;
  initialViews: number;
}) {
  // use our route handler to increment the view count
  // api/blog/read-views
  const [views, setViews] = useState<number>(initialViews -1);

  useEffect(() => {
    fetch(`/api/blog/read-views?slug=${post.slug}`)
      .then((response) => response.json())
      .then((data) => setViews(data.views));
  }, [post.slug]);

  return (
    <span>
      <FlipNumber>{views}</FlipNumber> views
    </span>
  );
}
