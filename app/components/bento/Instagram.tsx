import Card from "@/app/components/bento/CardTemplate";
import Link from "@/app/components/Link";
import { FaInstagram } from "react-icons/fa";

export default function Instagram() {
  return (
    <Card className="col-span-1 row-span-1 flex aspect-square flex-col gap-1.5">
      <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-bl from-[#7638FA] via-[#FF006A] to-[#FED702]">
        <FaInstagram className="text-2xl text-white" />
      </div>
      <p className="text-secondary">@brianruizy</p>
      <p className="line-clamp-2">Photos and all</p>

      <Link
        className="mt-auto flex w-fit items-center gap-1.5 rounded-full bg-tertiary px-4 py-1.5 text-sm no-underline"
        href="https://instagram.com/brianruizy"
      >
        <span className="font-medium text-primary">Follow</span>
        <span className="text-tertiary">4k</span>
      </Link>
    </Card>
  );
}
