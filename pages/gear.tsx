import Image, { StaticImageData } from "next/image";

import Logi from "public/gear/logi.jpeg";
import Copilot from "public/gear/copilot.jpeg";

import Warning from "components/warning";

interface ItemProps {
  title: string;
  description: string;
  image: string | StaticImageData;
  link: string;
  sponsored?: boolean;
}

const Item = ({ title, description, image, link, sponsored }: ItemProps) => (
  <li className="flex gap-4 items-center">
    <div className="relative rounded-xl overflow-hidden bg-tertiary aspect-square w-[4rem] min-w-[4rem] h-[4rem]">
      <Image
        src={image}
        alt={title}
        className="relative object-center object-cover w-full h-full z-0"
        fill
      />
      <div className="z-10 relative w-full h-full shadow-[inset_0_0px_4px_0_rgba(0,0,0,.15)] rounded-xl "></div>
    </div>
    <div className="grow flex justify-between gap-2 items-center">
      <div className="space-y-1">
        <h3 className="text-primary line-clamp-2 leading-tight">{title}</h3>
        <p className="text-secondary line-clamp-2 leading-tight text-sm">
          {description}
        </p>
      </div>
      <div>
        <a
          className="ml-auto text-sm rounded-full px-4 py-1 bg-secondary h-fit"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get
        </a>
        {sponsored && (
          <p className="mt-1 text-center text-xs text-tertiary">Sponsored</p>
        )}
      </div>
    </div>
  </li>
);

