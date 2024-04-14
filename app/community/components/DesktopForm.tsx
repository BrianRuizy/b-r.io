"use client";
import { useState } from "react";
import * as Form from "@radix-ui/react-form";

export default function DesktopForm() {
  const [isValid, setIsValid] = useState(false);
  

  return (
    <Form.Root className="flex flex-col gap-0.5 rounded-lg border border-secondary p-3 shadow-sm">
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
          />
        </Form.Control>
      </Form.Field>

      <Form.Submit asChild className="ml-auto">
        <button
          className="rounded bg-black px-4 py-1 text-sm text-white transition-opacity disabled:opacity-20 dark:bg-neutral-100 dark:text-black"
          disabled={!isValid}
          type="submit"
        >
          Post
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
