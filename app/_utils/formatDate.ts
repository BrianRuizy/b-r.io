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

export const relativeDatetime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const minutesAgo = differenceInMinutes(date, now);
  if (minutesAgo < 60) {
    return `${minutesAgo}m`;
  }

  const hoursAgo = differenceInHours(date, now);
  if (hoursAgo < 24) {
    return `${hoursAgo}h`;
  }

  const daysAgo = differenceInDays(date, now);
  if (daysAgo < 7) {
    return `${daysAgo}d`;
  }

  return format(date, "yyyy-MM-dd");
};
