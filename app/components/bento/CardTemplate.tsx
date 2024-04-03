import clsx from "clsx";

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={clsx(
        "h-full w-full overflow-clip rounded-2xl border border-secondary bg-primary leading-tight shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
