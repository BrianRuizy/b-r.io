import Card from "@/app/components/bento/CardTemplate";
import Link from "@/app/components/ui/Link";
import { FaInstagram } from "react-icons/fa";
import Halo from "@/app/components/ui/Halo";

export default function Instagram() {
  return (
    <Halo className="col-span-1 row-span-1">
      <Card className="col-span-1 flex aspect-square flex-col gap-1.5 p-4 md:p-6">
        <div className="flex aspect-square h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-bl from-[#7638FA] via-[#FF006A] to-[#FED702]">
          <FaInstagram className="text-2xl text-white" />
        </div>
        <p className="text-secondary">@brianruizy</p>
        <Link
          className="mt-auto flex w-fit items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm no-underline hover:bg-tertiary"
          href="https://instagram.com/brianruizy"
        >
          <span className="font-medium text-primary">Follow</span>
          <span className="text-tertiary">3.9k</span>
        </Link>
      </Card>
    </Halo>
  );
}
