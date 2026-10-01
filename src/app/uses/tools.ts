import { type StaticImageData } from 'next/image'

import airpodsMax from '@/images/uses/airpods-max.png'
import macbookPro from '@/images/uses/macbook-pro.png'
import t7Ssd from '@/images/uses/t7-ssd.png'
import urthBackpack from '@/images/uses/urth-backpack.png'
import studioDisplay from '@/images/uses/studio-display.png'
import standingDesk from '@/images/uses/standing-desk.png'
import aeronChair from '@/images/uses/aeron-chair.png'
import magicKeyboard from '@/images/uses/magic-keyboard.png'
import shureSm7db from '@/images/uses/shure-sm7db.png'
import peakTripod from '@/images/uses/peak-tripod.png'
import mke600 from '@/images/uses/mke-600.png'
import sony2470 from '@/images/uses/sony-24-70.png'
import sony40mm from '@/images/uses/sony-40mm.png'
import a7cIi from '@/images/uses/a7c-ii.png'
import sonyFx3 from '@/images/uses/sony-fx3.png'
import cowboyBike from '@/images/uses/cowboy-bike.png'
import fellowOde from '@/images/uses/fellow-ode.png'
import lgOled from '@/images/uses/lg-oled.png'
import appBevel from '@/images/uses/app-bevel.png'
import appCursor from '@/images/uses/app-cursor.png'
import appFigma from '@/images/uses/app-figma.png'
import appFinalCut from '@/images/uses/app-finalcut.png'
import appNotion from '@/images/uses/app-notion.png'

export type ToolKind = 'device' | 'app'

export type ToolItem = {
  title: string
  href?: string
  description: string
  image: StaticImageData
  kind: ToolKind
  rotate: number
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
        kind: 'device',
        rotate: -7,
      },
      {
        title: 'M1 Pro MacBook Pro 16-inch',
        href: 'https://amzn.to/41fkhEH',
        description:
          'Holding strong as the portable center of engineering and creative work.',
        image: macbookPro,
        kind: 'device',
        rotate: 5,
      },
      {
        title: 'Samsung T7 Shield SSD',
        href: 'https://amzn.to/3vwoD03',
        description:
          'Portable storage for editing projects and recording ProRes footage.',
        image: t7Ssd,
        kind: 'device',
        rotate: -4,
      },
      {
        title: 'Urth backpack',
        href: 'https://amzn.to/49d888x',
        description:
          'Sleek and water resistant. Holds the daily tech essentials.',
        image: urthBackpack,
        kind: 'device',
        rotate: 8,
      },
    ],
  },
  {
    title: 'Workstation',
    tools: [
      {
        title: 'Apple Studio Display',
        href: 'https://amzn.to/3TTDg7d',
        description:
          'Main display for development, design, and editing. BenQ ScreenBar Halo sits on top for reducing eye strain.',
        image: studioDisplay,
        kind: 'device',
        rotate: 6,
      },
      {
        title: 'Ergonofis Sway standing desk',
        href: 'https://shrsl.com/49346',
        description:
          'Paired with the Ergonofis desk shelf. A clean, comfortable foundation for long coding sessions that still feels minimal.',
        image: standingDesk,
        kind: 'device',
        rotate: -6,
      },
      {
        title: 'Herman Miller Aeron',
        description:
          'Bought secondhand. Still one of the most important parts of the workspace.',
        image: aeronChair,
        kind: 'device',
        rotate: 4,
      },
      {
        title: 'Apple Magic Keyboard with Touch ID',
        href: 'https://amzn.to/4hqtEeo',
        description:
          'I moved away from mechanical keyboards in favor of something wireless and simple. Touch ID is handy, too. I pair it with a Logitech MX Master 3S.',
        image: magicKeyboard,
        kind: 'device',
        rotate: -5,
      },
      {
        title: 'Shure SM7dB',
        href: 'https://amzn.to/4w5vRRS',
        description:
          'This microphone is perfect for podcasting and streaming. Get clear, warm vocals every time.',
        image: shureSm7db,
        kind: 'device',
        rotate: 7,
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
          'Light enough to actually bring along, sturdy enough for real work.',
        image: peakTripod,
        kind: 'device',
        rotate: -8,
      },
      {
        title: 'Sennheiser MKE 600',
        href: 'https://amzn.to/3ZlA32w',
        description:
          "Don't underestimate a good mic. The DJI Mic covers on-the-go recording.",
        image: mke600,
        kind: 'device',
        rotate: 3,
      },
      {
        title: 'Sony 24–70mm f/2.8 GM II',
        href: 'https://amzn.to/3TABciO',
        description: 'The workhorse lens on the FX3 for most video work.',
        image: sony2470,
        kind: 'device',
        rotate: -3,
      },
      {
        title: 'Sony 40mm f/2.5 G',
        href: 'https://amzn.to/3YTBdCz',
        description:
          'Small, sharp, and easy to carry for everyday street shooting.',
        image: sony40mm,
        kind: 'device',
        rotate: 6,
      },
      {
        title: 'Sony a7C II',
        href: 'https://amzn.to/3TQbJmO',
        description:
          'Compact full-frame body for street photography around New York City.',
        image: a7cIi,
        kind: 'device',
        rotate: -7,
      },
      {
        title: 'Sony FX3',
        href: 'https://amzn.to/3TR2lzz',
        description:
          "My dream camera. It can feel like overkill, but using it you understand why it's so loved. This camera forces you to learn more about videography, and that's why I love it myself.",
        image: sonyFx3,
        kind: 'device',
        rotate: 5,
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
        kind: 'app',
        rotate: 0,
      },
      {
        title: 'Figma',
        href: 'https://www.figma.com/',
        description:
          'Where I explore interfaces and turn ideas into visual direction.',
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
  {
    title: 'Home',
    tools: [
      {
        title: 'Cowboy Classic v4',
        href: 'https://cowboy.bike/',
        description:
          "My e-bike. I love the design. From a distance it still looks like an ordinary classic bike, but it's perfect for zipping around the city.",
        image: cowboyBike,
        kind: 'device',
        rotate: -5,
      },
      {
        title: 'Fellow Ode',
        href: 'https://fellow.com/products/ode',
        description:
          'Coffee grinder at home, with a Fellow kettle alongside it.',
        image: fellowOde,
        kind: 'device',
        rotate: 7,
      },
      {
        title: 'LG C4 OLED',
        href: 'https://amzn.to/3ZRVet8',
        description:
          'Living-room essentials with a Sonos Beam and Apple TV 4K.',
        image: lgOled,
        kind: 'device',
        rotate: -4,
      },
    ],
  },
]

