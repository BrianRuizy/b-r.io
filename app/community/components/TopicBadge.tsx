import Link from "@/app/components/ui/Link";
import clsx from "clsx";

export interface Topic {
  id: number;
  name: string;
}

export default function TopicBadge({
  topic,
  textOnly = false,
  active,
  hashtag = true,
}: {
  topic: { id: number; name: string };
  textOnly?: boolean;
  active?: boolean;
  hashtag?: boolean;
}) {
  return (
    <Link
      scroll={false}
      href={topic.name === "All Topics" ? "/community" : `/community/${topic.name}`}
      className={clsx(
        "flex cursor-pointer items-center whitespace-nowrap text-sm focus:outline-1",
        textOnly ? "bg-none p-0" : "rounded-lg bg-secondary px-4 py-1.5 ",
        active ? "bg-primary text-primary invert" : "text-secondary",
      )}
    >
      {hashtag && <span className="text-tertiary">#</span>}
      <span>{topic?.name}</span>
    </Link>
  );
}
