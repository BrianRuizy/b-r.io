import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { BriefcaseIcon } from '@heroicons/react/24/outline'

import { Container } from '@/components/Container'
import {
  ContentCard,
  ContentCardCta,
  ContentCardDescription,
  ContentCardEyebrow,
  ContentCardTitle,
} from '@/components/ContentCard'
import { Button } from '@/components/Button'
import { Newsletter } from '@/components/Newsletter'
import {
  GitHubIcon,
  InstagramIcon,
  XIcon,
  YouTubeIcon,
} from '@/components/SocialIcons'
import { PhotoGallery } from '@/components/PhotoGallery'
import logoBeamIcon from '@/images/logos/beam-icon-borderless.png'
import logoCams from '@/images/logos/cams-white.png'
import logoHines from '@/images/logos/hines.svg'
import logoPeriship from '@/images/logos/periship.png'
import { formatDate } from '@/lib/formatDate'
import { getAllPosts, type Post } from '@/lib/posts'

function LatestPost({ post }: { post: Post }) {
  return (
    <ContentCard as="article">
      <ContentCardTitle href={post.href}>{post.title}</ContentCardTitle>
      <ContentCardEyebrow as="time" dateTime={post.date} decorate>
        {formatDate(post.date)}
      </ContentCardEyebrow>
      <ContentCardDescription>{post.description}</ContentCardDescription>
      <ContentCardCta>
        {post.type === 'article' ? 'Read article' : 'Watch video'}
      </ContentCardCta>
    </ContentCard>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="size-6 fill-muted-foreground transition group-hover:fill-foreground" />
    </Link>
  )
}

interface Role {
  company: string
  title: string
  initials: string
  logo?: ImageProps['src']
  logoInset?: 'muted' | 'white'
  logoBgClass?: string
  logoPadding?: string
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex size-12 flex-none items-center justify-center rounded-full bg-card text-xs font-semibold text-foreground shadow-md ring-1 shadow-foreground/5 ring-border dark:border dark:border-border dark:bg-muted dark:ring-0">
        {role.logo ? (
          role.logoInset || role.logoBgClass ? (
            <div
              className={`flex size-8 items-center justify-center rounded-full ${role.logoPadding ?? 'p-1.5'} ${role.logoInset === 'white' ? 'bg-white' : role.logoInset === 'muted' ? 'bg-muted' : ''} ${role.logoBgClass ?? ''}`}
            >
              <Image
                src={role.logo}
                alt=""
                width={32}
                height={32}
                className="size-full object-contain"
                unoptimized
              />
            </div>
          ) : (
            <Image
              src={role.logo}
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-full"
              unoptimized
            />
          )
        ) : (
          role.initials
        )}
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-foreground">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-muted-foreground">{role.title}</dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-muted-foreground"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Hines',
      title: 'Sr. Software Engineer',
      initials: 'H',
      logo: logoHines,
      start: '2021',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'PeriShip',
      title: 'Software Engineer',
      initials: 'P',
      logo: logoPeriship,
      logoBgClass: 'bg-white',
      start: '2020',
      end: '2021',
    },
    {
      company: 'CAMS',
      title: 'Python Developer',
      initials: 'C',
      logo: logoCams,
      logoBgClass: 'bg-sky-600',
      logoPadding: 'p-2',
      start: '2019',
      end: '2020',
    },
  ]

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="flex text-sm font-semibold text-foreground">
        <BriefcaseIcon className="size-6 flex-none text-muted-foreground" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        href="https://www.linkedin.com/in/brianruizy/"
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        className="mt-6 w-full"
      >
        View LinkedIn
      </Button>
    </div>
  )
}

export default async function Home() {
  let posts = (await getAllPosts()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Software engineer, designer, and part-time YouTuber.
          </h1>
          <p className="mt-6 text-base text-muted-foreground">
            Software Engineer at Hines, and building{' '}
            <Link
              href="https://github.com/brianruizy/taskss"
              className="link-underline inline-flex items-center gap-1"
            >
              <span
                aria-hidden
                className="inline-block size-3 shrink-0 bg-current"
                style={{
                  maskImage: `url(${logoBeamIcon.src})`,
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: `url(${logoBeamIcon.src})`,
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                }}
              />
              Beam
            </Link>
            , an iPhone-first project manager. I obsess over craft, speed, and
            software that still feels human. Based in NYC. I also make{' '}
            <Link
              href="https://www.youtube.com/@brianruizy"
              className="link-underline"
            >
              videos
            </Link>{' '}
            about tech, and daily life for a community of 100K+ subscribers.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://x.com/brianruizy"
              aria-label="Follow on X"
              icon={XIcon}
            />
            <SocialLink
              href="https://www.instagram.com/brianruizy"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://www.youtube.com/@brianruizy"
              aria-label="Follow on YouTube"
              icon={YouTubeIcon}
            />
            <SocialLink
              href="https://www.github.com/brianruizy"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
          </div>
        </div>
      </Container>
      <PhotoGallery />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="space-y-10">
            <h2 className="text-sm font-semibold tracking-tight">
              Recent Posts
            </h2>
            <div className="flex flex-col gap-16">
              {posts.map((post) => (
                <LatestPost key={post.href} post={post} />
              ))}
            </div>
          </div>

          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
