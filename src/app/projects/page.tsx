import { type Metadata } from 'next'
import Image, { type ImageProps } from 'next/image'
import { LinkIcon } from '@heroicons/react/24/outline'

import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoAnimaginary from '@/images/logos/animaginary.svg'
import logoBeam from '@/images/logos/beam-dark.png'
import logoCosmos from '@/images/logos/cosmos.svg'
import logoHelioStream from '@/images/logos/helio-stream.svg'
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
      href: 'https://beam-website-xi.vercel.app',
      label: 'beam-website-xi.vercel.app',
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
    logo: logoHelioStream,
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

export const metadata: Metadata = {
  title: 'Projects',
  description: "Apps, tools, and experiments I've built.",
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Side projects, work apps, and things I've shipped along the way."
      intro={
        <>
          A mix of open-source experiments and products I&apos;ve built at work,
          across a range of frameworks and languages. You can find even more on my{' '}
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
              <div className="relative z-20 flex size-12 items-center justify-center rounded-full bg-card text-sm font-semibold text-foreground shadow-md ring-1 shadow-foreground/5 ring-border dark:border dark:border-border dark:bg-muted dark:ring-0">
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
    </SimpleLayout>
  )
}
