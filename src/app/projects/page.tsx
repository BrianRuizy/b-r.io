import Image, { type ImageProps } from 'next/image'
import { LinkIcon } from '@heroicons/react/24/outline'

import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { SimpleLayout } from '@/components/SimpleLayout'
import { createPageMetadata } from '@/lib/metadata'
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

const heroTitle = "Things I've built."

export const metadata = createPageMetadata({
  title: 'Projects',
  description: "Apps, tools, and experiments I've built.",
  heroTitle,
})

export default function Projects() {
  return (
    <SimpleLayout
      title={heroTitle}
      eyebrow="Projects"
      intro={
        <>
          A mix of open-source experiments and products I&apos;ve built at work,
          across a range of frameworks and languages. You can find even more on
          my{' '}
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
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <li key={project.name}>
            <ContentCard className="h-full rounded-3xl border border-border bg-card p-7 transition hover:border-muted-foreground/40 sm:p-9">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-muted text-sm font-semibold text-foreground">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt=""
                    width={40}
                    height={40}
                    className="size-10 rounded-xl object-contain"
                    unoptimized
                  />
                ) : (
                  project.name.slice(0, 2).toUpperCase()
                )}
              </div>
              <ContentCardTitle
                href={project.link.href}
                external
                className="mt-8 text-2xl"
              >
                {project.name}
              </ContentCardTitle>
              <ContentCardDescription>
                {project.description}
              </ContentCardDescription>
              <p className="mt-auto flex w-full items-center gap-2 pt-8 text-sm font-medium text-muted-foreground transition group-hover:text-foreground">
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
