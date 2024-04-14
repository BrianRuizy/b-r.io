"use client";

import Link from "@/app/components/ui/Link";
import * as Avatar from "@radix-ui/react-avatar";

export default function Info() {
  return (
    <div className="flex flex-col gap-6 pt-3 md:pt-0">
      <div className="rounded-xl bg-tertiary dark:bg-secondaryA md:text-sm">
        <div className="space-y-3 p-4">
          <h2 className="font-medium">Community Info</h2>
          <p className="text-secondary">
            A private space for us to connect, share ideas, and grow together.
          </p>
        </div>

        <hr className="border-secondary" />
        <div className="grid grid-cols-2 gap-3 divide-x divide-secondary p-3">
          <div className="col-span-1 flex flex-col items-center">
            <p className="text-secondary">Members</p>
            <p className="text-base font-medium">2k</p>
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <p className="text-secondary">Online</p>
            <p className="flex items-center gap-1 text-base font-medium">8</p>
          </div>
        </div>
      </div>
      <div className="hidden space-y-6 rounded-xl bg-tertiary p-4 dark:bg-secondaryA md:block md:text-sm">
        <div className="space-y-3">
          <h2 className="font-medium">Tags</h2>
          <p className="text-secondary">
            Explore the various conversation topics.
          </p>
        </div>
        <ul className="animated-list gap-y-1.Z flex flex-wrap gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="transition-opacity">
              <Link
                href=""
                className="flex items-center whitespace-nowrap text-sm lowercase no-underline"
              >
                <span className="text-tertiary">#</span>general
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-6 rounded-xl bg-tertiary p-4 dark:bg-secondaryA md:text-sm">
        <div className="space-y-3">
          <h2 className="font-medium">Leaderboard</h2>
          <p className="text-secondary">
            Top contributors of the month. Gain points with likes and comments.
          </p>
        </div>
        <ul className="animated-list space-y-3 md:space-y-2 ">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center gap-3 transition-opacity"
            >
              <p className="text-sm text-tertiary">{index + 1}</p>
              <Avatar.Root className="inline-flex h-[32px] w-[32px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle md:h-[24px] md:w-[24px]">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] border border-secondary object-cover"
                  src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                />
                <Avatar.Fallback
                  className="flex h-full w-full items-center justify-center border border-secondary bg-secondary text-sm font-medium"
                  delayMs={600}
                >
                  CT
                </Avatar.Fallback>
              </Avatar.Root>
              <p>username</p>
              <p className="ml-3 text-tertiary md:hidden">100 points</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
