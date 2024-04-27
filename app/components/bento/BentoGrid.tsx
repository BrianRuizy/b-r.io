import Link from "@/app/components/ui/Link";
import Card from "@/app/components/bento/CardTemplate";
import Map from "@/app/components/bento/map";
import Gumroad from "@/app/components/bento/Gumroad";
import Instagram from "@/app/components/bento/Instagram";
import YouTube from "@/app/components/bento/Youtube";

export default function BentoGrid() {
  return (
    <>
      <CommunityBanner />
      <div className="grid grid-cols-2 grid-rows-3 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-6">
        <YouTube />
        <Instagram />
        <Gumroad />
        <Card className="relative col-span-2 row-span-1" disableHalo noPadding>
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
      <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5 text-emerald-500"
        >
          <path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
        </svg>
      </div>
      <p>New Community Page! Come hang out.</p>
      <button className="ml-auto flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-sm no-underline hover:bg-tertiary">
        Visit
      </button>
    </Card>
  </Link>
);
