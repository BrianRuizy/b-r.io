import {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";

export const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

export const relativeDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date(Date.now());

  const minutesAgo = differenceInMinutes(now, date);
  if (minutesAgo < 60) {
    return `${minutesAgo}m`;
  }

  const hoursAgo = differenceInHours(now, date);
  if (hoursAgo < 24) {
    return `${hoursAgo}h`;
  }

  const daysAgo = differenceInDays(now, date);
  if (daysAgo < 7) {
    return `${daysAgo}d`;
  }

  return format(date, "yyyy-MM-dd");
};
