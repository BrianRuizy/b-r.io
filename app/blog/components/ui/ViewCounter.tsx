"use client";
import { Post as PostType } from ".contentlayer/generated";

import FlipNumber from "@/app/components/FlipNumber";

import useSWR from "swr";
import fetcher from "@/app/_utils/fetcher";

export default function ViewCounter({ post }: { post: PostType }) {
  const { data } = useSWR(`/api/prisma/hitsSlug?slug=${post.slug}`, fetcher, {
    revalidateOnFocus: false,
  });
  const views = data?.Views;

  return (
    <span>
      <FlipNumber>{views}</FlipNumber> views
    </span>
  );
}
