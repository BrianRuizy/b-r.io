"use client";
import Link from "next/link";
import useSWR from "swr";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { FaGithub } from "react-icons/fa";
import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid";

import FlipNumber from "@/components/FlipNumber";
import fetcher from "@/lib/fetcher";
import { addCommas } from "@/lib/utils";

import { useLang } from "./LanguageProvider";
import { statsTranslations } from "@/translations/statsTranslations";

export function GitHub() {
  const { data: githubData, error: githubDataError } = useSWR(
    `/api/github?username=fyleek`,
    fetcher
  );

  if (githubDataError) return <div>failed to load</div>;
  return addCommas(githubData?.numberOfProject);
}

export default function Stats() {
  const { theme } = useTheme();
  const username = "fyleek";
  const { lang } = useLang();
  const text = statsTranslations[lang];

  const { data: githubData, error: githubDataError } = useSWR(
    `/api/github?username=${username}`,
    fetcher
  );

  return (
    <ul
      className={clsx("space-y-2 animated-list")}
    >
      <li className="transition-opacity">
        <Link
          className="flex gap-3 items-center no-underline"
          href={"https://github.com/Fyleek"}
        >
          <FaGithub className="text-xl" />
          <div>
            <FlipNumber>
              {githubData ? addCommas(githubData?.numberOfProject) : "000"}
            </FlipNumber>
            <span> {text.github}</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}
