import Image from "next/image";

import Maintenance from "public/maintenance.svg";

export default function Deployments() {
  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-8 animate-in">
          <Image
            src={Maintenance}
            alt="maintenance"
            width={1024}
            height={1024}
          />
        </div>
      </div>
    </>
  );
}
