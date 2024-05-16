import Image, { StaticImageData } from "next/image";
import { Metadata } from "next";

import Copilot from "public/gear/copilot.jpeg";
import Superhuman from "public/gear/superhuman.png";
import Sway from "public/gear/sway.png";
import shelf from "public/gear/shelf.png";
import cables from "public/gear/cables.png";
import EpidemicSound from "public/gear/epidemic-sound.png";
import Keyboard from "public/gear/keeb.jpeg";
import Macrofactor from "public/gear/macrofactor.webp";

export const metadata: Metadata = {
  title: "Gear | Brian Ruiz",
  description: "My toolbox. This is gear I actually own and recommend.",
  openGraph: {
    title: "Gear | Brian Ruiz",
    description: "My toolbox. This is gear I actually own and recommend.",
    type: "website",
    url: "https://b-r.io/blog/gear",
    images: [{ url: "https://b-r.io/api/og?title=Gear", alt: "gear" }],
  },
};

interface ItemProps {
  title: string;
  description: string;
  image: string | StaticImageData;
  link: string;
  sponsored?: boolean;
}

const Item = ({ title, description, image, link, sponsored }: ItemProps) => (
  <li className="flex items-center gap-4 transition-opacity">
    <a
      className="relative aspect-square h-[4rem] w-[4rem] min-w-[4rem] overflow-hidden rounded-xl bg-tertiary shadow-sm border border-secondary"
      href={link}
      target="_blank"
    >
      <Image
        src={image}
        alt={title}
        className="h-full w-full object-cover object-center"
        fill
      />
    </a>
    <div className="flex grow items-center justify-between gap-2">
      <div className="space-y-1">
        <h3 className="line-clamp-2 font-medium leading-tight text-primary">
          {title}
        </h3>
        <p className="line-clamp-3 text-sm leading-tight text-secondary">
          {description}
        </p>
      </div>
      <div>
        <a
          className="ml-auto h-fit rounded-full bg-tertiary px-4 py-1 text-sm"
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
        <div className="flex animate-in flex-col gap-8">
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
            className="max-w-md animate-in text-tertiary"
            style={{ "--index": 2 } as React.CSSProperties}
          >
            This is all gear I actually own and like. Using the affiliate links
            help support my content creation. Updated on March 2024.
          </p>
        </div>

        {categories.map((category, index) => (
          <section
            className="flex animate-in flex-col gap-8"
            key={index}
            style={{ "--index": 3 } as React.CSSProperties}
          >
            <h2 className="text-secondary">{category}</h2>
            <ul className="animated-list grid gap-x-6 gap-y-8 md:grid-cols-2">
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
    description:
      "Elevates your screen(s) to help position your neck in a comfortable ergonomic posture.",
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
    name: "Mode Designs Envoy Mechanical Keyboard",
    category: "Home Desk Setup",
    description:
      "Superb quality, favorite keeb so far. Build code Y0E1F2E3C4A5A",
    image: Keyboard,
    link: "https://amzn.to/3U9tcE9",
  },
  {
    name: "Logitech MX Master Mouse 3S",
    category: "Home Desk Setup",
    description:
      "Ergonomic and comfortable to be used for all day use, love the scrolling!",
    image: "https://m.media-amazon.com/images/I/61xKiCADfpL._AC_SL1500_.jpg",
    link: "https://amzn.to/3PFWCKu",
  },
  {
    name: "Orbitkey Desk Mat",
    category: "Home Desk Setup",
    image: "https://m.media-amazon.com/images/I/51QZruZqs1L._AC_SL1500_.jpg",
    description:
      "Leather and Recycled PET Felt | Document Hideaway | Magnetic Cable Holder",
    link: "https://amzn.to/3PETeiZ",
    sponsored: false,
  },
  {
    name: "Custom Coiled USB C Cable",
    category: "Home Desk Setup",
    image: "https://m.media-amazon.com/images/I/61KMQ+px8bL._AC_SL1500_.jpg",
    description: "USB-C Artisan Braided, for Mechanical Keyboards",
    link: "https://amzn.to/3J0cXFP",
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
    name: "Apple Studio Display",
    category: "Home Desk Setup",
    description: "A 3440 x 1440 IPS Display, great for multitasking.",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/studio-display-gallery-1-202203?wid=640&hei=528&fmt=p-jpg&qlt=95&.v=1675709041796",
    link: "https://amzn.to/3TTDg7d",
  },
  {
    name: "Apple Magic Trackpad",
    category: "Home Desk Setup",
    description: "The go-to trackpad for my MacBook Pro. Great for gestures.",
    image: "https://m.media-amazon.com/images/I/41KZtzhlK+L._AC_SL1500_.jpg",
    link: "https://amzn.to/3vrq148",
  },
  {
    name: "MacroFactor",
    category: "Apps",
    description: "code 'brianruiz' for extended trial. I use this to stay on top of my diet.",
    image: Macrofactor,
    link: "https://macrofactorapp.com/",
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
    description: "1 Month FREE code. The fastest email experience with AI.",
    link: "https://superhuman.com/refer/bspuaqpo",
  },

  {
    name: "Sony FX3",
    category: "Camera Setup (Video)",
    image:
      "https://m.media-amazon.com/images/I/81lVg8e3bHL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    description:
      "Dream camera, 4k 10bit, built-in cooling, and great low light performance.",
    link: "https://amzn.to/3TR2lzz",
  },
  {
    name: "Sony 24-70mm f/2.8 GM II",
    category: "Camera Setup (Video)",
    description: "Super versatile and high quality lens.",
    image: "https://m.media-amazon.com/images/I/71i0q2J-iEL._AC_SL1500_.jpg",
    link: "https://amzn.to/3TABciO",
  },
  {
    name: "Peak Design Carbon Fiber Tripod",
    category: "Camera Setup (Video)",
    description: "Compact, lightweight, sturdy, and good looking.",
    image: "https://m.media-amazon.com/images/I/818QVv6AzPL._AC_SL1500_.jpg",
    link: "https://amzn.to/43CoF31",
  },
  {
    name: "Sennheiser MKE 600",
    category: "Camera Setup (Video)",
    image: "https://m.media-amazon.com/images/I/51tVQAKlvJL._AC_SL1200_.jpg",
    description:
      "My go-to XLR shotgun microphone for my videos and voice-overs.",
    link: "https://amzn.to/3Dm3z1m",
  },
  {
    name: "DJI Mic, Wireless Lavalier Microphone",
    category: "Camera Setup (Video)",
    description: "Great for on-the-go vlogging and voice-overs. In-frame.",
    image: "https://m.media-amazon.com/images/I/71jTh1T3jGL._AC_SL1500_.jpg",
    link: "https://amzn.to/4cuVVxj",
  },
  {
    name: "GoPro HERO10 Black action camera",
    category: "Other",
    image: "https://m.media-amazon.com/images/I/61p2fYdYP+L._AC_SX679_.jpg",
    description: "Awesome for action video, I use it for my POV shots.",
    link: "https://amzn.to/3exkZuq",
  },
  {
    name: "PolarPro Peter McKinnon Variable ND Filter 2-5 Stop",
    category: "Camera Setup (Video)",
    description:
      "Necessary for FX3 at base ISO, control exposure, and motion blur.",
    image: "https://m.media-amazon.com/images/I/61CdnSGKaAL._AC_SL1500_.jpg",
    link: "https://amzn.to/3TSAJdg",
  },
  {
    name: "Tiffen Black Pro-Mist 1/8 Filter",
    category: "Camera Setup (Video)",
    description:
      "Subtly Softens image. Reduces highlights and contrast, great for skin.",
    image:
      "https://m.media-amazon.com/images/I/51uqnCKf2WL.__AC_SY300_SX300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/4cyEUSJ",
  },
  {
    name: "Sony a7C II",
    category: "Camera Setup (Photo)",
    description:
      "Compact lightweight full-frame camera, flip screen, 4k, 33MP, b-roll camera.",
    image: "https://m.media-amazon.com/images/I/61O5jFfqbSL._AC_SL1000_.jpg",
    link: "https://amzn.to/3TQbJmO",
  },
  {
    name: "Sony 35mm f/1.8",
    category: "Camera Setup (Photo)",
    description:
      "Fast aperture, and lightweight. Great for portraits, street photography, and low light.",
    image: "https://m.media-amazon.com/images/I/71umwsH8NJL._AC_SL1500_.jpg",
    link: "https://amzn.to/43wiXj6",
  },
  {
    name: "Peak Design Leash Camera Strap",
    category: "Camera Setup (Photo)",
    description: "Quick-connecting, ultra-light, and compact camera strap.",
    image: "https://m.media-amazon.com/images/I/71DytxHtVaL._AC_SL1500_.jpg",
    link: "https://amzn.to/3VFfptf",
  },
  {
    name: "Brevite Backpack",
    category: "Everyday Carry",
    image: "https://m.media-amazon.com/images/I/61kuICMElAL._AC_SL1500_.jpg",
    description: "Compact Camera Backpack - A Minimalist & Travel-friendly",
    link: "https://amzn.to/3U5PTJo",
  },
  {
    name: "Suptig Chest Mount for GoPro",
    category: "Other",
    image: "https://m.media-amazon.com/images/I/81y-UqVnYAL._AC_SL1500_.jpg",
    description: "This is how I record my POV bike rides! :)",
    link: "https://amzn.to/3DonSG9",
  },
  {
    name: "DJI Mini 3 Pro Drone",
    category: "Other",
    description: "A great DJI drone for beginners, and a great vlogging tool.",
    image:
      "https://m.media-amazon.com/images/I/61Y1P6uIRFL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    link: "https://amzn.to/3mdZenf",
  },
  {
    name: "DJI RS 3 Mini Gimbal",
    category: "Other",
    description: "small footprint and portable.",
    image: "https://m.media-amazon.com/images/I/51owwMmtiBL._AC_SL1500_.jpg",
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
    category: "Everyday Carry",
    image: "https://m.media-amazon.com/images/I/61bwiPRcv2L._AC_SL1500_.jpg",
    description: "Daily driver. Sleek, great display, and performant.",
    link: "https://amzn.to/41fkhEH",
  },
  {
    name: "Apple AirPods Max",
    category: "Everyday Carry",
    image: "https://m.media-amazon.com/images/I/81OdA-ITspL._AC_SL1500_.jpg",
    description: "Active Noise Cancelling, Transparency Mode, Spatial Audio",
    link: "https://amzn.to/3mie64b",
  },
  {
    name: "Apple AirPods Pro",
    category: "Everyday Carry",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83_AV5?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803961739",
    description:
      "Wireless Earbuds, Up to 2X More Active Noise Cancelling, Adaptive Transparency.",
    link: "https://amzn.to/3UmMQhq",
  },
  {
    name: "Apple AirTag",
    category: "Everyday Carry",
    image: "https://m.media-amazon.com/images/I/81Lq1AfCYpS._AC_SL1500_.jpg",
    description: "Track your keys, wallet, backpack, and more.",
    link: "https://amzn.to/41dXoSa",
  },
  {
    name: "Orbitkey Key Organizer",
    category: "Everyday Carry",
    description: "Carry your keys in a neat and organized way.",
    image: "https://m.media-amazon.com/images/I/61myalb0+DL._AC_SY879_.jpg",
    link: "https://amzn.to/49clTTh",
  },
  {
    name: "Samsung T7 Shield SSD",
    category: "Other",
    description:
      "Fast, reliable, and secure storage. To edit videos on the go.",
    image: "https://m.media-amazon.com/images/I/61MDz7gI-zL._AC_SL1500_.jpg",
    link: "https://amzn.to/3vwoD03",
  },
];
