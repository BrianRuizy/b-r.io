import { format } from "date-fns";

export const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export function formatRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000;

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.round(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.round(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.round(diffInSeconds / 86400)}d`;

  return format(date, "MM/d/yyyy");
}
