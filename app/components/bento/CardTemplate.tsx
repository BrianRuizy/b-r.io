import clsx from "clsx";
import Halo from "@/app/components/Halo";

export default function Card({
  children,
  className,
  disableHalo,
  noPadding,
}: {
  children: React.ReactNode;
  className: string;
  disableHalo?: boolean;
  noPadding?: boolean;
}) {
  return (
    <Halo
      strength={disableHalo ? 0 : 5}
      className={clsx(
        "h-full w-full overflow-clip rounded-xl bg-primary text-sm border border-secondary",
        noPadding ? "p-0" : "p-4 md:p-6",
        className,
      )}
    >
      {children}
    </Halo>
  );
}
