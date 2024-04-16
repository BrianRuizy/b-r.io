"use client";
import { sql } from "@vercel/postgres";

import { useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import * as Form from "@radix-ui/react-form";
import { Topic } from "@/app/community/components/TopicBadge";

export default function DesktopForm({ topics }: { topics: Topic[] }) {
  const [inputIsValid, setInputIsValid] = useState(false);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  return (
    <Form.Root
      className={clsx(
        "flex flex-col gap-0.5 rounded-lg border border-secondary p-3 shadow-sm",
        !session ? "opacity-50" : "",
        loading ? "animate-pulse bg-secondaryA" : "",
      )}
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const content = form.content.value;
        const topic = form.topic.value;
        const authorId = session?.user.id;

        // Start loading state
        setLoading(true);

        try {
          const response = await fetch("/api/community/create-post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content,
              topic_id: topic,
              author_id: authorId,
            }),
          });

          if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            Error(errorData.message);
          } else {
            // Handle successful response
            form.reset();
            // Redirect user or update state as needed
          }
        } finally {
          // End loading state
          setLoading(false);
        }
      }}
    >
      <Form.Field name="content">
        <Form.Control asChild>
          <textarea
            className="w-full resize-none bg-transparent leading-tight outline-none placeholder:text-tertiary"
            placeholder="Share your thoughts..."
            minLength={1}
            rows={3}
            maxLength={280}
            required
            onInput={(event) => {
              setInputIsValid(event.currentTarget.value.length > 0);
            }}
            disabled={!session}
          />
        </Form.Control>
      </Form.Field>

      <div className="flex items-center justify-between">
        <Form.Field name="topic">
          <Form.Control asChild>
            <select
              className="w-full bg-transparent leading-tight placeholder:text-tertiary"
              placeholder="Select a topic"
              required
              disabled={!session}
            >
              {topics?.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  #{topic.name}
                </option>
              ))}
            </select>
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild className="ml-auto">
          <button
            className={clsx(
              "rounded bg-black px-4 py-1 text-sm text-white ring-offset-2 transition-opacity focus:ring-1 focus:ring-blue-600 disabled:opacity-25  dark:bg-neutral-100 dark:text-black",
            )}
            disabled={!inputIsValid || loading}
            type="submit"
          >
            Post
          </button>
        </Form.Submit>
      </div>
    </Form.Root>
  );
}

// export default DesktopForm;
