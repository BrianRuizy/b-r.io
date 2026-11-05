'use client'

import Image from 'next/image'
import { useSyncExternalStore } from 'react'
import { formatDate } from '@/lib/formatDate'
import { useSearchParams } from 'next/navigation'

import {
  ContentCard,
  ContentCardCta,
  ContentCardDescription,
  ContentCardTitle,
} from '@/components/ContentCard'
import { Button } from '@/components/Button'
import { type Post } from '@/lib/posts'
import { writingHref } from '@/lib/writing'

type Filter = 'all' | 'article' | 'video'

const filters: Array<{ label: string; value: Filter }> = [
  { label: 'All', value: 'all' },
  { label: 'Articles', value: 'article' },
  { label: 'Videos', value: 'video' },
]

function parseFilter(value: string | null): Filter {
  if (value === 'article' || value === 'video') return value
  return 'all'
}

function hrefFor(filter: Filter) {
  return filter === 'all' ? writingHref() : `${writingHref()}?type=${filter}`
}

function yearOf(date: string) {
  return new Date(date).getFullYear()
}

function groupPostsByYear(posts: Array<Post>) {
  let groups = new Map<number, Array<Post>>()

  for (let post of posts) {
    let year = yearOf(post.date)
    let list = groups.get(year)
    if (list) {
      list.push(post)
    } else {
      groups.set(year, [post])
    }
  }

  return Array.from(groups.entries()).sort(([a], [b]) => b - a)
}

function PostItem({ post }: { post: Post }) {
  return (
    <div className="grid grid-cols-1 items-start gap-y-4 md:grid-cols-4">
      <time
        dateTime={post.date}
        className="text-sm text-muted-foreground md:pt-0.5"
      >
        {formatDate(post.date)}
      </time>
      <ContentCard as="article" className="md:col-span-3">
        <ContentCardTitle as="h3" href={post.href}>
          {post.title}
        </ContentCardTitle>
        <ContentCardDescription className="text-pretty">
          {post.description}
        </ContentCardDescription>
        <ContentCardCta>View post</ContentCardCta>
      </ContentCard>
    </div>
  )
}

function FeaturedPost({ post }: { post: Post }) {
  const cover =
    post.coverImage ??
    (post.type === 'video'
      ? `https://i.ytimg.com/vi/${post.youtubeId}/maxresdefault.jpg`
      : null)
  return (
    <ContentCard as="article" className="w-full">
      <div className="relative z-10 mb-5 aspect-3/2 w-full overflow-hidden rounded-xl bg-muted ring-1 ring-border sm:rounded-2xl">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            unoptimized={cover.startsWith('https://i.ytimg.com')}
            className="object-cover"
          />
        ) : null}
      </div>
      <ContentCardTitle href={post.href}>{post.title}</ContentCardTitle>
      <time
        dateTime={post.date}
        className="relative z-10 mt-2 text-sm text-muted-foreground"
      >
        {formatDate(post.date)}
      </time>
      <ContentCardDescription className="line-clamp-3 text-pretty">
        {post.description}
      </ContentCardDescription>
      <ContentCardCta>View post</ContentCardCta>
    </ContentCard>
  )
}

function subscribeToLargeScreen(callback: () => void) {
  const query = window.matchMedia('(min-width: 1024px)')
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
function getLargeScreenSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches
}
function getServerSnapshot() {
  return false
}

export function PostsList({ posts }: { posts: Array<Post> }) {
  const isLargeScreen = useSyncExternalStore(
    subscribeToLargeScreen,
    getLargeScreenSnapshot,
    getServerSnapshot,
  )
  const featuredCount = isLargeScreen ? 3 : 2
  let searchParams = useSearchParams()
  let filter = parseFilter(searchParams.get('type'))
  let filteredPosts =
    filter === 'all' ? posts : posts.filter((post) => post.type === filter)
  let postsByYear = groupPostsByYear(filteredPosts.slice(featuredCount))

  return (
    <div className="space-y-20">
      <div className="flex gap-1" aria-label="Filter writing">
        {filters.map((item) => (
          <Button
            key={item.value}
            href={hrefFor(item.value)}
            scroll={false}
            variant={filter === item.value ? 'secondary' : 'ghost'}
            aria-current={filter === item.value ? 'page' : undefined}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.slice(0, featuredCount).map((post) => (
          <FeaturedPost key={post.href} post={post} />
        ))}
      </div>

      <div className="space-y-20">
        {postsByYear.map(([year, yearPosts]) => (
          <section
            key={year}
            aria-label={`${year} writing`}
            className="max-w-4xl md:border-l md:border-border md:pl-6"
          >
            <div className="space-y-10">
              <div className="flex flex-col space-y-16">
                {yearPosts.map((post) => (
                  <PostItem key={post.href} post={post} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
