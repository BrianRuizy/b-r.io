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
}: {
  topic: { id: number; name: string };
  textOnly?: boolean;
  active?: boolean;
}) {
  return (
    <Link
      href={topic.name === "all" ? "/community" : `/community/${topic.name}`}
      className={clsx(
        "flex cursor-pointer items-center whitespace-nowrap text-sm lowercase no-underline ",
        textOnly
          ? "bg-none p-0 text-secondary"
          : "rounded-lg bg-secondary px-4 py-1.5 ",
        active && "bg-primary text-primary invert",
      )}
    >
      <span className="text-tertiary">#</span>
      <span>{topic?.name}</span>
    </Link>
  );
}
