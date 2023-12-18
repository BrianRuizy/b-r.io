"use client";
import { Post as PostType } from ".contentlayer/generated";

import FlipNumber from "@/components/FlipNumber";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

import { useLang } from "@/components/LanguageProvider";
import { blogSlugTranslations } from "@/translations/blogSlugTranslations";

export default function ViewCounter({ post }: { post: PostType }) {
  const { lang } = useLang();
  const text = blogSlugTranslations[lang];
  const { data } = useSWR(`/api/hitsSlug?slug=${post.slug.slice(0,-3)}`, fetcher, {
    revalidateOnFocus: false,
  });
  const views = data?.Views;

  return (
    <span>
      <FlipNumber>{views}</FlipNumber> {text.views}
    </span>
  );
}
