'use client'

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
    <ContentCard as="article">
      <ContentCardTitle href={post.href}>{post.title}</ContentCardTitle>
      <ContentCardDescription className="text-pretty">
        {post.description}
      </ContentCardDescription>
      <ContentCardCta>
        {post.type === 'article' ? 'Read article' : 'Watch video'}
      </ContentCardCta>
    </ContentCard>
  )
}

export function PostsList({ posts }: { posts: Array<Post> }) {
  let searchParams = useSearchParams()
  let filter = parseFilter(searchParams.get('type'))
  let filteredPosts =
    filter === 'all' ? posts : posts.filter((post) => post.type === filter)
  let postsByYear = groupPostsByYear(filteredPosts)

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

      <div className="space-y-20">
        {postsByYear.map(([year, yearPosts]) => (
          <section
            key={year}
            aria-label={`${year} writing`}
            className="md:border-l md:border-border md:pl-6"
          >
            <div className="grid max-w-3xl grid-cols-1 items-start gap-y-8 md:grid-cols-4">
              <h2 className="text-sm font-semibold text-foreground md:pt-0.5">
                {year}
              </h2>
              <div className="flex flex-col space-y-16 md:col-span-3">
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
