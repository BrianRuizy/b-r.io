"use client";

import * as Avatar from "@radix-ui/react-avatar";
import {
  HeartIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

export default function PostList() {
  return (
    <div className="flex flex-col divide-y divide-secondary">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex gap-3 py-4 md:flex-col md:py-6">
          <div className="w-fit md:hidden">
            <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:hidden">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] border border-secondary object-cover"
                src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                alt="Colm Tuite"
              />
              <Avatar.Fallback
                className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-xs font-medium"
                delayMs={600}
              >
                CT
              </Avatar.Fallback>
            </Avatar.Root>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <Avatar.Root className="hidden h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:inline-flex">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] border border-secondary object-cover"
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                />
                <Avatar.Fallback
                  className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-xs font-medium"
                  delayMs={600}
                >
                  CT
                </Avatar.Fallback>
              </Avatar.Root>
              <div className="flex items-center gap-1.5 leading-none">
                <p className="font-medium">Alexandra Monroe</p>
                <p className="text-tertiary">2h</p>
              </div>
            </div>
            <h2 className="line-clamp-4 leading-tight">
              {index % 2 === 0
                ? "Lorem ipsum dolor sit amet, consectetur adipiscing. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
                : "Ut enim ad minim veniam, quis nostrud exercitation ut aliquip ex ea commodo consequat."}
            </h2>
            <div className="mt-1.5 flex items-center gap-6 text-sm text-tertiary">
              <div className="flex items-center gap-1.5">
                <HeartIcon className="h-5 w-5" />
                <span>12 likes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ChatBubbleOvalLeftIcon className="h-5 w-5" />
                <span>7 replies</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
