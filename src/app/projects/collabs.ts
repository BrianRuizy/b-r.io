import { type StaticImageData } from 'next/image'

import logoFramer from '@/images/logos/brands/framer.svg'
import logoIbm from '@/images/logos/brands/ibm.svg'
import logoLogitech from '@/images/logos/brands/logitech.svg'
import logoMobbin from '@/images/logos/brands/mobbin.svg'
import logoMonday from '@/images/logos/brands/monday.svg'
import logoNotion from '@/images/logos/brands/notion.svg'
import logoRaycast from '@/images/logos/brands/raycast.svg'
import logoSlack from '@/images/logos/brands/slack.svg'
import logoSuperhuman from '@/images/logos/brands/superhuman.svg'

export type Collab = {
  name: string
  href: string
  logo: StaticImageData
  mark?: 'icon' | 'wordmark'
}

export const collabs: Array<Collab> = [
  {
    name: 'Notion',
    href: 'https://www.youtube.com/watch?v=53KFVt2GRkE',
    logo: logoNotion,
  },
  {
    name: 'Slack',
    href: 'https://www.youtube.com/watch?v=F89JTZzJJnI',
    logo: logoSlack,
  },
  {
    name: 'Logitech',
    href: 'https://www.youtube.com/watch?v=AIZ5LJ2IeZo',
    logo: logoLogitech,
    mark: 'wordmark',
  },
  {
    name: 'Superhuman',
    href: 'https://www.youtube.com/watch?v=jT5C70zLQMM',
    logo: logoSuperhuman,
  },
  {
    name: 'IBM',
    href: 'https://www.youtube.com/watch?v=CIi1M-9oTHM',
    logo: logoIbm,
    mark: 'wordmark',
  },
  {
    name: 'monday.com',
    href: 'https://www.youtube.com/watch?v=6nvnKjzwjaI',
    logo: logoMonday,
    mark: 'wordmark',
  },
  {
    name: 'Mobbin',
    href: 'https://www.youtube.com/watch?v=uMvJlTk0w9U',
    logo: logoMobbin,
    mark: 'wordmark',
  },
  {
    name: 'Framer',
    href: 'https://www.youtube.com/watch?v=lD84PGERjP8',
    logo: logoFramer,
  },
  {
    name: 'Raycast',
    href: 'https://www.youtube.com/watch?v=mH4Fs1Pxomo',
    logo: logoRaycast,
  },
]
