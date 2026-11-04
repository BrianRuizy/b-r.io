import Image, { type ImageProps } from 'next/image'
import { LinkIcon } from '@heroicons/react/24/outline'

import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { BrandCollaborations } from '@/components/BrandCollaborations'
import { SimpleLayout } from '@/components/SimpleLayout'
import { iconChromeClassName } from '@/lib/iconChrome'
import { createPageMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoBeam from '@/images/logos/beam-dark.png'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoCovidDashboard from '@/images/logos/covid-dashboard.png'
import logoOpenShuttle from '@/images/logos/open-shuttle.svg'

interface Project {
  name: string
  description: string
  link: { href: string; label: string }
  logo?: ImageProps['src']
}

const projects: Array<Project> = [
  {
    name: 'Beam',
    description:
      'A task and project manager for iPhone and Mac, bringing notes, calendars, and daily planning into one place.',
    link: {
      href: 'https://joinbeam.app',
      label: 'joinbeam.app',
    },
    logo: logoBeam,
  },
  {
    name: '@hines/ui',
    description:
      'A React component library for Hines with 40+ reusable components, dark mode, i18n, and RTL support.',
    link: {
      href: 'https://hinesui.b-r.io',
      label: 'hinesui.b-r.io',
    },
    logo: logoAnimaginary,
  },
  {
    name: 'GDH App',
    description:
      'A React Router 7 investment management and reporting app for Hines private commercial real estate.',
    link: {
      href: 'https://www.hines.com',
      label: 'hines.com',
    },
    logo: logoOpenShuttle,
  },

  {
    name: 'COVID-19 Dashboard',
    description:
      'A Django and Plotly dashboard for exploring pandemic data through an interactive, data-driven interface.',
    link: {
      href: 'https://github.com/brianruizy/covid19-dashboard',
      label: 'github.com…',
    },
    logo: logoCovidDashboard,
  },
  {
    name: 'Next Notion Portfolio',
    description:
      'A Next.js portfolio template that uses Notion as a flexible content management system.',
    link: {
      href: 'https://github.com/brianruizy/next-notion-portfolio',
      label: 'github.com…',
    },
    logo: logoCosmos,
  },
]

const heroTitle = 'Apps, side projects, and other things I’ve shipped.'

export const metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Personal projects, open-source tools, products I’ve helped build at Hines, and brand collaborations.',
  heroTitle,
})

export default function Projects() {
  return (
    <SimpleLayout
      title={heroTitle}
      intro={
        <>
          Personal projects, open-source tools, and products I’ve built at work,
          plus collaborations and companies I’ve worked with. You can find more
          of my code on{' '}
          <a
            href="https://www.github.com/brianruizy"
            className="link-underline"
          >
            GitHub
          </a>
          .
        </>
      }
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <li key={project.name}>
            <ContentCard className="h-full">
              <div
                className={cn(
                  'relative z-20 flex size-12 items-center justify-center rounded-full text-sm font-semibold text-foreground',
                  iconChromeClassName,
                )}
              >
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 rounded-full"
                    unoptimized
                  />
                ) : (
                  project.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <ContentCardTitle
                href={project.link.href}
                external={!project.link.href.startsWith('/')}
                className="mt-6"
              >
                {project.name}
              </ContentCardTitle>
              <ContentCardDescription className="line-clamp-3 text-pretty">
                {project.description}
              </ContentCardDescription>
              <p className="relative z-20 mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition group-hover:text-accent">
                <LinkIcon className="size-4 flex-none" />
                <span className="line-clamp-1">{project.link.label}</span>
              </p>
            </ContentCard>
          </li>
        ))}
      </ul>
      <BrandCollaborations />
    </SimpleLayout>
  )
}
