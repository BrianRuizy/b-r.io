import { type StaticImageData } from 'next/image'

import logoFramer from '@/images/logos/brands/framer.svg'
import logoIbm from '@/images/logos/brands/ibm.svg'
import logoLg from '@/images/logos/brands/lg.svg'
import logoLiquidIv from '@/images/logos/brands/liquid-iv.svg'
import logoLogitech from '@/images/logos/brands/logitech.svg'
import logoMicrosoft from '@/images/logos/brands/microsoft.svg'
import logoNotion from '@/images/logos/brands/notion.svg'
import logoSlack from '@/images/logos/brands/slack.svg'
import logoSuperhuman from '@/images/logos/brands/superhuman.svg'
import { writingHref } from '@/lib/writing'

export type Collab = {
  name: string
  href: string
  logo: StaticImageData
  external?: boolean
  mark?: 'icon' | 'wordmark'
}

export const collabs: Array<Collab> = [
  {
    name: 'Notion',
    href: writingHref('my-notion-productivity-setup'),
    logo: logoNotion,
  },
  {
    name: 'Slack',
    href: 'https://www.youtube.com/results?search_query=brianruizy+slack',
    logo: logoSlack,
    external: true,
  },
  {
    name: 'Logitech',
    href: 'https://www.youtube.com/watch?v=AIZ5LJ2IeZo',
    logo: logoLogitech,
    external: true,
  },
  {
    name: 'Superhuman',
    href: 'https://www.youtube.com/watch?v=jT5C70zLQMM',
    logo: logoSuperhuman,
    external: true,
    mark: 'wordmark',
  },
  {
    name: 'IBM',
    href: 'https://www.youtube.com/results?search_query=brianruizy+ibm',
    logo: logoIbm,
    external: true,
  },
  {
    name: 'LG',
    href: writingHref('desk-setup'),
    logo: logoLg,
  },
  {
    name: 'Microsoft',
    href: writingHref('this-app-got-us-1st-place-at-a-microsoft-hackathon'),
    logo: logoMicrosoft,
  },
  {
    name: 'Liquid I.V.',
    href: 'https://www.instagram.com/brianruizy/',
    logo: logoLiquidIv,
    external: true,
    mark: 'wordmark',
  },
  {
    name: 'Framer',
    href: writingHref('moving-into-my-dream-nyc-apartment'),
    logo: logoFramer,
  },
]
