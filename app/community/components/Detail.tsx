"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import clsx from "clsx";
import { Drawer } from "vaul";
import * as Avatar from "@radix-ui/react-avatar";
import { Topic } from "@/app/community/components/TopicBadge";

import { PlusIcon } from "@heroicons/react/24/solid";

export default function Detail({ topics }: { topics: Topic[] }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const [isValid, setIsValid] = useState(false);

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

            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
