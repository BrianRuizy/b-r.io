import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/photos/me.jpeg'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-foreground transition hover:text-accent"
      >
        <Icon className="h-6 w-6 flex-none fill-muted-foreground transition group-hover:fill-accent" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'Brian Ruiz is a software engineer and creator in New York City, originally from Honduras.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={portraitImage}
              alt="Brian Ruiz in New York City"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-muted object-cover"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            I'm Brian. I live in NYC, building, creating, and sharing the
            process.
          </h1>
          <div className="mt-6 space-y-7 text-base text-muted-foreground">
            <p>
              I’m Brian — a software engineer from Honduras living in New York
              City. I’ve been drawn to computers since I was a kid, and that
              curiosity turned into a career building products across the stack,
              with a soft spot for design and how things feel to use.
            </p>
            <p>
              By day I work at Hines as a senior software engineer, focused on
              building web applications at the enterprise level. I studied
              computer science for a bit at the University of Houston–Downtown.
            </p>
            <p>
              On the side I make YouTube videos about tech, productivity, and
              the day-to-day of building — sometimes with a little filmmaking
              mixed in. The channel started from a passion for photography and
              working with cameras and tech, and here we are: a community of
              more than 100,000 people. I also publish Notion systems and
              templates for the workflows I actually use.
            </p>
            <p>
              Away from the screen you’ll usually catch me at the gym, riding my
              e-bike around the city, or camping out at a coffee shop with a
              laptop nearby. This site is a quieter home for the work, writing,
              and tools behind all of that.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://x.com/brianruizy" icon={XIcon}>
              Follow on X
            </SocialLink>
            <SocialLink
              href="https://www.instagram.com/brianruizy"
              icon={InstagramIcon}
              className="mt-4"
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://www.github.com/brianruizy"
              icon={GitHubIcon}
              className="mt-4"
            >
              Follow on GitHub
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/brianruizy/"
              icon={LinkedInIcon}
              className="mt-4"
            >
              Follow on LinkedIn
            </SocialLink>
            <SocialLink
              href="mailto:brian@b-r.io"
              icon={MailIcon}
              className="mt-8 border-t border-border pt-8"
            >
              brian@b-r.io
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
