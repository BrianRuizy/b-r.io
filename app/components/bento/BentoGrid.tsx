import Link from "@/app/components/ui/Link";
import Card from "@/app/components/bento/CardTemplate";
import Map from "@/app/components/bento/Map";
import Gumroad from "@/app/components/bento/Gumroad";
import Instagram from "@/app/components/bento/Instagram";
import YouTube from "@/app/components/bento/Youtube";

export default function BentoGrid() {
  return (
    <>
      <CommunityBanner />
      <div className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-6">
        <YouTube />
        <Instagram />
        <Gumroad />
        <Card
          className="relative col-span-1 row-span-1 md:col-span-2"
          disableHalo
          noPadding
        >
          <Map lng={-95.36327} lat={29.76328} />
          <div className="absolute bottom-4 left-4 flex items-center rounded-lg bg-neutral-100/75 px-4 py-1.5 backdrop-blur dark:bg-neutral-900/75 md:bottom-6 md:left-6">
            <p className="text-sm font-medium text-primary">Houston, TX</p>
          </div>
        </Card>
      </div>
    </>
  );
}

const CommunityBanner = () => (
  <Link href="/community">
    <Card
      className="mb-4 flex items-center gap-4 p-4 md:mb-6 md:gap-6 md:px-6"
      noPadding
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
      </span>
      <p>New Community Page!</p>
      <button className="ml-auto flex items-center rounded-full bg-tertiary px-4 py-1.5 text-sm font-medium no-underline">
        Check it out
      </button>
    </Card>
  </Link>
);
