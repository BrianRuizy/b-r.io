import Card from "@/app/components/bento/CardTemplate";
import Link from "@/app/components/ui/Link";
import { FaInstagram } from "react-icons/fa";

export default function Instagram() {
  return (
    <Card className="col-span-1 row-span-1 flex aspect-square flex-col gap-1.5 rounded-2xl border border-secondary p-6 shadow-sm">
      <div className="flex aspect-square h-10 w-fit items-center justify-center rounded-xl bg-gradient-to-br  from:[#f09433] to:[#e6683c]">
        <FaInstagram className="text-2xl text-white" />
      </div>
      <p className="text-secondary">@brianruizy</p>
      <Link
        className="mt-auto flex w-fit items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm no-underline"
        href="https://youtube.com/@Brianruizy?sub_confirmation=1"
      >
        <span className="font-medium text-primary">Follow</span>
        <span className="text-tertiary">3.9k</span>
      </Link>
    </Card>
  );
}
