"use client";
import Image from "next/image";

import avatar from "public/avatar.png";
import map from "public/map.png";
import { FaYoutube } from "react-icons/fa";
import { SparklesIcon } from "@heroicons/react/20/solid";

import { YouTube } from "@/app//components/Stats";
import Link from "@/app/components/ui/Link";

import LG from "public/partners/lg.png";
import Ergon from "public/partners/ergon.webp";
import Brilliant from "public/partners/brilliant.png";

import * as Tabs from "@radix-ui/react-tabs";

export default function Mediakit() {
  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24">
        <div
          className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-secondary leading-none">Media Kit</h3>
            <h2 className="text-4xl font-bold tracking-tight whitespace-nowrap">
              Brian Ruiz
            </h2>
          </div>
          <div className="max-w-md md:max-w-sm w-fit flex flex-col gap-1">
            <div className="inline-flex items-center gap-2">
              <div className="relative">
                {/* youtube play fill  */}
                <span className="absolute top-2 left-2 w-1 z-10 bg-white p-1 rounded-full"></span>
                <FaYoutube className="relative text-2xl text-[#FF0000] z-20" />
              </div>
              <span className="font-semibold text-lg tracking-tighter">
                YouTube
              </span>
            </div>
            <p className="text-secondary text-sm">
              Creator based in Houston. Focuses on topics including consumer
              technology, software engineering, design, and lifestyle.{" "}
              <Link href="https://www.youtube.com/@brianruizy">
                Visit channel.
              </Link>
            </p>
          </div>
          <Image
            src={avatar}
            width={60}
            height={60}
            alt="avatar"
            className="rounded-full bg-tertiary order-first md:order-last"
          />
        </div>

        <Tabs.Root defaultValue="tab1" >
          <Tabs.List aria-label="tabs example">
            <Tabs.Trigger value="tab1">One</Tabs.Trigger>
            <Tabs.Trigger value="tab2">Two</Tabs.Trigger>
            <Tabs.Trigger value="tab3">Three</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Tab one content</Tabs.Content>
          <Tabs.Content value="tab2">Tab two content</Tabs.Content>
          <Tabs.Content value="tab3">Tab three content</Tabs.Content>
        </Tabs.Root>
        <div
          className="space-y-8 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            <h2 className="col-span-2 md:col-span-6 text-secondary">Content</h2>
            <div className="bg-tertiary rounded-xl border border-primary col-span-1 md:col-span-2 p-6 flex flex-col justify-center md:items-center">
              <p className="text-secondary">Subscribers</p>
              <h2 className="font-bold text-2xl text-primary">
                <YouTube />
              </h2>
            </div>
            <div className="bg-tertiary rounded-xl border border-primary col-span-1 md:col-span-2 p-6 flex flex-col justify-center md:items-center">
              <p className="text-secondary">Monthly Impressions</p>
              <h2 className="font-bold text-2xl text-primary">6.1M+</h2>
            </div>
            <div className="bg-tertiary rounded-xl border border-primary col-span-1 md:col-span-2 p-6 flex flex-col justify-center md:items-center">
              <p className="text-secondary">Monthly Views</p>
              <h2 className="font-bold text-2xl text-primary">387K+</h2>
            </div>
            <div className="md:hidden bg-tertiary rounded-xl border border-primary col-span-1 md:col-span-2 p-6 flex flex-col justify-center md:items-center">
              <p className="text-secondary">Average Views</p>
              <h2 className="font-bold text-2xl text-primary">247K*</h2>
            </div>
            <h2 className="col-span-2 md:col-span-6 text-secondary mt-4">
              Audience
            </h2>
            <div className="bg-tertiary rounded-xl border border-primary row-span-1 col-span-2 md:col-span-3 p-6 space-y-2">
              <p className="text-secondary">Gender</p>
              <div>
                <ProgressBar percentage={89} label="Male" />
                <ProgressBar percentage={11} label="Fem." />
              </div>
            </div>
            <div className="bg-tertiary rounded-xl border border-primary row-span-2 col-span-2 md:col-span-3 pt-6 text-center overflow-clip order-last md:order-none">
              <p className="text-primary font-bold">Top Geographies</p>
              <p className="text-secondary">Views contribution</p>
              <div className="flex-grow mt-6 relative">
                <Image src={map} alt="map" className="saturate-0 opacity-75" />
                <Chip label="🇺🇸 31%" position={[35, 10]} />
                <Chip label="🇬🇧 9%" position={[16, 40]} />
                <Chip label="🇩🇪 7.5%" position={[27, 47]} />
                <Chip label="🇧🇷 4.5%" position={[60, 25]} />
                <Chip label="🇮🇳 7%" position={[50, 65]} />
              </div>
            </div>
            <div className="bg-tertiary rounded-xl border border-primary row-span-1 col-span-2 md:col-span-3 p-6 space-y-2">
              <p className="text-secondary">Age</p>
              <div>
                <ProgressBar percentage={38} label="18-24" />
                <ProgressBar percentage={39} label="25-34" />
                <ProgressBar percentage={16} label="35-44" />
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-primary opacity-30">
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
          className="space-y-4 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2 className="text-secondary">Examples</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link
              className="col-span-1 flex flex-col no-underline group"
              href="https://youtu.be/hBk8Y4NOa4I"
            >
              <Image
                className="bg-tertiary border border-primary w-full aspect-video rounded-xl"
                src="https://i9.ytimg.com/vi/hBk8Y4NOa4I/mqdefault.jpg?v=64d29fa3&sqp=CIi4u6kG&rs=AOn4CLBsRYBx4xsYTQY8nzknFK8mgLja6g"
                alt="thumbnail"
                width="2024"
                height="1272"
              />
              <p className="mt-2 text-primary font-medium group-hover:underline">
                Mid-roll Integration
              </p>
              <p className="text-secondary text-sm">
                Akiflow App &bull; 400k Views
              </p>
            </Link>
            <Link
              className="col-span-1 flex flex-col no-underline group"
              href="https://youtu.be/vrG7OGT4-q4"
            >
              <Image
                className="bg-tertiary border border-primary w-full aspect-video rounded-xl"
                src="https://i9.ytimg.com/vi/vrG7OGT4-q4/mqdefault.jpg?v=64e647fa&sqp=CIy_u6kG&rs=AOn4CLCHzDUHKMy-6y3XAImo7GBHpUZzhQ"
                alt="thumbnail"
                width="2024"
                height="1272"
              />
              <p className="mt-2 text-primary font-medium group-hover:underline">
                Mid-roll Integration
              </p>
              <p className="text-secondary text-sm">
                Athletic Greens &bull; 150k Views
              </p>
            </Link>
            <Link
              className="col-span-1 flex flex-col no-underline group"
              href="https://youtu.be/Q9Qu-ddjDEE"
            >
              <Image
                className="bg-tertiary border border-primary w-full aspect-video rounded-xl"
                src="https://i9.ytimg.com/vi_webp/Q9Qu-ddjDEE/mqdefault.webp?v=651ce70f&sqp=CLS6u6kG&rs=AOn4CLDqd-C8QyL-dZ-AuBfnFGvkNRmmlw"
                alt="thumbnail"
                width="2024"
                height="1272"
              />
              <p className="mt-2 text-primary font-medium group-hover:underline">
                Listicle Featured Product
              </p>
              <p className="text-secondary text-sm">
                Ergonofis &bull; 120k Views
              </p>
            </Link>
            <Link
              className="col-span-1 flex flex-col no-underline group"
              href="https://youtu.be/Q9Qu-ddjDEE"
            >
              <Image
                className="bg-tertiary border border-primary w-full aspect-video rounded-xl"
                src="https://i9.ytimg.com/vi/HvB61U1ENvM/mqdefault.jpg?v=64e68492&sqp=COC8u6kG&rs=AOn4CLB29afL-sNLfE9IyT3hXKeFY6gJvw"
                alt="thumbnail"
                width="2024"
                height="1272"
              />
              <p className="mt-2 text-primary font-medium group-hover:underline">
                Dedicated Video
              </p>
              <p className="text-secondary text-sm">
                XREAL AR &bull; 8 minute video
              </p>
            </Link>
          </div>
        </div>

        {/* <div
          className="space-y-12 animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <div className="flex justify-between items-center">
            <h2 className="col-span-2 md:col-span-6 text-secondary">
              Partners
            </h2>
            <div className="relative bg-tertiary backdrop-blur rounded-xl border border-primary px-4 py-1 text-sm leading-6 text-gray-600 flex items-center gap-2">
              <SparklesIcon className="w-4 h-4 text-sky-500" />
              <p className="text-secondary">
                Trusted by 20+ awesome teams and brands!
              </p>
            </div>
          </div>

          <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
            <div className="bg-gray-400/5 py-2 px-2 sm:p-10">
            <Image src={LG} alt="LG" className="max-h-8 w-full object-contain" />
            </div>
            <div className="bg-gray-400/5 py-2 px-2 sm:p-10">
            <Image src={Ergon} alt="Ergonofis" className="invert max-h-8 w-full object-contain"/>
            </div>
            <div className="bg-gray-400/5 py-2 px-2 sm:p-10">
            <Image src={Brilliant} alt="Brilliant" className="max-h-8 w-full object-contain"/>
            </div>
            <div className="bg-gray-400/5 py-2 px-2 sm:p-10">
              <img
                className="max-h-8 w-full object-contain"
                src="https://tailwindui.com/img/logos/158x48/laravel-logo-gray-900.svg"
                alt="Laravel"
                width={158}
                height={48}
              />
            </div>
            <div className="bg-gray-400/5 py-2 px-2 sm:p-10">
              <img
                className="max-h-8 w-full object-contain"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
            </div>
            <div className="bg-gray-400/5 py-2 px-2 sm:p-10">
              <img
                className="max-h-8 w-full object-contain"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
        </div> */}
      </div>
      <Gradients />
    </>
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
    <div>
      <div className="flex justify-between gap-4 items-center">
        <div className="w-full bg-neutral-500/25 rounded h-2 border border-primary">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="whitespace-nowrap text-secondary text-right w-[15%]">
          {label}
        </p>
        <p className="whitespace-nowrap font-bold text-lg text-right w-[15%]">
          {percentage}
          <span className="text-sm">%</span>
        </p>
      </div>
    </div>
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
      className="absolute text-sm font-bold z-20 bg-tertiary px-1.5 py-1 rounded-full shadow drop-shadow-xl border border-primary contrast-125"
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
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 md:rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-40 md:opacity-20 sm:left-[calc(50%)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="md:hidden absolute inset-x-0 top-[130%] z-0 transform-gpu overflow-hidden blur-3xl"
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
