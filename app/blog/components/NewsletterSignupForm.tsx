"use client";

import { FormEventHandler, useCallback, useState, useEffect } from "react";
import clsx from "clsx";

import Halo from "@/app/components/Halo";
import FlipNumber from "@/app/components/FlipNumber";

export default function NewsletterSignupForm({
  contained = true,
}: {
  contained?: boolean;
}) {
  const [data, setData] = useState<{ subscribers: number }>();

  const name = "email";
  const [success, setSuccess] = useState<boolean | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/convertkit/subscribers");
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  const onSubmit: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const data = new FormData(target);
    const email = data.get(name);

    const body = JSON.stringify({
      email,
    });

    const headers = new Headers({
      "Content-Type": "application/json; charset=utf-8",
    });

    try {
      const response = await fetch(`/api/convertkit/subscribe`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers,
        body,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch {
      setSuccess(false);
    }
  }, []);

  if (success === false) {
    return (
      <Card contained={contained}>
        <p>mhh, something went wrong... Try again later.</p>
      </Card>
    );
  }

  if (success) {
    return (
      <Card contained={contained}>
        <p className="text-primary">You&apos;re in!</p>
        <p className="max-w-md text-secondary">
          Thanks for subscribing! Be on the lookout for the confirmation email.
        </p>
      </Card>
    );
  }

  return (
    <Card contained={contained}>
      <p className="text-primary">Newsletter</p>
      <p className="max-w-md text-secondary">
        Get personal updates and readings on topics like tech, design,
        productivity, programming, and more!
      </p>
      <form className="mt-2 w-full max-w-md " onSubmit={onSubmit}>
        <div className="flex w-full rounded-md border border-primary bg-contrast py-1 pl-3 pr-1">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            name={name}
            id="email"
            className="flex-1 bg-transparent outline-none placeholder:text-tertiary"
            placeholder="you@example.com"
            required
          />
          <button className="h-full w-fit whitespace-nowrap rounded bg-neutral-800 px-4 py-1 text-sm text-white hover:bg-neutral-900 focus:ring-inset focus:ring-blue-600 focus-visible:outline focus-visible:outline-2 dark:bg-neutral-300 dark:text-black hover:dark:bg-neutral-100">
            {"Sign up"}
          </button>
        </div>
      </form>
      <p className="text-sm text-tertiary">
        Join the <FlipNumber>{data?.subscribers || 0}</FlipNumber> other
        readers.
      </p>
    </Card>
  );
}

function Card({
  children,
  contained,
}: {
  children: React.ReactNode;
  contained?: boolean;
}) {
  return (
    <Halo strength={contained ? 5 : 0}>
      <div
        className={clsx(
          "flex flex-col gap-6",
          contained
            ? "items-center justify-center rounded-lg bg-secondary p-6 text-center md:p-8"
            : "",
        )}
      >
        {children}
      </div>
    </Halo>
  );
}
