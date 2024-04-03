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
        "rounded-2xl bg-primary border border-secondary shadow-sm overflow-clip leading-tight",
        className,
      )}
    >
      {children}
    </div>
  );
}
