import Link from "@/app/components/ui/Link";
import { FaYoutube } from "react-icons/fa";
import Card from "@/app/components/bento/CardTemplate";
import Image from "next/image";

// get youtube subs count from route handler api/youtube
async function getData() {
  const res = await fetch("https://b-r.io/api/youtube");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function YouTube() {
  const data = await getData();

  return (
    <Card className="col-span-2 flex justify-between gap-6 p-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex aspect-square h-10 w-fit items-center justify-center rounded-xl bg-[#FF0000]">
          <FaYoutube className="text-2xl text-white" />
        </div>
        <p className="text-secondary">@brianruizy</p>
        <Link
          className="mt-auto flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm no-underline hover:bg-tertiary"
          href="https://youtube.com/@Brianruizy?sub_confirmation=1"
        >
          <span className="font-medium text-primary">Subscribe</span>
          <span className="text-tertiary">
            {Math.floor(data.subscribers / 1000)}k
          </span>
        </Link>
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-3">
        <Link
          className="relative col-span-1 row-span-1"
          href={"https://youtu.be/j68U1wBplk8"}
        >
          <Image
            src={"/thumbnails/my tech stack.png"}
            fill={true}
            alt="thumbnail"
            className="rounded-lg border border-secondary object-cover"
          />
        </Link>
        <Link
          className="relative col-span-1 row-span-1"
          href={"https://youtu.be/53KFVt2GRkE"}
        >
          <Image
            src={"/thumbnails/notion setup.png"}
            fill={true}
            alt="thumbnail"
            className="rounded-lg border border-secondary object-cover"
          />
        </Link>
        <Link
          className="relative col-span-1 row-span-1"
          href={"https://youtu.be/mH4Fs1Pxomo"}
        >
          <Image
            src={"/thumbnails/5 productivity tools.png"}
            fill={true}
            alt="thumbnail"
            className="rounded-lg border border-secondary object-cover"
          />
        </Link>
        <Link
          className="relative col-span-1 row-span-1"
          href={"https://youtu.be/BlB5wovFmjc"}
        >
          <Image
            src={"/thumbnails/macbook.png"}
            fill={true}
            alt="thumbnail"
            className="rounded-lg border border-secondary object-cover"
          />
        </Link>
      </div>
    </Card>
  );
}
