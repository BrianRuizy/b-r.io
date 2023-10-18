import { formatDate } from "@/lib/formatdate";
import type { Post } from ".contentlayer/generated";
import Section from "@/components/Section";
import Link from "@/components/ui/Link";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

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
    <li className="py-3 group transition-opacity">
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
            className="absolute z-10 hidden overflow-hidden rounded shadow-sm pointer-events-none sm:group-hover:block bg-primary"
          >
            <Image
              src={image}
              alt={title}
              width={imageWidth}
              height={imageHeight}
            />
          </motion.div>
        )}
        <div className="flex justify-between gap-6 items-center">
          <Section heading={formatDate(publishedAt)}>
            <Link href={`/blog/${slug}`} className="font-medium leading-tight">{title}</Link>
          </Section>
          <div className="md:hidden aspect-square min-w-24 w-24 h-24 relative drop-shadow-sm">
            <Image src={image} alt={title} fill className="object-cover rounded"/>
          </div>
        </div>
      </div>
    </li>
  );
}
