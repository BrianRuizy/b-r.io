"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Avatar.Root className="inline-flex h-[48px] w-[48px] select-none items-center justify-center overflow-hidden rounded-full bg-secondary align-middle">
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <Avatar.Fallback
          className="flex h-full w-full items-center justify-center bg-secondary text-sm font-medium text-primary"
          delayMs={600}
        >
          CT
        </Avatar.Fallback>
      </Avatar.Root>
    );
  }
  return (
    <div>
      <button
        className="w-fit text-primary underline underline-offset-4 hover:text-secondary"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}
