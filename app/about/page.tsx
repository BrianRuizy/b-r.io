import Image from "next/image";
import { Metadata } from "next";

import Link from "@/app/components/Link";
import Section from "@/app/components/Section";
import ConnectLinks from "@/app/components/ConnectLinks";
import Workplaces from "@/app/about/components/Workplaces";
import Gallery from "@/app/about/components/Gallery";

import hinesLogo from "public/work/hines-logo.jpeg";
import perishipLogo from "public/work/periship-logo.jpeg";
import camsLogo from "public/work/cams-logo.png";
import uhdLogo from "public/work/uhd.png";

import colorado from "public/gallery/colorado.jpg";
import NYC from "public/gallery/nyc.jpg";
import Greeting from "./components/Greeting";

async function getYoutubeStats() {
  try {
    const response = await fetch(
      `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"}/api/youtube`,
      {
        next: { revalidate: 86400 }, // 24 hours
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return parseInt(data.subscribers) || 0;
  } catch (error) {
    console.error("Error fetching YouTube stats:", error);
    return 81600; // Use your current subscriber count as fallback
  }
}

export const metadata: Metadata = {
  title: "About | Brian Ruiz",
  description:
    "New York City based Software Engineer and a Content Creator, sharing insights on well-designed products and technology advancements.",
};

export default async function About() {
  const subscribers = await getYoutubeStats();

  // Format the number only once
  const formattedSubscribers = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: 3,
  }).format(subscribers);

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div>
        <h1 className="animate-in text-3xl font-bold tracking-tight text-primary">
          About
        </h1>
        <p
          className="animate-in text-secondary"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          A glimpse into me.
        </p>
      </div>
      <div className="mb-8 md:hidden">
        <div
          className="animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <Image
            src={NYC}
            alt={"me and lily"}
            width={324}
            height={139}
            className="pointer-events-none relative inset-0 h-52 w-60 -rotate-6 rounded-xl bg-neutral-400 object-cover object-right shadow-md"
            priority
          />
        </div>

        <div
          className="animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Image
            src={colorado}
            alt={"Downtown New York"}
            width={220}
            height={260}
            className="pointer-events-none absolute inset-0 -top-44 left-[40%] w-48 rotate-6 rounded-xl bg-neutral-400 object-cover shadow-md md:left-[60%] md:w-56"
            priority
          />
        </div>
      </div>
      <div className="hidden md:block">
        <Gallery />
      </div>
      <div
        className="flex animate-in flex-col gap-16 md:gap-24"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <Section heading="About" headingAlignment="left">
          <div className="flex flex-col gap-6">
            <p>
              <Greeting /> I&apos;m Brian Ruiz! Originally from Honduras,
              I&apos;m now based in the vibrant place that is New York City.
            </p>
            <p>
              My curiosity for computers began at age 10, which naturally led me
              to pursue a career in tech. I&apos;ve been working as a software
              engineer, specializing in full-stack development and design, for{" "}
              {new Date().getFullYear() - 2019} years now!
            </p>
            <p>
              Alongside my coding journey, I run a{" "}
              <Link
                className="underline"
                href="https://www.youtube.com/@brianruizy"
              >
                YouTube
              </Link>{" "}
              channel where I share insights on technology, productive coding
              vlogs, and occasionally practice my filmmaking skills.{" "}
              <span className="text-tertiary">
                ({formattedSubscribers} subscribers strong)
              </span>
            </p>
            <p>
              When I&apos;m not at my desk, you can find me at the gym, biking
              around the city on my e-bike, or enjoying some coffee at a local
              shop!
            </p>
          </div>
        </Section>
        <Section heading="Connect" headingAlignment="left">
          <ul className="animated-list grid flex-grow grid-cols-1 gap-3 md:grid-cols-2">
            {ConnectLinks.map((link) => (
              <li className="col-span-1 transition-opacity" key={link.label}>
                <Link
                  href={link.href}
                  className="inline-grid w-full rounded-lg bg-secondary p-4 no-underline transition-opacity "
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{link.icon}</span>
                    {link.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="ml-auto h-5 w-5 text-secondary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
        <Section heading="Work" headingAlignment="left">
          <div className="flex w-full flex-col gap-8">
            <p>
              I specialize in Python, data analytics, React, web development,
              UI/UX, and product design. But I am always learning new things.
              Here are some of the places I have worked.
            </p>
            <Workplaces items={workplaces} />
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplaces = [
  {
    title: "Senior Software Engineer",
    company: "Hines",
    date: "2022 -",
    imageSrc: hinesLogo,
    link: "https://hines.com",
  },
  {
    title: "Jr. Software Engineer",
    company: "PeriShip",
    date: "2021 - 2022",
    imageSrc: perishipLogo,
    link: "https://peripharma.com/",
  },
  {
    title: "Python Developer",
    company: "CAMS",
    date: "2019 - 2020",
    imageSrc: camsLogo,
    link: "https://camstex.com",
  },
  {
    title: "Coding Camp Teacher",
    company: "University of Houston",
    date: "2019",
    imageSrc: uhdLogo,
    link: "https://www.uhd.edu/",
  },
];
