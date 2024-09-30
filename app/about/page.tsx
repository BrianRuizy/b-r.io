"use client";
import Image from "next/image";

import Link from "@/components/ui/Link";
import Section from "@/components/Section";
import ConnectLinks from "../../components/ConnectLinks";
import Workplaces from "./components/Workplaces";
import Gallery from "./components/Gallery";

import hacksisLogo from "public/work/hacksis-logo.svg";
import soprasteriaLogo from "public/work/sopra-steria-logo.svg";
import arcosLogo from "public/work/arcos-logo.svg";
import motorcycle from "public/gallery/moto.svg";
import fpv from "public/gallery/fpv.svg";

import { useLang } from "@/components/LanguageProvider";
import { aboutTranslations } from "@/translations/aboutTranslations";

export default function About() {
  const { lang } = useLang();
  const text = aboutTranslations[lang];
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div>
        <h1 className="animate-in text-3xl font-bold tracking-tight">
          {text.title}
        </h1>
        <p
          className="text-secondary animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          {text.subTitle}
        </p>
      </div>
      <div className="lg:hidden mb-8">
        <div
          className="animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <Image
            src={fpv}
            alt={"fpv"}
            width={324}
            height={139}
            className="relative h-60 inset-0 object-cover bg-gray-400 shadow-md pointer-events-none rounded-2xl -rotate-6"
            priority
          />
        </div>

        <div
          className="animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <Image
            src={motorcycle}
            alt={"motorcycle"}
            width={220}
            height={260}
            className="absolute w-48 inset-0 object-cover bg-gray-400 shadow-md pointer-events-none rounded-2xl rotate-6 left-[45%] md:left-[60%] md:w-56 -top-48"
            priority
          />
        </div>
      </div>
      <div className="hidden lg:block">
        <Gallery />
      </div>
      <div
        className="flex flex-col gap-16 animate-in md:gap-24"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <Section heading={text.firstParagraphTitle} headingAlignment="left">
          <div className="flex flex-col gap-6">
            <p>{text.firstParagraphContentOne}</p>

            <p>
            {text.firstParagraphContentTwo}
            </p>
            <p>
            {text.firstParagraphContentThree}
            </p>
          </div>
        </Section>

        <Section heading={text.secondParagraphTitle} headingAlignment="left">
          <div className="flex flex-col w-full gap-8">
            <p>
              {text.secondParagraphContent} {" "}
              <a href="mailto:contact@o-d.me" className="underline">
                {text.secondParagraphLinkMail}
              </a>
            </p>
            <ul className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-2 animated-list">
              {ConnectLinks.map((link) => (
                <li className="transition-opacity col-span-1" key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-opacity no-underline w-full border rounded-lg p-4 border-primary inline-grid"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{link.icon}</span>
                      {link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 ml-auto text-secondary"
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
          </div>
        </Section>

        <Section heading={text.thirdParagraphTitle} headingAlignment="left">
          <div className="flex flex-col w-full gap-8">
            <p>
              {new Date().getFullYear() - 2020}+ {text.thirdParagraphContentOne}
            </p>
            <p>
              {text.thirdParagraphContentTwoDotOne} {" "} {text.thirdParagraphContentTwoDotTwo}
            </p>
            <Workplaces items={workplacesByLanguage} language={lang} />
            <p>
              * {text.asterix}
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}

const workplacesByLanguage = {
  "FR": [
    {
      title: "Développeur Full Stack",
      company: "Hacksis",
      time: "Janv. 2023 - Maintenant",
      imageSrc: hacksisLogo,
      link: "https://hacksis.dev/",
    },
    {
      title: "Développeur Java",
      company: "Sopra Steria",
      time: "Sept. 2023 - Janv.2024",
      imageSrc: soprasteriaLogo,
      link: "https://www.soprasteria.fr/",
    },
    {
      title: "Développeur Full Stack *",
      company: "Sopra Steria",
      time: "Sept. 2021 - Sept. 2023",
      imageSrc: soprasteriaLogo,
      link: "https://www.soprasteria.fr/",
    },
    {
      title: "Développeur Full Stack *",
      company: "ARCOS",
      time: "Juin 2020 - Sept. 2021",
      imageSrc: arcosLogo,
      link: "https://arcos-recouvrement.com/",
    },
  ],
  "EN": [
    {
      title: "Full Stack Developer",
      company: "Hacksis",
      time: "Jan. 2023 - Now",
      imageSrc: hacksisLogo,
      link: "https://hacksis.dev/",
    },
    {
      title: "Java Developer",
      company: "Sopra Steria",
      time: "Sept. 2023 - Jan. 2024",
      imageSrc: soprasteriaLogo,
      link: "https://www.soprasteria.fr/",
    },
    {
      title: "Full Stack Developer *",
      company: "Sopra Steria",
      time: "Sept. 2021 - Sept. 2023",
      imageSrc: soprasteriaLogo,
      link: "https://www.soprasteria.fr/",
    },
    {
      title: "Full Stack Developer *",
      company: "ARCOS",
      time: "June 2020 - Sept. 2021",
      imageSrc: arcosLogo,
      link: "https://arcos-recouvrement.com/",
    },
  ]
};