import Link from "@/app/components/ui/Link";
import clsx from "clsx";

export interface Topic {
  id: number;
  name: string;
}

export default function TopicBadge({
  topic,
  textOnly = false,
}: {
  topic: { id: number; name: string };
  textOnly?: boolean;
}) {
  return (
    <Link
      href={`/community/topic/${topic?.id}`}
      className={clsx(
        "text-sm1 flex cursor-pointer items-center whitespace-nowrap lowercase no-underline",
        textOnly
          ? "bg-none p-0 text-secondary"
          : "rounded bg-secondary px-1 py-0.5",
      )}
    >
      <span className="text-tertiary">#</span>
      <span>{topic?.name}</span>
    </Link>
  );
}
