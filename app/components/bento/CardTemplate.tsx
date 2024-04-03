import clsx from "clsx";
import Halo from "@/app/components/ui/Halo";

export default function Card({
  children,
  className,
  disableHalo
}: {
  children: React.ReactNode;
  className: string;
  disableHalo?: boolean;
}) {
  return (
    <Halo
      strength={disableHalo ? 0 : 10}
      className={clsx(
        "h-full w-full overflow-clip rounded-2xl border border-secondary bg-primary leading-tight shadow-sm",
        className,
      )}
    >
      {children}
    </Halo>
  );
}
