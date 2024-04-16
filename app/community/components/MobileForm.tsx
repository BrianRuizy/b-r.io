"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

import clsx from "clsx";
import { Drawer } from "vaul";
import * as Form from "@radix-ui/react-form";
import * as Avatar from "@radix-ui/react-avatar";
import { Topic } from "@/app/community/components/TopicBadge";

import { PlusIcon } from "@heroicons/react/24/solid";

export default function MobileForm({ topics }: { topics: Topic[] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const [isValid, setIsValid] = useState(false);
  const router = useRouter()

  return (
    <Drawer.Root
      shouldScaleBackground
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <Drawer.Trigger asChild>
        <div
          className={clsx(
            "fixed bottom-6 right-6 transition-all md:hidden",
            !session ? "hidden" : "visible",
          )}
        >
          <button className="rounded-xl bg-primary p-3 text-primary drop-shadow-2xl invert">
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Form.Root
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const content = form.content.value;
            const topic = form.topic.value;
            const authorId = session?.user.id;

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
                setIsDrawerOpen(false); // Close the drawer
                router.refresh()
              }
            } catch (error) {
              console.error("An unexpected error occurred:", error);
            }
          }}
        >
          <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 h-[96%] rounded-t-[10px] bg-primary outline-none">
            <div className="h-full flex-1 flex-col gap-6 rounded-t-[10px] bg-primary ">
              <div className="fixed left-0 right-0 top-1.5 mx-auto flex h-1.5 w-10 items-center justify-center rounded-full bg-secondary" />
              <div className="flex items-center justify-between border-b border-secondary px-6 pb-3 pt-6">
                <button className="w-16 text-left">Cancel</button>
                <Drawer.Title className="flex-1 text-center text-lg font-bold tracking-tight">
                  New Post
                </Drawer.Title>
                <button
                  className={clsx(
                    "w-16 text-right text-link",
                    isValid ? "font-medium text-link" : "text-tertiary",
                  )}
                >
                  Share
                </button>
              </div>
              <div className="mb-3 flex gap-3 p-6">
                <div>
                  <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
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
                </div>

                <div className="mt-1.5 w-full space-y-3">
                  <div className="flex items-center gap-1.5 leading-none">
                    <p className="font-medium">
                      {" "}
                      {session?.user?.name || "Anonymous User"}
                    </p>
                    <span className="text-tertiary">·</span>
                    <p className="text-secondary">Today</p>
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
                  </div>
                  <Form.Field name="content">
                    <Form.Control asChild>
                      <textarea
                        className="w-full resize-none bg-primary leading-tight outline-none placeholder:text-tertiary focus:outline-none"
                        placeholder="What's on your mind..."
                        minLength={1}
                        rows={6}
                        maxLength={280}
                        required
                        style={{ height: "auto" }}
                        onInput={(event) => {
                          event.currentTarget.style.height = "auto";
                          event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
                          setIsValid(event.currentTarget.value.length > 0);
                        }}
                      />
                    </Form.Control>
                  </Form.Field>
                </div>
              </div>
            </div>

            <Form.Submit asChild className="ml-auto mt-auto">
              <button
                className="w-fit rounded bg-black px-4 py-1 text-sm text-white transition-opacity disabled:opacity-20 dark:bg-neutral-100 dark:text-black"
                disabled={!isValid}
                type="submit"
              >
                Post
              </button>
            </Form.Submit>
          </Drawer.Content>
        </Form.Root>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
