"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import clsx from "clsx";
import { Drawer } from "vaul";
import * as Form from "@radix-ui/react-form";
import * as Avatar from "@radix-ui/react-avatar";

import { PlusIcon } from "@heroicons/react/24/solid";

export default function MobileForm() {
  const { data: session } = useSession();
  const [isValid, setIsValid] = useState(false);

  return (
    <Drawer.Root shouldScaleBackground={false}>
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
        <Form.Root>
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
                    <p className="text-secondary">Today</p>
                  </div>
                  <Form.Field name="post">
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
