import Image from "next/image";
import { FaYoutube } from "react-icons/fa";
import Link from "@/components/ui/Link";
import Card from "@/components/bento/CardTemplate";

// get youtube subs count from route handler api/youtube
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/youtube`, {
    next: {
      revalidate: 86400, // 24 hours
    },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function YouTube() {
  const data = await getData();

  return (
    <Card className="col-span-2 row-span-1 flex justify-between gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg bg-[#FF0000]">
          <FaYoutube className="text-xl text-white" />
        </div>
        <p className="text-secondary">@brianruizy</p>
        <Link
          className="mt-auto flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm no-underline hover:bg-tertiary"
          href="https://youtube.com/@Brianruizy?sub_confirmation=1"
        >
          <span className="font-medium text-primary">Subscribe</span>
          <span className="text-tertiary">
            {(data?.subscribers / 1000).toFixed(1)}k
          </span>
        </Link>
      </div>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-3">
        {data.videos?.map((video: any, index: number) => (
          <Link
            key={index}
            className="relative col-span-1 row-span-1 overflow-hidden rounded-lg border border-secondary hover:opacity-50 "
            href={video.url}
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              quality={100}
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </Card>
  );
}
