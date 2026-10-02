import { type StaticImageData } from 'next/image'

import logoFramer from '@/images/logos/brands/framer.svg'
import logoIbm from '@/images/logos/brands/ibm.svg'
import logoLogitech from '@/images/logos/brands/logitech.svg'
import logoMobbin from '@/images/logos/brands/mobbin.svg'
import logoMonday from '@/images/logos/brands/monday.svg'
import logoNotion from '@/images/logos/brands/notion.svg'
import logoRaycast from '@/images/logos/brands/raycast.svg'
import logoSlack from '@/images/logos/brands/slack.svg'

export type Collab = {
  name: string
  href: string
  logo: StaticImageData
  /** viewBox width / height, so every mark can share one height */
  ratio: number
  lockup?: 'slack'
}

export const collabs: Array<Collab> = [
  {
    name: 'IBM',
    href: 'https://www.youtube.com/watch?v=CIi1M-9oTHM',
    logo: logoIbm,
    ratio: 1000 / 401.15,
  },
  {
    name: 'Logitech',
    href: 'https://www.youtube.com/watch?v=AIZ5LJ2IeZo',
    logo: logoLogitech,
    ratio: 787.892 / 130.276,
  },
  {
    name: 'Slack',
    href: 'https://www.youtube.com/watch?v=F89JTZzJJnI',
    logo: logoSlack,
    ratio: 1013 / 257,
    lockup: 'slack',
  },
  {
    name: 'monday.com',
    href: 'https://www.youtube.com/watch?v=6nvnKjzwjaI',
    logo: logoMonday,
    ratio: 512 / 95,
  },
  {
    name: 'Notion',
    href: 'https://www.youtube.com/watch?v=53KFVt2GRkE',
    logo: logoNotion,
    ratio: 512 / 178,
  },
  {
    name: 'Framer',
    href: 'https://www.youtube.com/watch?v=lD84PGERjP8',
    logo: logoFramer,
    ratio: 200.87 / 54,
  },
  {
    name: 'Raycast',
    href: 'https://www.youtube.com/watch?v=mH4Fs1Pxomo',
    logo: logoRaycast,
    ratio: 759.76 / 294.36,
  },
  {
    name: 'Mobbin',
    href: 'https://www.youtube.com/watch?v=uMvJlTk0w9U',
    logo: logoMobbin,
    ratio: 945.92 / 149,
  },
]
