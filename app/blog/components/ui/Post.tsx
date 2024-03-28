import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "@/app/components/ui/Link";
import Section from "@/app/components/Section";
import { formatDate } from "@/utils/formatDate";
import type { Post } from ".contentlayer/generated";

type PostProps = {
  post: Post;
  mousePosition?: {
    x: number;
    y: number;
  };
};

export default function Post({ post, mousePosition }: PostProps) {
  const { publishedAt, slug, title, image } = post;
  const publishDate = new Date(publishedAt);
  const showNewBadge =
    Math.abs(new Date(publishDate).getTime() - new Date().getTime()) /
      (24 * 60 * 60 * 1000) <
    30;
  const imageHeight = 150;
  const imageWidth = 300;
  const imageOffset = 24;

  return (
    <li className="group py-3 transition-opacity">
      <div className="transition-opacity">
        {image && mousePosition && (
          <motion.div
            animate={{
              top: mousePosition.y - imageHeight - imageOffset,
              left: mousePosition.x - imageWidth / 2,
            }}
            initial={false}
            transition={{ ease: "easeOut" }}
            style={{ width: imageWidth, height: imageHeight }}
            className="pointer-events-none absolute z-10 hidden overflow-hidden rounded bg-primary shadow-sm sm:group-hover:block"
          >
            <Image
              src={image}
              alt={title}
              width={imageWidth}
              height={imageHeight}
            />
          </motion.div>
        )}
        <div className="flex items-center justify-between gap-6">
          <Section heading={formatDate(publishedAt)}>
            <Link href={`/blog/${slug}`} className="font-medium leading-tight">
              {title}
            </Link>
          </Section>
          {image && (
            <div className="min-w-24 relative aspect-square h-24 w-24 drop-shadow-sm md:hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="rounded object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
