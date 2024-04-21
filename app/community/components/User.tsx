"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaGithub } from "react-icons/fa";

import { Drawer } from "vaul";
import clsx from "clsx";

export default function User() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="hidden cursor-pointer rounded-full md:block">
            <Avatar.Root className="inline-flex h-14 w-14 select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
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
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              sideOffset={8}
              align="end"
              className="rounded-xl border border-secondary bg-primary p-2 text-base shadow-lg sm:text-sm"
            >
              <DropdownMenu.Group className="">
                <DropdownMenu.Item className="px-4 py-2" disabled>
                  <div className="leading-tight">
                    <p className="font-medium">{session?.user?.name}</p>
                    <p className="text-sm text-secondary">
                      {session?.user?.email}
                    </p>
                  </div>
                </DropdownMenu.Item>
                <DropdownMenu.Separator>
                  <hr className="my-2 border-secondary" />
                </DropdownMenu.Separator>

                <DropdownMenu.Item
                  onSelect={() => signOut()}
                  className=" cursor-default select-none rounded-md px-4 py-2 outline-none hover:bg-secondary focus:outline-none"
                >
                  Sign out
                </DropdownMenu.Item>
                <DropdownMenu.Item className="cursor-default select-none rounded-md px-4 py-2 text-red-500 outline-none hover:bg-red-100 focus:outline-none dark:hover:bg-red-950">
                  Delete Account
                </DropdownMenu.Item>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
        {/* <Drawer.Root
          snapPoints={[.4, .99]}
        >
          <Drawer.Trigger asChild>
            <div
              className={clsx(
                "fixed bottom-6 right-6 transition-all md:hidden",
                !session ? "hidden" : "visible",
              )}
            >
              <Avatar.Root className="inline-flex h-14 w-14 select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
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
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />

            <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 h-[96%] rounded-t-[10px] bg-primary outline-none">
              <div className="h-full flex-1 flex-col gap-6 rounded-t-[10px] bg-primary ">
                <div className="fixed left-0 right-0 top-1.5 mx-auto flex h-1.5 w-10 items-center justify-center rounded-full bg-secondary" />
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center">
                    <Avatar.Root className="inline-flex h-14 w-14 select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
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
                    <div className="ml-4">
                      <p className="font-medium">{session?.user?.name}</p>
                      <p className="text-sm text-secondary">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="rounded-md border border-secondary bg-transparent px-4 py-1.5 text-base"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root> */}
      </>
    );
  }
  return (
    <div>
      <button
        className="flex items-center rounded-md border border-secondary bg-transparent px-4 py-1.5 text-base"
        onClick={() => signIn("github")}
      >
        <FaGithub className="mr-2" />
        <span>Sign in</span>
      </button>
    </div>
  );
}
