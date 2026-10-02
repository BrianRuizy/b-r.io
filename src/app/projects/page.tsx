import Image, { type ImageProps } from 'next/image'
import { LinkIcon } from '@heroicons/react/24/outline'

import { BrandCloud } from '@/components/BrandCloud'
import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { Section } from '@/components/Section'
import { SimpleLayout } from '@/components/SimpleLayout'
import { collabs } from '@/app/projects/collabs'
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
      'A project and task manager built for iPhone first, with widgets, calendar views, Siri, and a companion Mac app.',
    link: {
      href: 'https://joinbeam.app',
      label: 'joinbeam.app',
    },
    logo: logoBeam,
  },
  {
    name: 'GDH App',
    description:
      'A React Router 7 investment management and reporting app for Hines private commercial real estate.',
    link: {
      href: 'https://www.hines.com',
      label: 'hines.com',
    },
    logo: logoAnimaginary,
  },
  {
    name: '@hines/ui',
    description:
      'The internal design system for Hines — 40+ accessible components powering our web apps.',
    link: {
      href: 'https://www.hines.com',
      label: '@hines/ui',
    },
    logo: logoOpenShuttle,
  },
  {
    name: 'COVID-19 Dashboard',
    description:
      'A Django and Plotly dashboard for exploring pandemic data through an interactive, data-driven interface.',
    link: {
      href: 'https://github.com/brianruizy/covid19-dashboard',
      label: 'github.com/brianruizy/covid19-dashboard',
    },
    logo: logoCovidDashboard,
  },
  {
    name: 'Next Notion Portfolio',
    description:
      'A Next.js portfolio template that uses Notion as a flexible content management system.',
    link: {
      href: 'https://github.com/brianruizy/next-notion-portfolio',
      label: 'github.com/brianruizy/next-notion-portfolio',
    },
    logo: logoCosmos,
  },
]

const heroTitle =
  "Apps I've shipped, and companies I've worked with along the way."

export const metadata = createPageMetadata({
  title: 'Projects',
  description: "Apps I've built, and companies I've worked with.",
  heroTitle,
})

export default function Projects() {
  return (
    <SimpleLayout
      title={heroTitle}
      intro={
        <>
          A mix of products I&apos;ve built and brands I&apos;ve partnered with
          — from open-source experiments to campaigns with teams I like.
          You can find even more on my{' '}
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
      <div className="space-y-20">
        <Section title="Apps">
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2"
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
                    external
                    className="mt-6"
                  >
                    {project.name}
                  </ContentCardTitle>
                  <ContentCardDescription>
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
        </Section>

        <Section title="Companies I've worked with">
          <BrandCloud brands={collabs} />
        </Section>
      </div>
    </SimpleLayout>
  )
}
