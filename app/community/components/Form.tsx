"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";
import { useUser } from "@clerk/nextjs";

import { TopicProps } from "@/app/db/queries";
import { saveCommunityPost } from "@/app/db/actions";
import { getCommunityTopics } from "@/app/db/queries";
import Avatar from "@/app/components/Avatar";

export default function Form() {
  const { isSignedIn, user } = useUser();

  const formRef = useRef<HTMLFormElement>(null);
  const [contentValid, setContentValid] = useState("");

  let params = useParams<{ topic: string }>();

  const [topics, setTopics] = useState<TopicProps[]>([]);
  const [topicId, setTopicId] = useState<number | null>(null);

  useEffect(() => {
    getTopics();
  }, []);

  useEffect(() => {
    let currentTopic = topics.find((topic) => topic.name === params.topic);

    if (currentTopic) {
      setTopicId(currentTopic.id);
    } else {
      setTopicId(1); // 1 being general
    }
  }, [topics, params.topic]);

  async function getTopics() {
    let topics = await getCommunityTopics();
    setTopics(topics);
  }

  return (
    <form
      className="flex items-start justify-between gap-3 border-b border-secondary py-1.5"
      ref={formRef}
      action={async (formData) => {
        await saveCommunityPost(formData);
        formRef.current?.reset();
        setContentValid("");
      }}
    >
      <input type="hidden" name="clerk_user_id" value={user?.id} />
      <input type="hidden" name="topic_id" value={topicId || ""} />

      <div className="mt-0.5 w-fit">
        <Avatar src={user?.imageUrl} initials={user?.fullName} size="sm" />
      </div>

      <textarea
        required
        name="content"
        placeholder={isSignedIn ? "What's on your mind?" : "Sign in to chat."}
        className="my-3 h-auto max-h-52 flex-1 resize-none bg-inherit leading-tight text-primary outline-none placeholder:text-tertiary"
        rows={3}
        maxLength={300}
        onInput={(event) => {
          event.currentTarget.style.height = "auto";
          event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
        }}
        onChange={(e) => setContentValid(e.target.value)}
        disabled={!isSignedIn}
      />

      <button
        className={clsx(
          "mt-1.5 flex h-fit w-fit items-center justify-center rounded-full bg-[var(--blue-10)] px-3 py-1.5 text-sm text-white transition-all disabled:bg-secondary disabled:font-normal disabled:text-tertiary",
          !isSignedIn && "hidden",
        )}
        type="submit"
        disabled={contentValid === ""}
      >
        Share
      </button>
    </form>
  );
}
