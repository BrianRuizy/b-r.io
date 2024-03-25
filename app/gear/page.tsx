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
  {
    name: "Superhuman Mail",
    category: "Apps",
    image: Superhuman,
    description: "1 Month FREE code. The fastest email experience.",
    link: "https://superhuman.com/refer/bspuaqpo",
  },
  
  {
    name: "Sony FX3", 
    category: "Camera Setup (Video)",
    image: "https://m.media-amazon.com/images/I/81lVg8e3bHL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    description: "Dream camera, 4k 10bit, built-in cooling, and great low light performance.",
    link: "https://amzn.to/3TR2lzz",
  },
  {
    name: "Sony 16-35mm f/2.8 GM",
    category: "Camera Setup (Video)",
    description: "Super versatile and high quality lens.",
    image: "https://m.media-amazon.com/images/I/71i0q2J-iEL._AC_SL1500_.jpg",
    link: "https://amzn.to/3TABciO",
  },
  {
    name: "Sennheiser MKE 600",
    category: "Camera Setup (Video)",
    image: "https://m.media-amazon.com/images/I/51tVQAKlvJL._AC_SL1200_.jpg",
    description: "My go-to XLR shotgun microphone for my videos and voice-overs.",
    link: "https://amzn.to/3Dm3z1m",
  },

  {
    name: "Peak Design Carbon Fiber Tripod",
    category: "Camera Setup (Video)",
    description: "Compact, lightweight, and sturdy.",
    image: "https://m.media-amazon.com/images/I/818QVv6AzPL._AC_SL1500_.jpg",
    link: "https://amzn.to/43CoF31",
  },
  {
    name: "GoPro HERO10 Black action camera",
    category: "Camera Setup (Video)",
    image: "https://m.media-amazon.com/images/I/61p2fYdYP+L._AC_SX679_.jpg",
    description: "Awesome for action video, I use it for my POV shots.",
    link: "https://amzn.to/3exkZuq",
  },
  {
    name: "Sony a7C II",
    category: "Camera Setup (Photo)",
    description: "Compact lightweight full-frame camera, flip screen, 4k, 33MP, b-roll camera.",
    image: "https://m.media-amazon.com/images/I/61O5jFfqbSL._AC_SL1000_.jpg",
    link: "https://amzn.to/3TQbJmO",
  },
  {
    name: "Sony 35mm f/1.8",
    category: "Camera Setup (Photo)",
    description: "Fast aperture, and lightweight. Great for portraits, street photography, and low light.",
    image: "https://m.media-amazon.com/images/I/71umwsH8NJL._AC_SL1500_.jpg",
    link: "https://amzn.to/43wiXj6",
  },
  {
    name: "Suptig Chest Mount for GoPro",
    category: "Other",
    image: "https://m.media-amazon.com/images/I/81y-UqVnYAL._AC_SL1500_.jpg",
    description: "This is how I record my POV bike rides! :)",
    link: "https://amzn.to/3DonSG9",
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
