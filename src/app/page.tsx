import Link from 'next/link'

import { Container } from '@/components/Container'
import {
  ContentCard,
  ContentCardCta,
  ContentCardDescription,
  ContentCardEyebrow,
  ContentCardTitle,
} from '@/components/ContentCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import { PhotoGallery } from '@/components/PhotoGallery'
import { formatDate } from '@/lib/formatDate'
import { getAllPosts, type Post } from '@/lib/posts'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-muted stroke-muted-foreground dark:fill-foreground/10"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-muted-foreground"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-muted stroke-muted-foreground dark:fill-foreground/10"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-muted-foreground"
      />
    </svg>
  )
}

function LatestPost({ post }: { post: Post }) {
  return (
    <ContentCard as="article">
      <ContentCardTitle href={post.href} external={post.type === 'video'}>
        {post.title}
      </ContentCardTitle>
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
      <Icon className="h-6 w-6 fill-muted-foreground transition group-hover:fill-foreground" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form action="/thank-you" className="rounded-2xl border border-border p-6">
      <h2 className="flex text-sm font-semibold text-foreground">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Join 1,400+ other readers. Get notified when I publish something new,
        and unsubscribe at any time.
      </p>
      <div className="mt-6 flex items-center gap-4">
        <Input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto h-9"
        />
        <Button type="submit" className="flex-none" size="lg">
          Join
        </Button>
      </div>
    </form>
  )
}

interface Role {
  company: string
  title: string
  initials: string
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
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-card text-xs font-semibold text-foreground shadow-md ring-1 shadow-foreground/5 ring-border dark:bg-muted">
        {role.initials}
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
      title: 'Senior Software Engineer',
      initials: 'H',
      start: '2024',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Hines',
      title: 'Full Stack Engineer',
      initials: 'H',
      start: '2021',
      end: '2024',
    },
    {
      company: 'PeriShip',
      title: 'Software Engineer',
      initials: 'P',
      start: '2020',
      end: '2021',
    },
    {
      company: 'CAMS',
      title: 'Python Developer',
      initials: 'C',
      start: '2019',
      end: '2020',
    },
  ]

  return (
    <div className="rounded-2xl border border-border p-6">
      <h2 className="flex text-sm font-semibold text-foreground">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button
        variant="secondary"
        size="lg"
        className="mt-6 w-full"
        nativeButton={false}
        render={
          <a
            href="https://www.linkedin.com/in/brianruizy/"
            target="_blank"
            rel="noopener noreferrer"
          />
        }
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
            Software engineer, designer, and creator.
          </h1>
          <p className="mt-6 text-base text-muted-foreground">
            Based in New York City, I care about the details that make software
            useful and enjoyable. I also share videos about technology,
            productivity, and the work behind digital products.
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
              href="https://www.github.com/brianruizy"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/brianruizy/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <PhotoGallery />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {posts.map((post) => (
              <LatestPost key={post.href} post={post} />
            ))}
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
