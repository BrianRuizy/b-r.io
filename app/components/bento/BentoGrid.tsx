import Link from "@/app/components/Link";
import Card from "@/app/components/bento/CardTemplate";
import Map from "@/app/components/bento/Map";
import Gumroad from "@/app/components/bento/Gumroad";
import Instagram from "@/app/components/bento/Instagram";
import YouTube from "@/app/components/bento/Youtube";

export default function BentoGrid() {
  return (
    <>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-6">
        <YouTube />
        <Instagram />
        <Gumroad />
        <Card
          className="relative col-span-1 row-span-1 md:col-span-2"
          disableHalo
          noPadding
        >
          <Map lng={-73.9665} lat={40.7829} />
          <div className="absolute bottom-4 left-4 flex items-center rounded-lg bg-neutral-100/75 px-4 py-1.5 backdrop-blur dark:bg-neutral-900/75 md:bottom-6 md:left-6">
            <p className="text-sm font-medium text-primary">New York, NY</p>
          </div>
        </Card>
      </div>
    </>
  );
}
