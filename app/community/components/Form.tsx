"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";
import * as Avatar from "@radix-ui/react-avatar";
import { useUser } from "@clerk/nextjs";

import { TopicProps } from "@/app/db/queries";
import { saveCommunityPost } from "@/app/db/actions";
import { getCommunityTopics } from "@/app/db/queries";

export default function Form() {
  const { isLoaded, isSignedIn, user } = useUser();

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
      className="-mx-6 flex items-start justify-between gap-3 border-y border-secondary bg-white px-6 py-1.5 dark:bg-primary sm:rounded-md sm:border-x md:shadow-sm"
      ref={formRef}
      action={async (formData) => {
        await saveCommunityPost(formData);
        formRef.current?.reset();
      }}
    >
      <input type="hidden" name="clerk_user_id" value={user?.id} />
      <input type="hidden" name="topic_id" value={topicId || ""} />

      <div className="mt-0.5 w-fit">
        <MyAvatar user={user} />
      </div>

      <textarea
        required
        name="content"
        placeholder={isSignedIn ? "What's on your mind?" : "Sign in to chat."}
        className="my-3 h-auto max-h-52 flex-1 resize-none bg-inherit leading-tight text-primary outline-none placeholder:text-tertiary"
        rows={3}
        maxLength={280}
        onInput={(event) => {
          event.currentTarget.style.height = "auto";
          event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
        }}
        onChange={(e) => setContentValid(e.target.value)}
        disabled={!isSignedIn}
      />

      <button
        className={clsx(
          "mt-1.5 flex h-fit w-fit items-center justify-center rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-primary disabled:font-normal disabled:text-tertiary",
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

function MyAvatar({ user }: { user?: any }) {
  return (
    <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
      <Avatar.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={user?.imageUrl}
        alt="Avatar image"
      />
      <Avatar.Fallback
        className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-sm font-medium text-primary"
        delayMs={600}
      >
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
