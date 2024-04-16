"use client";
import { Post as PostType } from ".contentlayer/generated";

import FlipNumber from "@/components/FlipNumber";

import useSWR from "swr";
import fetcher from "@/utils/fetcher";

export default function ViewCounter({ post }: { post: PostType }) {
  const { data } = useSWR(``, fetcher, {
    revalidateOnFocus: false,
  });
  const views = data?.Views;

  return (
    <span>
      <FlipNumber>{views}</FlipNumber> views
    </span>
  );
}
