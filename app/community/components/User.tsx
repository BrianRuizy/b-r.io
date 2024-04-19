"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaGithub } from "react-icons/fa";

export default function User() {
  const { data: session } = useSession();

  if (session) {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer rounded-full">
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
              <DropdownMenu.Item className="cursor-default select-none rounded-md px-4 py-2 outline-none hover:bg-secondary focus:outline-none">
                Delete Account
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
  return (
    <div>
      <button
        className="flex items-center rounded-md border border-secondary bg-primary px-4  py-1.5 text-base"
        onClick={() => signIn()}
      >
        <FaGithub className="mr-2" />

        <span>Sign in</span>
      </button>
    </div>
  );
}
