import Image from "next/image";
import type { Metadata } from "next";

import avatar from "public/avatar.png";
import map from "public/map.png";
import { FaYoutube } from "react-icons/fa";

import Link from "@/app/components/ui/Link";

export const metadata: Metadata = {
  title: "Mediakit | Brian Ruiz",
  description:
    "Creator based in Houston. Focuses on topics including consumer technology, software engineering, design, and lifestyle.",
};

// get youtube subs count from route handler api/youtube
async function getData() {
  const res = await fetch(
    `https://b-r.io/api/youtube`,
    {
      next: {
        revalidate: 86400, // 24 hours
      },
    },
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Mediakit() {
  const data = await getData();

  return (
    <div className="relative">
      <div className="z-20 flex flex-col gap-16 md:gap-24">
        <div
          className="flex animate-in flex-col gap-8 md:flex-row md:items-end md:justify-between"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <div className="flex flex-col gap-1">
            <h3 className="leading-none text-secondary">Media Kit</h3>
            <h2 className="whitespace-nowrap text-4xl font-bold tracking-tight">
              Brian Ruiz
            </h2>
          </div>
          <div className="flex w-fit max-w-md flex-col gap-1 md:max-w-sm">
            <div className="inline-flex items-center gap-2">
              <div className="relative">
                {/* youtube play fill  */}
                <span className="absolute left-2 top-2 z-10 w-1 rounded-full bg-white p-1"></span>
                <FaYoutube className="relative z-20 text-2xl text-[#FF0000]" />
              </div>
              <span className="text-lg font-semibold tracking-tighter">
                YouTube
              </span>
            </div>
            <p className="z-50 text-sm text-secondary">
              Creator based in Houston. Focuses on topics including consumer
              technology, software engineering, design, and lifestyle.{" "}
              <Link href="https://www.youtube.com/@brianruizy" underline>
                Visit channel.
              </Link>
            </p>
          </div>
          <Image
            src={avatar}
            width={60}
            height={60}
            alt="avatar"
            className="order-first rounded-full bg-tertiary md:order-last"
          />
        </div>

        <div
          className="animate-in space-y-8"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
            <h2 className="col-span-2 text-secondary md:col-span-6">Content</h2>
            <div className="col-span-1 flex flex-col justify-center rounded-xl border border-primary bg-tertiary p-6 md:col-span-2 md:items-center">
              <p className="text-secondary">Subscribers</p>
              <h2 className="text-2xl font-bold text-primary">
                {(data?.subscribers / 1000).toFixed(1)}k
              </h2>
            </div>
            <div className="col-span-1 flex flex-col justify-center rounded-xl border border-primary bg-tertiary p-6 md:col-span-2 md:items-center">
              <p className="text-secondary">Monthly Impressions</p>
              <h2 className="text-2xl font-bold text-primary">6.1M+</h2>
            </div>
            <div className="col-span-1 flex flex-col justify-center rounded-xl border border-primary bg-tertiary p-6 md:col-span-2 md:items-center">
              <p className="text-secondary">Monthly Views</p>
              <h2 className="text-2xl font-bold text-primary">387K+</h2>
            </div>
            <div className="col-span-1 flex flex-col justify-center rounded-xl border border-primary bg-tertiary p-6 md:col-span-2 md:hidden md:items-center">
              <p className="text-secondary">Average Views</p>
              <h2 className="text-2xl font-bold text-primary">247K*</h2>
            </div>
            <h2 className="col-span-2 mt-4 text-secondary md:col-span-6">
              Audience
            </h2>
            <div className="col-span-2 row-span-1 space-y-2 rounded-xl border border-primary bg-tertiary p-6 md:col-span-3">
              <p className="text-secondary">Gender</p>
              <div>
                <ProgressBar percentage={89} label="Male" />
                <ProgressBar percentage={11} label="Fem." />
              </div>
            </div>
            <div className="order-last col-span-2 row-span-2 overflow-clip rounded-xl border border-primary bg-tertiary pt-6 text-center md:order-none md:col-span-3">
              <p className="font-bold text-primary">Top Geographies</p>
              <p className="text-secondary">Views contribution</p>
              <div className="relative mt-6 flex-grow">
                <Image src={map} alt="map" className="opacity-75 saturate-0" />
                <Chip label="🇺🇸 29%" position={[35, 10]} />
                <Chip label="🇬🇧 9%" position={[16, 40]} />
                <Chip label="🇩🇪 7.5%" position={[27, 47]} />
                <Chip label="🇧🇷 4.5%" position={[60, 25]} />
                <Chip label="🇮🇳 7%" position={[50, 65]} />
              </div>
            </div>
            <div className="col-span-2 row-span-1 space-y-2 rounded-xl border border-primary bg-tertiary p-6 md:col-span-3">
              <p className="text-secondary">Age</p>
              <div>
                <ProgressBar percentage={38} label="18-24" />
                <ProgressBar percentage={39} label="25-34" />
                <ProgressBar percentage={16} label="35-44" />
              </div>
            </div>
          </div>
          <p className="text-center text-xs text-tertiary">
            Analytics for the month of&nbsp;
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
            .<br></br>
            Additional data points available upon request.
          </p>
        </div>

        <div
          className="animate-in space-y-4"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2 className="text-secondary">Examples</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <Link
              className="group col-span-1 flex flex-col no-underline"
              href="https://youtu.be/hBk8Y4NOa4I?si=arYBMFvtfAVoKH7M&t=205"
            >
              <Image
                className="aspect-video w-full rounded-xl border border-primary bg-tertiary"
                src="https://i.ytimg.com/vi/hBk8Y4NOa4I/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDN-B-HhBDWZIFnkeYcKXLAlmWorQ"
                alt="thumbnail"
                width="2024"
                height="1272"
              />
              <p className="mt-2 font-medium leading-tight text-primary group-hover:underline">
                Mid-roll Integration
              </p>
              <p className="text-sm text-secondary">Akiflow App · 485k Views</p>
            </Link>
            <Link
              className="group col-span-1 flex flex-col no-underline"
              href="https://youtu.be/vrG7OGT4-q4?si=TEKBtZIzbfeVBdT8&t=356"
            >
              <Image
                className="aspect-video w-full rounded-xl border border-primary bg-tertiary"
                src="https://i.ytimg.com/vi/vrG7OGT4-q4/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLDJWIu8Wv2IFjyaqDh3-igWROsR8g"
                alt="thumbnail"
                width="2024"
                height="1272"
              />
              <p className="mt-2 font-medium leading-tight text-primary group-hover:underline">
                Mid-roll Integration
              </p>
              <p className="text-sm text-secondary">
                Athletic Greens · 157k Views
              </p>
            </Link>
            <Link
              className="group col-span-1 flex flex-col no-underline"
              href="https://youtu.be/Q9Qu-ddjDEE?si=OWR3TSIBUmIVwI4i&t=52"
            >
              <Image
                className="aspect-video w-full rounded-xl border border-primary bg-tertiary"
                src="https://i.ytimg.com/vi/Q9Qu-ddjDEE/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLCoVuAFRPvS-kzgaUWOG_KNN6RXkQ"
                alt="thumbnail"
                width="2024"
                height="1272"
              />
              <p className="mt-2 font-medium leading-tight text-primary group-hover:underline">
                Listicle Featured Product
              </p>
              <p className="text-sm text-secondary">Ergonofis · 156k Views</p>
            </Link>
            <Link
              className="group col-span-1 flex flex-col no-underline"
              href="https://youtu.be/Q9Qu-ddjDEE"
            >
              <Image
                className="aspect-video w-full rounded-xl border border-primary bg-tertiary"
                src="https://i.ytimg.com/vi/HvB61U1ENvM/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAoMN5khXnyaKGuqJId10ZCl_L9lg"
                alt="thumbnail"
                width="2024"
                height="1272"
              />
              <p className="mt-2 font-medium leading-tight text-primary group-hover:underline">
                Dedicated Video
              </p>
              <p className="text-sm text-secondary">
                XREAL AR · 8 minute video
              </p>
            </Link>
          </div>
        </div>
      </div>
      <Gradients />
    </div>
  );
}

const ProgressBar = ({
  percentage,
  label,
}: {
  percentage: number;
  label: string;
}) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="h-2 w-full rounded border border-primary bg-neutral-500/25">
          <div
            className="h-2 rounded bg-blue-500"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="w-[15%] whitespace-nowrap text-right text-secondary">
          {label}
        </p>
        <p className="w-[15%] whitespace-nowrap text-right text-lg font-bold">
          {percentage}
          <span className="text-sm">%</span>
        </p>
      </div>
    </>
  );
};

const Chip = ({
  label,
  position,
}: {
  label: string;
  position: Array<number>;
}) => {
  return (
    <span
      className="absolute z-20 rounded-full border border-primary bg-tertiary px-1.5 py-1 text-sm font-bold shadow contrast-125 drop-shadow-xl"
      style={{
        top: `${position[0]}%`,
        left: `${position[1]}%`,
      }}
    >
      <span className="contrast-75">{label}</span>
    </span>
  );
};

const Gradients = () => {
  return (
    <>
      <div
        className="absolute inset-x-0 top-[15%] z-0 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 sm:left-[calc(50%)] sm:w-[72.1875rem] md:rotate-[30deg] md:opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute inset-x-0 top-[60%] z-0 transform-gpu overflow-hidden blur-3xl md:hidden"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(60%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[270deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </>
  );
};
