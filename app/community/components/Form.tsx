"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";

import * as Avatar from "@radix-ui/react-avatar";
import { TopicProps } from "@/app/db/queries";
import { saveCommunityPost } from "@/app/db/actions";
import { getCommunityTopics } from "@/app/db/queries";
import { useParams } from "next/navigation";

export default function Form() {
  const { data: session } = useSession();
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
      className="-mx-6 flex items-start justify-between gap-3 border-y border-secondary bg-primary px-6 py-1.5 sm:rounded-md sm:border-x"
      ref={formRef}
      action={async (formData) => {
        await saveCommunityPost(formData);
        formRef.current?.reset();
      }}
    >
      <input type="hidden" name="author_id" value={session?.user?.id || ""} />
      <input type="hidden" name="topic_id" value={topicId || ""} />

      <div className="mt-0.5 w-fit">
        <MyAvatar />
      </div>

      <textarea
        required
        name="content"
        placeholder={session ? "What's on your mind?" : "Sign in to chat."}
        className="my-3 h-auto max-h-52 flex-1 resize-none bg-inherit leading-tight text-primary outline-none placeholder:text-tertiary"
        rows={3}
        maxLength={280}
        onInput={(event) => {
          event.currentTarget.style.height = "auto";
          event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
        }}
        onChange={(e) => setContentValid(e.target.value)}
        disabled={!session}
      />

      <button
        className="mt-1.5 flex h-fit w-fit items-center justify-center rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-primary disabled:font-normal disabled:text-tertiary"
        type="submit"
        disabled={contentValid === ""}
      >
        Share
      </button>
    </form>
  );
}

function MyAvatar() {
  const { data: session } = useSession();

  return (
    <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={session?.user?.image ?? ""}
        alt="Avatar image"
      />
      <Avatar.Fallback
        className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-sm font-medium text-primary"
        delayMs={600}
      >
        {session?.user?.name?.slice(0, 2) ?? ""}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
