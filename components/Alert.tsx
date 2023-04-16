import { ReactNode } from "react";
import { IconInfo, IconWarning } from "./Icons";

const Alert = ({
  children,
  type,
}: {
  children: ReactNode;
  type: "warning" | "info";
}): JSX.Element => (
  <div className="flex gap-2 p-4 rounded mt-7 bg-tertiary">
    <div className="w-5 h-5">
      {type === "warning" ? <IconWarning /> : <IconInfo />}
    </div>
    <div className="not-prose text-sm">{children}</div>
  </div>
);

export default Alert;
