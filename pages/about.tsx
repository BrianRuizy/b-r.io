import Image from "next/image";
import { NextSeo } from "next-seo";

import Link from "components/Link";
import Section from "components/Section";
import Workplaces from "components/Workplaces";
import Gallery from "components/Gallery";
// import { ActivityType } from "components/Activity";

// import bitrefillLogo from "public/projects/bitrefill-logo.png";
import tracklibLogo from "public/projects/tracklib-logo.png";
import styleroomLogo from "public/projects/styleroom-logo.png";
import trailroutesLogo from "public/projects/trailroutes-logo.png";
import hinesLogo from "public/projects/hines-logo.jpeg";
import perishipLogo from "public/projects/periship-logo.jpeg";
import camsLogo from "public/projects/cams-logo.png";
import uhdLogo from "public/projects/uhd.png";

import { FaYoutube, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import notionLogo from "public/projects/notion-logo.png";
import strengthLogo from "public/projects/strength-logo.png";
import avatar from "public/avatar.png";

import { getActivities, getActivity } from "lib/strava";

export const connectLinks = [
  { label: "Email", href: "mailto:samuelkraft@me.com", logo: notionLogo },
  { label: "Twitter", href: "https://twitter.com/samuelkraft" },
  { label: "GitHub", href: "https://github.com/samuelkraft" },
];

const workplaces = [
  {
    title: "Full Stack Engineer",
    description: "Hines",
    time: "2022 -",
    imageSrc: hinesLogo,
    link: "https://hines.com",
  },
  {
    title: "Software Engineer",
    description: "PeriShip",
    time: "2021 - 2022",
    imageSrc: perishipLogo,
    link: "https://peripharma.com/",
  },
  {
    title: "Python Developer",
    description: "CAMS",
    time: "2019 - 2020",
    imageSrc: camsLogo,
    link: "https://camstex.com",
  },
  {
    title: "Coding Camp Instructor",
    description: "University of Houston",
    time: "2019",
    imageSrc: uhdLogo,
    link: "https://www.uhd.edu/",
  },
];

const sideProjects = [
  {
    title: "Trail Routes",
    description: "Mapping platform built with react, mapbox, swiftUI",
    imageSrc: trailroutesLogo,
    link: "https://github.com/samuelkraft/routes",
  },
  {
    title: "notion-blog-nextjs",
    description: "Next.js starter repo with a blog powered by Notion",
    imageSrc: notionLogo,
    link: "https://github.com/samuelkraft/notion-blog-nextjs",
  },
  {
    title: "Strength",
    description: "iOS & WatchOS strength tracking app",
    imageSrc: strengthLogo,
    link: "https://samuelkraft.github.io/strength/",
  },
  {
    title: "samuelkraft-next",
    description: "The website you are looking at!",
    imageSrc: avatar,
    link: "https://github.com/samuelkraft/samuelkraft-next",
  },
];

const seoTitle = "About | Samuel Kraft";
const seoDesc =
  "A designer/frontend developer hybrid that loves to build great products with delightful interfaces.";

export default function About({
  // lastActivity,
}: {
  // lastActivity: ActivityType;
}) {
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDesc}
        openGraph={{
          title: seoTitle,
          description: seoDesc,
          url: `https://samuelkraft.com/about/`,
          site_name: "Samuel Kraft",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className="flex flex-col gap-16 md:gap-24">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight">About Me</h1>
          {/* <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            A bit about me
          </p> */}
        </div>
        <div className="">
          <Gallery />
        </div>
        <div
          className="flex flex-col gap-16 animate-in sm:animate-none md:gap-24"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Section heading="About" headingAlignment="left">
            <div className="flex flex-col gap-6">
              <p>
              Hello world, I'm Brian Ruiz! 
              
              
              </p>

              <p>
              I'm a full stack engineer currently working at <a className="underline" href="https://hines.com" target="__blank">Hines</a>
                , one of the largest private real estate investors in the world. I have a passion for design and am always looking for ways to incorporate it into my work. 

              </p>
              <p>
              In addition to coding, I also make <a className="underline" href="https://www.youtube.com/channel/UCZ8J2J2QZ8ZQZ8ZQZ8ZQZ8Q" target="__blank">YouTube</a> videos, where I focus on tech, creative vlogs, and personal development. Try finding me anywhere else at @brianruizy

              </p>
            </div>
            
          </Section>

          <Section heading="Connect" headingAlignment="left">
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-2 animated-list">
                {connectLinks.map((link) => (
                  <div className="transition-opacity w-full border rounded-lg p-4 col-span-1 border-primary" key={link.label}>
                    <Link href={link.href}>{link.label}</Link>
                  </div>
                ))}
              </div>
          </Section>

          <Section heading="Work" headingAlignment="left">
            <div className="flex flex-col w-full gap-8">
              <p>
                {new Date().getFullYear() - 2019}+ years of dev experience.
              </p>
              <Workplaces items={workplaces} />
            </div>
          </Section>
          {/* <Section heading="Side projects" headingAlignment="left">
            <div className="flex flex-col w-full gap-8">
              <p>I enjoy hacking on the side.</p>
              <Workplaces items={sideProjects} />
            </div>
          </Section> */}
        </div>
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   const activities: ActivityType[] = await getActivities();
//   const lastNonVirtualActivityWithPhoto = activities
//     .filter((activity) =>
//       ["Run", "TrailRun", "Bike", "Swim", "Hike"].includes(activity.sport_type)
//     )
//     .find((activity) => activity.total_photo_count > 0);
//   const activity = await getActivity(
//     lastNonVirtualActivityWithPhoto?.id as number
//   );
//   return {
//     props: {
//       lastActivity: activity,
//     },
//     revalidate: 3600,
//   };
// };
