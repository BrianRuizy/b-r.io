import { type Metadata } from 'next'

import {
  ContentCard,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { SimpleLayout } from '@/components/SimpleLayout'

const projects = [
  {
    name: 'b-r.io',
    description:
      'My personal website and home for writing about software, design, productivity, and life.',
    link: {
      href: 'https://github.com/brianruizy/b-r.io',
      label: 'github.com/brianruizy/b-r.io',
    },
  },
  {
    name: 'COVID-19 Dashboard',
    description:
      'A Django and Plotly dashboard for exploring pandemic data through an interactive, data-driven interface.',
    link: {
      href: 'https://github.com/brianruizy/covid19-dashboard',
      label: 'github.com/brianruizy/covid19-dashboard',
    },
  },
  {
    name: 'Gatsby Medium Blog',
    description:
      'A feature-rich Gatsby starter with search, reactions, dark mode, code highlighting, and an installable PWA.',
    link: {
      href: 'https://github.com/brianruizy/gatsby-medium-blog',
      label: 'github.com/brianruizy/gatsby-medium-blog',
    },
  },
  {
    name: 'LeetCode Notion',
    description:
      'A simple Notion workflow for tracking coding problems, solutions, thought processes, and complexity.',
    link: {
      href: 'https://github.com/brianruizy/leetcode-notion',
      label: 'github.com/brianruizy/leetcode-notion',
    },
  },
  {
    name: 'Next Notion Portfolio',
    description:
      'A Next.js portfolio template that uses Notion as a flexible content management system.',
    link: {
      href: 'https://github.com/brianruizy/next-notion-portfolio',
      label: 'github.com/brianruizy/next-notion-portfolio',
    },
  },
  {
    name: 'Gatsby Minimal Portfolio',
    description:
      'A content-focused JAMstack portfolio starter with dark mode, SEO, code highlighting, forms, and CI/CD.',
    link: {
      href: 'https://github.com/brianruizy/gatsby-minimal-portfolio',
      label: 'github.com/brianruizy/gatsby-minimal-portfolio',
    },
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source projects, experiments, and tools I’ve built.',
}

export default function Projects() {
  return (
    <SimpleLayout
      title="Things I’ve built while learning and experimenting."
      intro="I learn by making things. These are a few of the open-source projects, templates, and experiments I’ve published over the years."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <li key={project.name}>
            <ContentCard className="h-full">
              <div className="group relative z-20 flex h-12 w-12 items-center justify-center rounded-full bg-card text-sm font-semibold text-foreground shadow ring-1 ring-border dark:bg-muted/90">
                {project.name.slice(0, 2).toUpperCase()}
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
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2 line-clamp-1">{project.link.label}</span>
              </p>
            </ContentCard>
          </li>
        ))}
      </ul>
    </SimpleLayout>
  )
}
