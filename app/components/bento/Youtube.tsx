import Link from "@/app/components/ui/Link";
import { FaYoutube } from "react-icons/fa";
import Card from "@/app/components/bento/CardTemplate";

export default function YouTube() {
  return (
    <Card className="col-span-2 row-span-1 flex justify-between gap-6 rounded-2xl border border-secondary p-6 p-6 shadow-sm">
      <div className="flex flex-col gap-1.5">
        <div className="flex aspect-square h-10 w-fit items-center justify-center rounded-xl bg-red-500 dark:bg-red-600">
          <FaYoutube className="text-2xl text-white" />
        </div>
        <p className="text-secondary">@brianruizy</p>
        <Link
          className="mt-auto flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm no-underline"
          href="https://youtube.com/@Brianruizy?sub_confirmation=1"
        >
          <span className="font-medium text-primary">Subscribe</span>
          <span className="text-tertiary">67k</span>
        </Link>
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-3">
        <div className="col-span-1 row-span-1 rounded-lg border border-secondary bg-[url('https://i9.ytimg.com/vi_webp/j68U1wBplk8/mqdefault.webp?v=66026be1&sqp=CPyXmbAG&rs=AOn4CLCrhaW7FwazB4VH_vkj1Z-4ICq1XA')] bg-cover bg-center"></div>
        <div className="col-span-1 row-span-1 rounded-lg border border-secondary bg-[url('https://i9.ytimg.com/vi_webp/53KFVt2GRkE/mqdefault.webp?v=65fcb383&sqp=CPyXmbAG&rs=AOn4CLCD92jM3CPVHosay49YOe5ji3jdHg')] bg-cover bg-center"></div>
        <div className="col-span-1 row-span-1 rounded-lg border border-secondary bg-[url('https://i9.ytimg.com/vi/mH4Fs1Pxomo/mqdefault.jpg?v=65f1d403&sqp=CPyXmbAG&rs=AOn4CLCVEVTdWr2uIRhEYnqzLSm_9t5Y8g')] bg-cover bg-center"></div>
        <div className="col-span-1 row-span-1 rounded-lg border border-secondary bg-[url('https://i9.ytimg.com/vi/BlB5wovFmjc/mqdefault.jpg?v=65f53eb0&sqp=CPyXmbAG&rs=AOn4CLCuHnlTYnHH9YuyylOJxjtEk-9onQ')] bg-cover bg-center"></div>
      </div>
    </Card>
  );
}