export default function Gear() {
  const categories = gear.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, [] as string[]);

  return (
    <>
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-8 animate-in">
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              Gear
            </h1>
            <p
              className="animate-in text-secondary"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              My toolbox.
            </p>
          </div>
          <div
            className="-mt-7 animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            <Warning type="info">
              <p className="text-secondary">
                This is a list of the gear I actually own and recommend. The
                affiliate links come at no extra cost but it does however help
                support my content creation!
              </p>
            </Warning>
          </div>
        </div>

        {categories.map((category, index) => (
          <section
            className="flex flex-col gap-8 animate-in"
            key={index}
            style={{ "--index": 3 } as React.CSSProperties}
          >
            <h2 className="text-secondary">{category}</h2>
            <ul className="grid md:grid-cols-2 gap-x-6 gap-y-8 animated-list">
              {gear.map((item, index) => {
                if (item.category === category) {
                  return (
                    <Item
                      key={index}
                      title={item.name}
                      description={item.description}
                      image={item.image}
                      link={item.link}
                      sponsored={item.sponsored}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

const gear = [
  {
    name: "Copilot Money",
    category: "Software",
    image: Copilot,
    description: "Budgeting App, I use it to track my spending.",
    link: "https://copilot.money/",
    sponsored: true,
  },
  {
    name: "Duolingo - Language Lessons",
    category: "Software",
    image: Copilot,
    description: "Budgeting App, I use it to track my spending.",
    link: "https://copilot.money/",
    sponsored: true,
  },
  {
    name: "Orbitkey Desk Mat",
    category: "Desk Setup",
    image: "https://m.media-amazon.com/images/I/61Du63bfnlL._AC_SL1500_.jpg",
    description:
      "Leather and Recycled PET Felt | Document Hideaway | Magnetic Cable Holder",
    link: "https://amzn.to/3Dm37eu",
    sponsored: false,
  },
  {
    name: "Glorious GMMK Pro",
    category: "Desk Setup",
    image: "https://m.media-amazon.com/images/I/71Nk1Qb3PhS._AC_SL1500_.jpg",
    description: "A 75% mechanical keyboard",
    link: "https://amzn.to/3U9tcE9",
  },
  {
    name: "Glorious Coiled Cables",
    category: "Desk Setup",
    image: "https://m.media-amazon.com/images/I/71lpNM41jVS._AC_SL1500_.jpg",
    description: "USB-C Artisan Braided, Mechanical Keyboards",
    link: "https://amzn.to/3NSznKR",
  },
  {
    name: "Logitech MX Master 3S Mouse",
    category: "Desk Setup",
    image: Logi,
    description:
      "Ergonomic and comfortable to be used for all day use, love the scrolling!",
    link: "https://amzn.to/3U5syHG",
  },
  {
    name: "BenQ ScreenBar Monitor Light",
    category: "Desk Setup",
    image: "https://m.media-amazon.com/images/I/71FpP6myfPL._AC_SL1500_.jpg",
    description:
      "Enhances immersion and focus, creates a comfortable environment",
    link: "https://amzn.to/3fUAfCi",
  },
  {
    name: "Anker USB-C Hub",
    category: "Desk Setup",
    image: "https://m.media-amazon.com/images/I/61thMtrP5rL._AC_SL1500_.jpg",
    description: "The one cable solution for my MacBook Pro.",
    link: "https://amzn.to/3Dk9vCV",
  },
  {
    name: "LG 34WN780 Monitor",
    category: "Desk Setup",
    image: "https://m.media-amazon.com/images/I/81ewD+orLSL._AC_SL1500_.jpg",
    description: "A 3440 x 1440 IPS Display, great for multitasking.",
    link: "https://amzn.to/3DJd86G",
  },
  {
    name: "Nikon Z6 Full Frame Mirrorless",
    category: "Camera Gear",
    image: "https://m.media-amazon.com/images/I/61h9UPZ40TL._AC_SL1000_.jpg",
    description: "Love the Z6 because it's great for photos and videos.",
    link: "https://amzn.to/3T1CvGa",
  },
  {
    name: "Nikon NIKKOR Z 28mm f/2.8",
    category: "Camera Gear",
    image:
      "https://ik.imagekit.io/kit/products/e4/bb/nikkor-z-28mm-f-2-8-e4bbd44f78ee3423c2db3a13f117e0e8.png?tr=dpr-1,cm-pad_resize,bg-FFFFFF,q-80,w-270,h-270",
    description: "My main for walking around, with very useful aperture.",
    link: "https://amzn.to/3To5UdA",
  },
  {
    name: "NIKON NIKKOR Z 50mm f/1.8 S",
    category: "Camera Gear",
    image: "https://m.media-amazon.com/images/I/61u8mYpACQL._AC_SL1500_.jpg",
    description: "One of my main sit down lenses, with awesome bokeh.",

    link: "https://amzn.to/3yEqnmj",
  },
  {
    name: "GoPro HERO10 Black action camera",
    category: "Camera Gear",
    image: "https://m.media-amazon.com/images/I/61p2fYdYP+L._AC_SX679_.jpg",
    description: "Awesome for action video, I use it for my POV shots.",
    link: "https://amzn.to/3exkZuq",
  },

  {
    name: "Suptig Chest Mount for GoPro",
    category: "Camera Gear",
    image: "https://m.media-amazon.com/images/I/81y-UqVnYAL._AC_SL1500_.jpg",
    description: "This is how I record my bike rides :)",
    link: "https://amzn.to/3DonSG9",
  },
  {
    name: "Movo VXR10-PRO",
    category: "Camera Gear",
    image: "https://m.media-amazon.com/images/I/71CUGiUL2dL._AC_SL1500_.jpg",
    description: "Compact Shotgun Mic Compatible with Cameras and phones.",
    link: "https://amzn.to/3EjYzH7",
  },
  {
    name: "Movo LV1-USB Lavalier Microphone",
    category: "Camera Gear",
    image: "https://m.media-amazon.com/images/I/61eFtjXUWkL._AC_SL1500_.jpg",
    description: "Lapel Microphone, Lav Mic, Clip on Microphone",
    link: "https://amzn.to/3WQ1nDe",
  },
  {
    name: "ULANZI Camera Tripod",
    category: "Camera Gear",
    image: "https://m.media-amazon.com/images/I/61FTKuvhBeL._AC_SL1500_.jpg",
    description: "Mini Flexible Tripod Stand, Universal use",
    link: "https://amzn.to/3Elzw6G",
  },
  {
    name: "Brevite Backpack",
    category: "Other",
    image: "https://m.media-amazon.com/images/I/61kuICMElAL._AC_SL1500_.jpg",
    description: "Compact Camera Backpack - A Minimalist & Travel-friendly",
    link: "https://amzn.to/3U5PTJo",
  },
];
