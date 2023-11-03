import Image from "next/image";
import { Metadata } from "next";

import Link from "@/components/ui/Link";
import Section from "@/components/Section";
import ConnectLinks from "../../components/ConnectLinks";
import Workplaces from "./components/Workplaces";
import Gallery from "./components/Gallery";

import soprasteriaLogo from "public/work/sopra-steria-logo.jpg";
import arcosLogo from "public/work/arcos-logo.png";
import motorcycle from "public/gallery/moto.jpg";
import fpv from "public/gallery/fpv.png";

export const metadata: Metadata = {
  title: "À propos | Oscar Decloquement",
  description:
    "Je suis un développeur full-stack qui aime découvrir de nouvelles technologies.",
};

export default function About() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div>
        <h1 className="animate-in text-3xl font-bold tracking-tight">
          À propos de moi
        </h1>
        <p
          className="text-secondary animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          Un petit aperçu.
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
        <Section heading="À propos" headingAlignment="left">
          <div className="flex flex-col gap-6">
            <p>Bonjour, Je suis Decloquement Oscar !</p>

            <p>
              J&apos;ai une passion pour les nouvelles technologies et
              je suis toujours à la recherche de moyens de les intégrer dans mon travail.
            </p>
            <p>
              Quand je ne travail pas, je suis probablement en train de soulever des poids au crossfit,
              de courir avec mon chien ou en découverte d&apos;environement avec mon drone FPV et ma moto
            </p>
          </div>
        </Section>

        <Section heading="Réseaux" headingAlignment="left">
          <div className="flex flex-col w-full gap-8">
            <p>
              Vous avez une question ou souhaitez simplement discuter ? N&apos;hésitez pas à {" "}
              <a href="mailto:odecloquement@gmail.com" className="underline">
                m&apos;envoyer un email
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

        <Section heading="Travail" headingAlignment="left">
          <div className="flex flex-col w-full gap-8">
            <p>
              {new Date().getFullYear() - 2020}+ années d&apos;expérience en développement informatique (3 ans d&apos;alternance).
            </p>
            <p>
              J&apos;ai commencé ma carrière chez Arcos en autonomie.
              Ensuite, j&apos;ai travaillé chez Sopra Steria.
              Je suis maintenant un développeur et je travaille toujours chez {" "}
              <Link
                className="underline"
                href="https://www.soprasteria.fr/"
              >
                Sopra Steria
              </Link>
              , l&apos;une des plus grandes ESN Française..
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
    title: "Développeur Java",
    company: "Sopra Steria",
    time: "2023 -",
    imageSrc: soprasteriaLogo,
    link: "https://www.soprasteria.fr/",
  },
  {
    title: "Développeur Full Stack",
    company: "Sopra Steria",
    time: "2021 - 2023",
    imageSrc: soprasteriaLogo,
    link: "https://www.soprasteria.fr/",
  },
  {
    title: "Développeur Full Stack",
    company: "ARCOS",
    time: "2020 - 2021",
    imageSrc: arcosLogo,
    link: "https://arcos-recouvrement.com/",
  },
];