"use client";
import { TbCloudExclamation, TbCloudX, TbCloudCheck } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import useSWR from "swr";
import Image from "next/image";

import fetcher from "@/lib/fetcher";

import { useLang } from "@/components/LanguageProvider";
import {
  deployments,
  deploymentsTranslations,
} from "@/translations/deploymentsTranslations";

interface ItemProps {
  title: string;
  description: { [key: string]: string };
  status: string;
  image: string;
  githubLink: string;
  lang: string;
}

function GetStatus(url: string) {
  const { data: statusData, error: statusDataError } = useSWR(
    `/api/getStatus?url=${url}`,
    fetcher
  );
  if (statusDataError) return "offline";
  return "online";
}

const Item = ({
  title,
  description,
  status,
  image,
  githubLink,
  lang,
}: ItemProps) => {
  let statusColor = "bg-amber-400";
  let StatusIcon = TbCloudX;

  if (status === "online") {
    statusColor = "bg-green-400";
    StatusIcon = TbCloudCheck;
  } else if (status === "offline") {
    statusColor = "bg-red-400";
    StatusIcon = TbCloudExclamation;
  }

  return (
    <li className="flex gap-3 items-center transition-opacity">
      <a
        className="flex-none relative rounded-xl overflow-hidden bg-tertiary aspect-square w-[4rem] min-w-[4rem] h-[4rem] shadow"
        href={githubLink}
        target="_blank"
      >
        <Image
          src={image ? image : "/deployments/basicPicture.svg"}
          alt={title}
          className="object-center object-cover w-full h-full"
          fill
        />
      </a>
      <div className="flex gap-3 items-center">
        <div className="flex-auto w-[30rem] min-w-[8rem]">
          <h3 className="text-primary line-clamp-2 leading-tight font-medium">
            {title}
          </h3>
          <p className="text-secondary line-clamp-3 leading-tight text-sm">
            {description[lang]}
          </p>
        </div>
        <div className="flex-auto">
          <a className={`text-xl rounded-full px-4 py-1 ${statusColor} h-fit`}>
            {StatusIcon && (
              <StatusIcon className="inline mt-[-0.25em] h-[1.25em] w-[1.25em]" />
            )}
          </a>
        </div>
        <div className="flex-auto">
          <a
            className="text-sm px-4 py-1 h-fit"
            href={githubLink}
            target="_blank"
          >
            <FaGithub className="inline h-[2em] w-[2em]" />
          </a>
        </div>
      </div>
    </li>
  );
};

export default function Deployments() {
  const { lang } = useLang();
  const text = deploymentsTranslations[lang];

  deployments.forEach((deployment) => {
    if (deployment.statusLink) {
      deployment.status = GetStatus(deployment.statusLink);
    }
  });
  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-8 animate-in">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              {text.title}
            </h1>
            <p
              className="animate-in text-secondary"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              {text.subTitle}
            </p>
          </div>
          <p
            className="max-w-lg animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            {text.description}
          </p>
        </div>
        <section
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <ul className="grid md:grid-cols-1 gap-x-6 gap-y-8 animated-list">
            {deployments.map((item, index) => {
              return (
                <Item
                  key={index}
                  title={item.name}
                  description={item.description}
                  status={item.status ? item.status : "unuploaded"}
                  image={item.image}
                  githubLink={item.githubLink}
                  lang={lang}
                />
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}
