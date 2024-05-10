"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "@/app/components/ui/Link";
import clsx from "clsx";

import { getCommunityTopics, TopicProps } from "@/app/db/queries";

export default function Topics() {
  const [topics, setTopics] = useState<TopicProps[]>([]);
  let params = useParams<{ topic: string }>();

  if (!params.topic) {
    params.topic = "All Topics";
  }

  useEffect(() => {
    getTopics();
  }, []);

  async function getTopics() {
    let topics = await getCommunityTopics();
    setTopics(topics);
  }

  return (
    <div className="no-scrollbar -mx-6 -my-0.5 flex gap-3 overflow-x-auto px-6 py-0.5">
      <Link
        scroll={false}
        href={"/community"}
        className={clsx(
          "flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-tertiary px-4 py-1.5 text-sm focus:outline-1",
          params.topic === "All Topics"
            ? "bg-primary text-primary invert"
            : "text-secondary",
        )}
      >
        <span>All Topics</span>
      </Link>
      {topics?.map((topic) => (
        <Link
          key={topic.id}
          scroll={false}
          href={
            topic.name === "All Topics"
              ? "/community"
              : `/community/${topic.name}`
          }
          className={clsx(
            "flex cursor-pointer items-center whitespace-nowrap rounded-lg bg-tertiary px-4 py-1.5 text-sm focus:outline-1",
            topic.name === params.topic
              ? "bg-primary text-primary invert"
              : "text-secondary",
          )}
        >
          <span className="text-tertiary">#</span>
          <span>{topic?.name}</span>
        </Link>
      ))}
    </div>
  );
}
