"use client";
import Link from "next/link";
import useSWR from "swr";

import { FaYoutube, FaGithub } from "react-icons/fa";
import { ArrowTrendingUpIcon } from "@heroicons/react/20/solid";

import FlipNumber from "@/app/components/FlipNumber";
import fetcher from "@/utils/fetcher";
import { addCommas } from "@/utils/utils";

export default function Stats() {
  const username = "brianruizy";

  const { data: githubData, error: githubDataError } = useSWR(
    `/api/github?username=${username}`,
    fetcher
  );
  const { data: postsData, error: postsError } = useSWR(
    `/api/hitsTotal`,
    fetcher
  );
  const { data: youtubeData, error: youtubeDataError } = useSWR(
    `/api/youtube`,
    fetcher
  );

  return (
    <ul className="space-y-2 animated-list">
      <li className="transition-opacity">
        <Link
          className="flex gap-3 items-center no-underline"
          href={"https://github.com/brianruizy"}
        >
          <FaGithub className="text-xl" />
          <div>
            <FlipNumber>
              {githubData ? addCommas(githubData?.stars) : "000"}
            </FlipNumber>
            <span> Repository Stars</span>
          </div>
        </Link>
      </li>
      <li className="transition-opacity">
        <Link className="flex gap-3 items-center" href="/blog">
          <ArrowTrendingUpIcon className="w-5 h-5" />
          <div>
            <FlipNumber>
              {postsData ? addCommas(postsData?.total) : "0,000"}
            </FlipNumber>
            <span> Total Blog Views</span>
          </div>
        </Link>
      </li>
      <li className="transition-opacity">
        <Link
          className="flex gap-3 items-center no-underline"
          href={"https://www.youtube.com/@" + username}
        >
          <FaYoutube className="text-xl" />
          <div>
            <FlipNumber>
              {youtubeData ? addCommas(youtubeData?.subscribers) : "00,000"}
            </FlipNumber>
            <span> YouTube Subscribers</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}
