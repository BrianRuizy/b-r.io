import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { BriefcaseIcon } from '@heroicons/react/24/outline'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { Newsletter } from '@/components/Newsletter'
import { PhotoGallery } from '@/components/PhotoGallery'
import { PostCard } from '@/components/PostCard'
import logoBeamIcon from '@/images/logos/beam-icon-borderless.svg'
import logoCams from '@/images/logos/cams-white.png'
import logoHines from '@/images/logos/hines.svg'
import logoPeriship from '@/images/logos/periship.png'
import { getAllPosts } from '@/lib/posts'
import { homeHeroTitle } from '@/lib/site-copy'

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
        <dd className="text-sm text-muted-foreground">{role.title}</dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-sm text-muted-foreground"
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
      company: 'PeriShip (FedEx)',
      title: 'Software Engineer',
      initials: 'P',
      logo: logoPeriship,
      logoBgClass: 'bg-neutral-100',
      logoPadding: 'p-1',
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
    <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
      <h2 className="flex items-center text-2xl font-semibold tracking-tight text-foreground">
        <BriefcaseIcon className="size-5 flex-none text-muted-foreground" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-8 space-y-6">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        href="https://www.linkedin.com/in/brianruizy/"
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        className="mt-8 w-full"
      >
        View LinkedIn
      </Button>
    </div>
  )
}

export default async function Home() {
  const [featuredPost, ...recentPosts] = (await getAllPosts()).slice(0, 4)

  return (
    <>
      <Container className="page-space">
        <header className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <p className="section-label mb-5">Brian Ruiz / New York City</p>
            <h1 className="page-title max-w-2xl">
              {homeHeroTitle.split(/(part-time)/).map((part, index) =>
                part === 'part-time' ? (
                  <span key={index} className="whitespace-nowrap">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/projects">Explore my work</Button>
              <Button
                href="https://www.youtube.com/@brianruizy"
                variant="outline"
              >
                Watch on YouTube
              </Button>
            </div>
          </div>
          <div className="max-w-lg lg:pt-8">
            <p className="text-lg leading-8 text-muted-foreground">
              Software Engineer at Hines, and currently building{' '}
              <Link
                href="https://joinbeam.app"
                className="link-underline text-foreground"
              >
                Beam
              </Link>
              . Focused on crafting delightful digital products. Based in NYC.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              I also make videos about tech and daily life for a community of
              100K+ subscribers.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-medium"
            >
              A little more about me
            </Link>
          </div>
        </header>
        <section aria-labelledby="latest-heading" className="mt-16 sm:mt-20">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 id="latest-heading" className="section-label">
              The latest
            </h2>
            <Link
              href="/writing"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              All writing &amp; videos
            </Link>
          </div>
          {featuredPost ? (
            <PostCard post={featuredPost} featured priority />
          ) : null}
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
        <section
          aria-labelledby="building-heading"
          className="mt-20 border-t border-border pt-10 sm:mt-28 sm:pt-14"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <div>
              <p className="section-label mb-4">Currently building</p>
              <h2
                id="building-heading"
                className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
              >
                Small details.
                <br />
                Better products.
              </h2>
              <p className="mt-5 text-base leading-7 text-muted-foreground">
                From enterprise web apps at Hines to a task manager built for
                iPhone, I care about making complex things feel straightforward.
              </p>
              <Link
                href="/projects"
                className="mt-6 inline-block text-sm font-medium"
              >
                See all projects
              </Link>
            </div>
            <a
              href="https://joinbeam.app"
              className="group flex flex-col justify-between gap-12 rounded-3xl border border-border bg-muted p-8 transition hover:border-muted-foreground/40 sm:p-10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-foreground text-background">
                    <span
                      aria-hidden="true"
                      className="size-6 bg-current"
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
                  </span>
                  <span className="text-2xl font-semibold tracking-tight">
                    Beam
                  </span>
                </div>
                <span className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                  iPhone &amp; Mac
                </span>
              </div>
              <div>
                <h3 className="max-w-lg text-3xl leading-tight font-semibold tracking-tight">
                  A little more focus.
                  <br />A little less friction.
                </h3>
                <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
                  A project and task manager built for iPhone first, with
                  widgets, calendar views, Siri, and a companion Mac app.
                </p>
                <span className="mt-6 inline-block rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground">
                  Explore Beam
                </span>
              </div>
            </a>
          </div>
        </section>
        <section
          aria-label="Updates and work experience"
          className="mt-20 grid items-start gap-6 sm:mt-28 lg:grid-cols-2"
        >
          <Newsletter />
          <Resume />
        </section>
      </Container>
      <PhotoGallery />
    </>
  )
}
