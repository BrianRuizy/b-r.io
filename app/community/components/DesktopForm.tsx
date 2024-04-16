"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import * as Form from "@radix-ui/react-form";
import { Topic } from "@/app/community/components/TopicBadge";

import { HashtagIcon } from "@heroicons/react/20/solid";

export default function DesktopForm({ topics }: { topics: Topic[] }) {
  const [isValid, setIsValid] = useState(false);
  const { data: session } = useSession();

  return (
    <Form.Root
      className={clsx(
        "flex flex-col gap-0.5 rounded-lg border border-secondary p-3 shadow-sm",
        !session ? "opacity-50" : "",
      )}
    >
      <Form.Field name="post">
        <Form.Control asChild>
          <textarea
            className="w-full resize-none bg-transparent leading-tight outline-none placeholder:text-tertiary"
            placeholder="Share your thoughts..."
            minLength={1}
            rows={3}
            maxLength={280}
            required
            onInput={(event) => {
              setIsValid(event.currentTarget.value.length > 0);
            }}
            disabled={!session}
          />
        </Form.Control>
      </Form.Field>

      {/* select form to choose the post tag */}
      <div className="flex items-center justify-between">
        <Form.Field name="topic">
          <Form.Control asChild>
            <select
              className="w-full bg-transparent leading-tight outline-none placeholder:text-tertiary"
              placeholder="Select a topic"
              required
              disabled={!session}
            >
              {topics?.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  <span className="text-tertiary">#</span>
                  {topic.name}
                </option>
              ))}
            </select>
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild className="ml-auto">
          <button
            className={clsx(
              "rounded bg-black px-4 py-1 text-sm text-white transition-opacity disabled:opacity-25 dark:bg-neutral-100 dark:text-black",
            )}
            disabled={!isValid}
            type="submit"
          >
            Post
          </button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
}
