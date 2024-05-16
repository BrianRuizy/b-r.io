"use client";

import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Drawer } from "vaul";
import { FaGithub, FaDiscord } from "react-icons/fa";
import Image from "next/image";

// import * as Clerk from '@clerk/elements/common'

import Avatar from "@/app/components/Avatar";
import Logo from "@/public/logo/apple-touch-icon.png";

export default function User() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (isSignedIn) {
    return (
      <>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="cursor-pointer rounded-full">
            <Avatar src={user?.imageUrl} initials={user?.fullName} size="md" />
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
                    <p className="font-medium">{user?.fullName}</p>
                    <p className="text-sm text-secondary">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </DropdownMenu.Item>
                <DropdownMenu.Separator>
                  <hr className="my-2 border-secondary" />
                </DropdownMenu.Separator>

                <DropdownMenu.Item
                  className=" cursor-default select-none rounded-md px-4 py-2 outline-none hover:bg-secondary focus:outline-none"
                  onClick={() => signOut()}
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
      </>
    );
  }
  return (
    <>
      <SignInButton mode="modal" redirectUrl="/community"></SignInButton>

      <Drawer.Root>
        <Drawer.Trigger>
          <button className="rounded-md border border-secondary bg-transparent px-4 py-1.5 text-base">
            <span>Sign in</span>
          </button>
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 mx-auto flex max-h-[96%] max-w-[700px] flex-col rounded-t-2xl bg-primary p-6 outline-none md:p-8">
            <div className="fixed left-0 right-0 top-1.5 mx-auto flex h-1.5 w-10 items-center justify-center rounded-full bg-secondary" />

            <div className="flex select-none items-center justify-end">
              <Drawer.Close className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary hover:bg-tertiary hover:text-primary">
                {/* prettier-ignore */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
              </Drawer.Close>
            </div>

            <div className="space-y-9 pb-3">
              <div>
                <Image
                  src={Logo}
                  alt="B-R.io"
                  width={48}
                  height={48}
                  className="mb-6"
                />
                <Drawer.Title className="text-xl font-semibold tracking-tight mb-1.5">
                  Get Started
                </Drawer.Title>
                <p className="max-w-sm text-base text-secondary text-pretty">
                  Sign in to join the community. This is a place for us
                  to share thoughts and ideas across various topics. All open source.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex w-full items-center justify-center gap-4 rounded-lg bg-tertiary p-4">
                  <FaGithub className="text-xl" />
                  Continue with GitHub
                </div>
                <div className="flex w-full items-center justify-center gap-4 rounded-lg bg-tertiary p-4">
                  <FaDiscord className="text-xl text-[#5865F2]" />
                  Continue with Discord
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}
