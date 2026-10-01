import { type StaticImageData } from 'next/image'

// Hardware PNGs are die-cut with `npm run stickerify -- photo.png src/images/uses/name.png`
// Dark vinyl (project-icon --muted): `npm run stickerify -- --recolor-vinyl 38,38,38 in.png src/images/uses/dark/name.png`
// White products (desk frames, etc.): generate dark with `--mode alpha --vinyl 38,38,38` so the product stays white.

import airpodsMax from '@/images/uses/airpods-max.png'
import airpodsMaxDark from '@/images/uses/dark/airpods-max.png'
import macbookPro from '@/images/uses/macbook-pro.png'
import macbookProDark from '@/images/uses/dark/macbook-pro.png'
import t7Ssd from '@/images/uses/t7-ssd.png'
import t7SsdDark from '@/images/uses/dark/t7-ssd.png'
import urthBackpack from '@/images/uses/urth-backpack.png'
import urthBackpackDark from '@/images/uses/dark/urth-backpack.png'
import studioDisplay from '@/images/uses/studio-display.png'
import studioDisplayDark from '@/images/uses/dark/studio-display.png'
import standingDesk from '@/images/uses/standing-desk.png'
import standingDeskDark from '@/images/uses/dark/standing-desk.png'
import aeronChair from '@/images/uses/aeron-chair.png'
import aeronChairDark from '@/images/uses/dark/aeron-chair.png'
import magicKeyboard from '@/images/uses/magic-keyboard.png'
import magicKeyboardDark from '@/images/uses/dark/magic-keyboard.png'
import shureSm7db from '@/images/uses/shure-sm7db.png'
import shureSm7dbDark from '@/images/uses/dark/shure-sm7db.png'
import peakTripod from '@/images/uses/peak-tripod.png'
import peakTripodDark from '@/images/uses/dark/peak-tripod.png'
import mke400 from '@/images/uses/mke-400.png'
import mke400Dark from '@/images/uses/dark/mke-400.png'
import sony2470 from '@/images/uses/sony-24-70.png'
import sony2470Dark from '@/images/uses/dark/sony-24-70.png'
import sony1635 from '@/images/uses/sony-16-35.png'
import sony1635Dark from '@/images/uses/dark/sony-16-35.png'
import sony40mm from '@/images/uses/sony-40mm.png'
import sony40mmDark from '@/images/uses/dark/sony-40mm.png'
import a7cIi from '@/images/uses/a7c-ii.png'
import a7cIiDark from '@/images/uses/dark/a7c-ii.png'
import sonyFx3 from '@/images/uses/sony-fx3.png'
import sonyFx3Dark from '@/images/uses/dark/sony-fx3.png'
import cowboyBike from '@/images/uses/cowboy-bike.png'
import cowboyBikeDark from '@/images/uses/dark/cowboy-bike.png'
import appleTv4k from '@/images/uses/apple-tv-4k.png'
import appleTv4kDark from '@/images/uses/dark/apple-tv-4k.png'
import hueBulb from '@/images/uses/hue-bulb.png'
import hueBulbDark from '@/images/uses/dark/hue-bulb.png'
import sonosEra100 from '@/images/uses/sonos-era-100.png'
import sonosEra100Dark from '@/images/uses/dark/sonos-era-100.png'
import lgOled from '@/images/uses/lg-oled.png'
import lgOledDark from '@/images/uses/dark/lg-oled.png'
import appBevel from '@/images/uses/app-bevel.png'
import appCursor from '@/images/uses/app-cursor.png'
import appCursorDark from '@/images/uses/dark/app-cursor.png'
import appFigma from '@/images/uses/app-figma.png'
import appFinalCut from '@/images/uses/app-finalcut.png'
import appNotion from '@/images/uses/app-notion.png'

export type ToolKind = 'device' | 'app'

export type ToolItem = {
  title: string
  href?: string
  description: string
  image: StaticImageData
  imageDark?: StaticImageData
  kind: ToolKind
  rotate: number
  scale?: number
}

export type ToolGroup = {
  title: string
  tools: ToolItem[]
}

