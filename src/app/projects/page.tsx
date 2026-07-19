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
      'A mobile-first project and task manager with widgets, insights, calendar views, and Siri integration.',
    link: {
      href: 'https://github.com/brianruizy/taskss',
      label: 'github.com/brianruizy/taskss',
    },
    logo: logoBeam,
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
    name: 'Gatsby Medium Blog',
    description:
      'A feature-rich Gatsby starter with search, reactions, dark mode, code highlighting, and an installable PWA.',
    link: {
      href: 'https://github.com/brianruizy/gatsby-medium-blog',
      label: 'github.com/brianruizy/gatsby-medium-blog',
    },
    logo: logoAnimaginary,
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
  {
    name: 'Gatsby Minimal Portfolio',
    description:
      'A content-focused JAMstack portfolio starter with dark mode, SEO, code highlighting, forms, and CI/CD.',
    link: {
      href: 'https://github.com/brianruizy/gatsby-minimal-portfolio',
      label: 'github.com/brianruizy/gatsby-minimal-portfolio',
    },
    logo: logoOpenShuttle,
  },
]

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source projects, tools, and experiments I&apos;ve built.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I've built along the way."
      intro="Open-source templates, dashboards, and apps. Some to learn, some to scratch my own itch."
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
              <p className="relative z-20 mt-6 flex items-center text-sm font-medium text-muted-foreground transition group-hover:text-accent">
                <LinkIcon className="size-6 flex-none" />
                <span className="ml-2 line-clamp-1">{project.link.label}</span>
              </p>
            </ContentCard>
          </li>
        ))}
      </ul>
    </SimpleLayout>
  )
}
