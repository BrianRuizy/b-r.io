"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";

export default function AuthButton() {
  const { data: session } = useSession();

  console.log(session);
  if (session) {
    return (
      <Avatar.Root className="inline-flex h-[48px] w-[48px] select-none items-center justify-center overflow-hidden rounded-full border border-secondary bg-secondary align-middle">
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