import { type Metadata } from 'next'
import Link from 'next/link'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { cn } from '@/lib/utils'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from '@/components/SocialIcons'
import { Portrait } from '@/app/about/Portrait'

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
    <li className={cn(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-foreground transition hover:text-accent"
      >
        <Icon className="size-6 flex-none fill-muted-foreground transition group-hover:fill-accent" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
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
          <Portrait />
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            I&apos;m Brian. I live in New York City, building and sharing the
            journey.
          </h1>
          <div className="mt-6 space-y-7 text-base text-muted-foreground">
            <p>
              I was born in Honduras, grew up in Texas, and now live in New York
              City. I got into coding because I liked creating things from
              scratch. That same instinct still drives the work I do, both in
              software and on camera.
            </p>
            <p>
              I currently work at Hines as a Sr. Software Engineer, building
              web apps at the enterprise level. Most of my time goes
              into making complex systems feel straightforward for the people
              using them. On the side I&apos;m building Beam, a project and task
              manager built for iPhone first, with a companion Mac app.
            </p>
            <p>
              My expertise is in full-stack web development, but I really love
              the front-end side of it. There&apos;s something about crafting a
              pixel-perfect layout, tweaking spring animations, or simply making
              apps delightful to use that I find the most rewarding.
            </p>
            <p>
              I also run a YouTube channel with more than 100,000 subscribers.
              It started with photography and cameras, then grew into videos
              about tech, productivity, and what building things day to day
              actually looks like, sometimes with a little filmmaking mixed in.
            </p>
            <p>
              When I&apos;m not working, you&apos;ll usually find me at the gym,
              riding my e-bike around the city, or at a coffee shop with a
              laptop nearby.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="https://www.instagram.com/brianruizy"
              icon={InstagramIcon}
            >
              Follow on Instagram
            </SocialLink>
            <SocialLink
              href="https://www.youtube.com/@brianruizy"
              icon={YouTubeIcon}
              className="mt-4"
            >
              Subscribe on YouTube
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
              Connect on LinkedIn
            </SocialLink>
            <SocialLink
              href="https://x.com/brianruizy"
              icon={XIcon}
              className="mt-4"
            >
              Follow on X
            </SocialLink>
            <SocialLink
              href="mailto:partners@b-r.io"
              icon={EnvelopeIcon}
              className="mt-8 border-t border-border pt-8"
            >
              partners@b-r.io
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