export const toolGroups: ToolGroup[] = [
  {
    title: 'Everyday carry',
    tools: [
      {
        title: 'AirPods Max',
        href: 'https://amzn.to/3mie64b',
        description:
          'For focused desk work, commuting, and travel. AirPods Pro are the lighter everyday pair.',
        image: airpodsMax,
        imageDark: airpodsMaxDark,
        kind: 'device',
        rotate: -7,
      },
      {
        title: 'Apple M1 Pro MacBook Pro 16 in',
        href: 'https://amzn.to/41fkhEH',
        description:
          'Holding strong as the portable center of engineering and creative work.',
        image: macbookPro,
        imageDark: macbookProDark,
        kind: 'device',
        rotate: 0,
      },
      {
        title: 'Samsung T7 Shield SSD',
        href: 'https://amzn.to/3vwoD03',
        description:
          'Portable storage for editing projects and recording ProRes footage.',
        image: t7Ssd,
        imageDark: t7SsdDark,
        kind: 'device',
        rotate: -2,
        scale: 0.86,
      },
      {
        title: 'Urth backpack',
        href: 'https://amzn.to/49d888x',
        description:
          'Sleek and water resistant. Holds the daily tech essentials.',
        image: urthBackpack,
        imageDark: urthBackpackDark,
        kind: 'device',
        rotate: 4,
      },
    ],
  },
  {
    title: 'Workstation',
    tools: [
      {
        title: 'Apple Magic Keyboard with Touch ID',
        href: 'https://amzn.to/4hqtEeo',
        description:
          'I moved away from mechanical keyboards in favor of something wireless and simple. Touch ID is handy, too. I pair it with a Logitech MX Master 3S.',
        image: magicKeyboard,
        imageDark: magicKeyboardDark,
        kind: 'device',
        rotate: -3,
      },
      {
        title: 'Apple Studio Display',
        href: 'https://amzn.to/3TTDg7d',
        description:
          'Main display for development, design, and editing. BenQ ScreenBar Halo sits on top for reducing eye strain.',
        image: studioDisplay,
        imageDark: studioDisplayDark,
        kind: 'device',
        rotate: 3,
      },
      {
        title: 'Herman Miller Aeron',
        description:
          'Bought secondhand. Still one of the most important parts of the workspace.',
        image: aeronChair,
        imageDark: aeronChairDark,
        kind: 'device',
        rotate: 2,
      },
      {
        title: 'Shure SM7dB',
        href: 'https://amzn.to/4w5vRRS',
        description:
          'A near-perfect mic that stays mounted on the desk for meetings and the voiceovers I do.',
        image: shureSm7db,
        imageDark: shureSm7dbDark,
        kind: 'device',
        rotate: 4,
      },
      {
        title: 'Vernal Core3 hardwood standing desk',
        href: 'https://www.vernalspace.com/products/vernal-solid-wood-standing-desk',
        description:
          'Solid walnut hardwood on a white frame. A clean, comfortable foundation for long coding sessions that still feels minimal.',
        image: standingDesk,
        imageDark: standingDeskDark,
        kind: 'device',
        rotate: -3,
      },
    ],
  },
  {
    title: 'Camera gear',
    tools: [
      {
        title: 'Peak Design carbon fiber tripod',
        href: 'https://amzn.to/43CoF31',
        description:
          'Light enough to actually bring along, sturdy enough for real work — and it looks so nice.',
        image: peakTripod,
        imageDark: peakTripodDark,
        kind: 'device',
        rotate: -4,
      },
      {
        title: 'Sennheiser MKE 400',
        href: 'https://www.amazon.com/dp/B08YS34YRS',
        description:
          'Shotgun mic for talking directly to camera. Adds very little weight to the setup, still crispy sound.',
        image: mke400,
        imageDark: mke400Dark,
        kind: 'device',
        rotate: 2,
      },
      {
        title: 'Sony 16–35mm f/2.8 GM II',
        href: 'https://www.amazon.com/dp/B0CGTW24VF',
        description:
          'My ultra-wide. Cost a pretty penny, but perfect for capturing small settings or the full picture.',
        image: sony1635,
        imageDark: sony1635Dark,
        kind: 'device',
        rotate: 3,
      },
      {
        title: 'Sony 24–70mm f/2.8 GM II',
        href: 'https://amzn.to/3TABciO',
        description:
          'The workhorse lens on the FX3 — what I reach for to capture tight cinematic shots.',
        image: sony2470,
        imageDark: sony2470Dark,
        kind: 'device',
        rotate: -2,
      },
      {
        title: 'Sony 40mm f/2.5 G',
        href: 'https://amzn.to/3YTBdCz',
        description: 'Perfect for lightweight, minimal street photography.',
        image: sony40mm,
        imageDark: sony40mmDark,
        kind: 'device',
        rotate: 3,
      },
      {
        title: 'Sony a7C II',
        href: 'https://amzn.to/3TQbJmO',
        description:
          'Compact full-frame body for street photography around New York City.',
        image: a7cIi,
        imageDark: a7cIiDark,
        kind: 'device',
        rotate: -3,
      },
      {
        title: 'Sony FX3',
        href: 'https://amzn.to/3TR2lzz',
        description:
          "My dream camera. It can feel like overkill, but using it you understand why it's so loved. This camera forces you to learn more about videography, and that's why I love it myself.",
        image: sonyFx3,
        imageDark: sonyFx3Dark,
        kind: 'device',
        rotate: 0,
      },
    ],
  },
  {
    title: 'Home',
    tools: [
      {
        title: 'Apple TV 4K',
        href: 'https://www.apple.com/apple-tv-4k/',
        description:
          'What actually drives the living-room TV. Sports, movies, and YouTube.',
        image: appleTv4k,
        imageDark: appleTv4kDark,
        kind: 'device',
        rotate: 3,
      },
      {
        title: 'Cowboy Classic v4',
        href: 'https://cowboy.bike/',
        description:
          "My e-bike. I love the design. From a distance it still looks like an ordinary classic bike, but it's perfect for zipping around the city.",
        image: cowboyBike,
        imageDark: cowboyBikeDark,
        kind: 'device',
        rotate: -3,
      },
      {
        title: 'LG C4 OLED',
        href: 'https://amzn.to/3ZRVet8',
        description: 'The living-room TV, with a Sonos Beam for sound.',
        image: lgOled,
        imageDark: lgOledDark,
        kind: 'device',
        rotate: -2,
      },
      {
        title: 'Philips Hue',
        href: 'https://www.philips-hue.com/en-us/p/hue-white-and-color-ambiance-75w-a19-e26-smart-bulb/046677591168',
        description:
          'Started with a single bulb in a lamp, then added a couple around the space for nice ambience.',
        image: hueBulb,
        imageDark: hueBulbDark,
        kind: 'device',
        rotate: -3,
      },
      {
        title: 'Sonos Era 100',
        href: 'https://www.sonos.com/en-us/shop/era-100',
        description:
          'In the room for rich, full jamming sessions when I don\'t want headphones.',
        image: sonosEra100,
        imageDark: sonosEra100Dark,
        kind: 'device',
        rotate: 3,
      },
    ],
  },
  {
    title: 'Apps',
    tools: [
      {
        title: 'Bevel',
        href: 'https://join.bevel.health/U444GM',
        description:
          'I use this for various health metrics to extend Apple Health, including fitness tracking, food logging, and sleep.',
        image: appBevel,
        kind: 'app',
        rotate: 0,
      },
      {
        title: 'Cursor',
        href: 'https://www.cursor.com/',
        description:
          'My primary IDE for software development and AI-assisted coding.',
        image: appCursor,
        imageDark: appCursorDark,
        kind: 'app',
        rotate: 0,
      },
      {
        title: 'Figma',
        href: 'https://www.figma.com/',
        description:
          'Where I explore interfaces and turn ideas into visual direction — also video titles, thumbnails, and the occasional animation.',
        image: appFigma,
        kind: 'app',
        rotate: 0,
      },
      {
        title: 'Final Cut Pro',
        href: 'https://www.apple.com/final-cut-pro/',
        description: 'Where the YouTube videos come together.',
        image: appFinalCut,
        kind: 'app',
        rotate: 0,
      },
      {
        title: 'Notion',
        href: 'https://www.notion.so/',
        description: 'Planning, notes, and systems.',
        image: appNotion,
        kind: 'app',
        rotate: 0,
      },
    ],
  },
]
