"use client";
import { useEffect, useState } from "react";

import { getCommunityTopics, TopicProps } from "@/app/db/queries";
import TopicBadge from "@/app/community/components/TopicBadge";
import { useParams } from "next/navigation";

export default function Topics() {
  const [topics, setTopics] = useState<TopicProps[]>([]);
  let params = useParams<{ topic: string }>();

  console.log(params.topic);
  if (!params.topic) {
    params.topic = "all";
  }

  useEffect(() => {
    getTopics();
  }, []);

  async function getTopics() {
    let topics = await getCommunityTopics();
    setTopics(topics);
  }

  return (
    <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-scroll px-6">
      <TopicBadge
        topic={{ id: 0, name: "all" }}
        active={params.topic === "all"}
      />
      {topics.map((topic) => (
        <TopicBadge
          key={topic.id}
          topic={topic}
          active={topic.name === params.topic}
        />
      ))}
    </div>
  );
}
