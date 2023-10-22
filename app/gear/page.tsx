import Image, { StaticImageData } from "next/image";
import { Metadata } from "next";

import Logi from "public/gear/logi.jpeg";
import Copilot from "public/gear/copilot.jpeg";
import Superhuman from "public/gear/superhuman.png";
import Sway from "public/gear/sway.png";
import shelf from "public/gear/shelf.png";
import cables from "public/gear/cables.png";
import Nikon from "public/gear/nikon.png";
import EpidemicSound from "public/gear/epidemic-sound.png";
import DJI from "public/gear/dji.png";

export const metadata: Metadata = {
  title: "Gear | Brian Ruiz",
  description:
    "My toolbox. This is gear I actually own and recommend.",
};

interface ItemProps {
  title: string;
  description: string;
  image: string | StaticImageData;
  link: string;
  sponsored?: boolean;
}

const Item = ({ title, description, image, link, sponsored }: ItemProps) => (
  <li className="flex gap-4 items-center transition-opacity">
    <a
      className="relative rounded-xl overflow-hidden bg-tertiary aspect-square w-[4rem] min-w-[4rem] h-[4rem] shadow"
      href={link}
      target="_blank"
    >
      <Image
        src={image}
        alt={title}
        className="object-center object-cover w-full h-full"
        fill
      />
    </a>
    <div className="grow flex justify-between gap-2 items-center">
      <div className="space-y-1">
        <h3 className="text-primary line-clamp-2 leading-tight font-medium">
          {title}
        </h3>
        <p className="text-secondary line-clamp-3 leading-tight text-sm">
          {description}
        </p>
      </div>
      <div>
        <a
          className="ml-auto text-sm rounded-full px-4 py-1 bg-secondary h-fit"
          href={link}
          target="_blank"
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

  categories.sort();

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
          <p
            className="max-w-lg animate-in"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            This is gear I actually own and recommend. The affiliate links come
            at no extra cost, but it does however help support my content
            creation.
          </p>
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
    name: "Sway Standing Desk",
    category: "Ergonofis",
    image: Sway,
    description: "The highest of quality and made to last. Solid wood.",
    link: "https://shrsl.com/49346",
    sponsored: true,
  },
  {
    name: "Desk Shelf",
    category: "Ergonofis",
    image: shelf,
    description: "Elevates your screen(s) to help position your neck in a comfortable ergonomic posture.",
    link: "https://shrsl.com/49342",
    sponsored: true,
  },
  {
    name: "Cable Management Solution",
    category: "Ergonofis",
    image: cables,
    description: "An essential for a clean clutter free desk.",
    link: "https://shrsl.com/4933x",
    sponsored: true,
  },
  {
    name: "Logitech MX Master Mouse",
    category: "Home Desk Setup",
    image: Logi,
    description:
      "Ergonomic and comfortable to be used for all day use, love the scrolling!",
    link: "https://amzn.to/3U5syHG",
  },
  {
    name: "Orbitkey Desk Mat",
    category: "Home Desk Setup",
    image: "https://m.media-amazon.com/images/I/61Du63bfnlL._AC_SL1500_.jpg",
    description:
      "Leather and Recycled PET Felt | Document Hideaway | Magnetic Cable Holder",
    link: "https://amzn.to/3Dm37eu",
    sponsored: false,
  },
  {
    name: "Glorious GMMK Pro",
    category: "Home Desk Setup",
    image: "https://m.media-amazon.com/images/I/71Nk1Qb3PhS._AC_SL1500_.jpg",
    description: "A 75% mechanical keyboard",
    link: "https://amzn.to/3U9tcE9",
  },
  {
    name: "Glorious Coiled Cables",
    category: "Home Desk Setup",
    image: "https://m.media-amazon.com/images/I/71lpNM41jVS._AC_SL1500_.jpg",
    description: "USB-C Artisan Braided, Mechanical Keyboards",
    link: "https://amzn.to/3NSznKR",
  },

  {
    name: "BenQ ScreenBar Monitor Light",
    category: "Home Desk Setup",
    image: "https://m.media-amazon.com/images/I/71FpP6myfPL._AC_SL1500_.jpg",
    description:
      "Enhances immersion and focus, creates a comfortable environment",
    link: "https://amzn.to/3fUAfCi",
  },
  {
    name: "Anker USB-C Hub",
    category: "Home Desk Setup",
    image: "https://m.media-amazon.com/images/I/61thMtrP5rL._AC_SL1500_.jpg",
    description: "The one cable solution for my MacBook Pro.",
    link: "https://amzn.to/3Dk9vCV",
  },
  {
    name: "LG 34WN780 Monitor",
    category: "Home Desk Setup",
    image: "https://m.media-amazon.com/images/I/81ewD+orLSL._AC_SL1500_.jpg",
    description: "A 3440 x 1440 IPS Display, great for multitasking.",
    link: "https://amzn.to/3DJd86G",
  },
  {
    name: "Nikon Z6 Full Frame Mirrorless",
    category: "Camera Gear",
    image: Nikon,
    description: "Love the Z6 because it's great for photos and videos.",
    link: "https://amzn.to/3T1CvGa",
  },
  {
    name: "Copilot Money",
    category: "Apps",
    image: Copilot,
    description:
      "'BRIANRUIZ', 2 months FREE. For all things personal finance, this is a must.",
    link: "https://copilot.money/link/cxkfRAoUGeybxipT7",
    sponsored: true,
  },
  {
    name: "Epidemic Sound",
    category: "Apps",
    image: EpidemicSound,
    description:
      "1 Month Free. This is where I get 95% of the music for my videos. Skip the hassle that is licensing.",
    link: "https://share.epidemicsound.com/j2d0ao",
    sponsored: true,
  },
  // {
  //   name: "Akiflow",
  //   category: "Software",
  //   image: Akiflow,
  //   description:
  //     "Ultimate time blocking platform. Personal task manager and calendar application",
  //   link: "http://bit.ly/3TRr6dq",
  //   sponsored: true,
  // },
  // {
  //   name: "Dex - Personal CRM",
  //   category: "Software",
  //   image: Dex,
  //   description: "Build stronger relationships",
  //   link: "https://getdex.com/s/brianruizy",
  //   sponsored: true,
  // },
  {
    name: "Superhuman Mail",
    category: "Apps",
    image: Superhuman,
    description: "1 Month FREE code. The fastest email experience.",
    link: "https://superhuman.com/refer/bspuaqpo",
  },
  {
    name: "Nikon Z 28mm f/2.8",
    category: "Camera Gear",
    image:
      "https://ik.imagekit.io/kit/products/e4/bb/nikkor-z-28mm-f-2-8-e4bbd44f78ee3423c2db3a13f117e0e8.png?tr=dpr-1,cm-pad_resize,bg-FFFFFF,q-80,w-270,h-270",
    description: "My main for walking around, with very useful aperture.",
    link: "https://amzn.to/3To5UdA",
  },
  {
    name: "NIKON Z 50mm f/1.8 S",
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
    description: "This is how I record my POV bike rides! :)",
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
  {
    name: "Mini 3 Pro Drone",
    category: "Other",
    image: DJI,
    description: "A great DJI drone for beginners, and a great vlogging tool.",
    link: "https://amzn.to/3mdZenf",
  },
  {
    name: "RS 3 Mini Gimbal",
    category: "Other",
    image: DJI,
    description: "small footprint and portable.",
    link: "https://amzn.to/40LPcJa",
  },
  {
    name: "HP DisplayLink Hub",
    category: "Office Desk Setup",
    image: "https://m.media-amazon.com/images/I/51Akvh02nDL._AC_SL1280_.jpg",
    description: "A hub that enables dual monitors on M1 MBP.",
    link: "https://amzn.to/3UnTbJo",
  },
  {
    name: "Dell UltraSharp U2722D",
    category: "Office Desk Setup",
    link: "https://amzn.to/3KLucN1",
    image: "https://m.media-amazon.com/images/I/81siJZnLDaL._AC_SL1500_.jpg",
    description: "A 27 inch 4K monitor",
  },
  {
    name: "VIVO Dual Monitor Stand",
    category: "Office Desk Setup",
    link: "https://amzn.to/40U0jzC",
    image: "https://m.media-amazon.com/images/I/61JPGtCI0GL._AC_SL1500_.jpg",
    description: "White articulating pneumatic monitor stand",
  },
  {
    name: "MacBook Pro M1 Pro 16-inch",
    category: "Apple",
    image: "https://m.media-amazon.com/images/I/61bwiPRcv2L._AC_SL1500_.jpg",
    description: "Daily driver. Sleek, great display, and performant.",
    link: "https://amzn.to/41fkhEH",
  },
  {
    name: "Apple AirPods Max",
    category: "Apple",
    image: "https://m.media-amazon.com/images/I/81OdA-ITspL._AC_SL1500_.jpg",
    description: "Active Noise Cancelling, Transparency Mode, Spatial Audio",
    link: "https://amzn.to/3mie64b",
  },
  {
    name: "Apple AirPods Pro",
    category: "Apple",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83_AV5?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803961739",
    description:
      "Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive Transparency.",
    link: "https://amzn.to/3UmMQhq",
  },
  {
    name: "Apple AirTag",
    category: "Apple",
    image: "https://m.media-amazon.com/images/I/81Lq1AfCYpS._AC_SL1500_.jpg",
    description: "Track your keys, wallet, backpack, and more.",
    link: "https://amzn.to/41dXoSa",
  },
  {
    name: "Apple MagSafe Charger",
    category: "Apple",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MHXH3_AV3?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1666381499607",
    description: "The MagSafe Charger delivers fast wireless charging.",
    link: "https://amzn.to/3UouXP4",
  },

  
];
