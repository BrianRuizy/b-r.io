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
    'Brian Ruiz is a software engineer and creator based in New York City.',
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
              I'm from Honduras, grew up in Texas, and now live in New York
              City. I got into software because I liked making things people
              could actually use — and that's still what keeps me interested,
              whether it's code, a video, or something in between.
            </p>
            <p>
              I work at Hines as a senior software engineer, building web
              applications at the enterprise level. Most of my time goes into
              making complex systems feel straightforward for the people using
              them.
            </p>
            <p>
              On the side I run a YouTube channel with more than 100,000
              subscribers. It started with photography and cameras, then grew
              into videos about tech, productivity, and what building things
              day to day actually looks like — sometimes with a little
              filmmaking mixed in.
            </p>
            <p>
              When I'm not working, you'll usually find me at the gym, riding
              my e-bike around the city, or at a coffee shop with a laptop
              nearby. This site is a quieter place for the writing, projects,
              and work that doesn't fit on a timeline.
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
