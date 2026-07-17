'use client'

import { useState } from 'react'

import {
  ContentCard,
  ContentCardCta,
  ContentCardDescription,
  ContentCardEyebrow,
  ContentCardTitle,
} from '@/components/ContentCard'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/formatDate'
import { type Post } from '@/lib/posts'

type Filter = 'all' | 'article' | 'video'

const filters: Array<{ label: string; value: Filter }> = [
  { label: 'All', value: 'all' },
  { label: 'Articles', value: 'article' },
  { label: 'Videos', value: 'video' },
]

function PostItem({ post }: { post: Post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <ContentCard className="md:col-span-3">
        <ContentCardTitle
          href={post.href}
          external={post.type === 'video'}
        >
          {post.title}
        </ContentCardTitle>
        <ContentCardEyebrow
          as="time"
          dateTime={post.date}
          className="md:hidden"
          decorate
        >
          {formatDate(post.date)}
        </ContentCardEyebrow>
        <ContentCardDescription>{post.description}</ContentCardDescription>
        <ContentCardCta>
          {post.type === 'article' ? 'Read article' : 'Watch video'}
        </ContentCardCta>
      </ContentCard>
      <ContentCardEyebrow
        as="time"
        dateTime={post.date}
        className="mt-1 max-md:hidden"
      >
        {formatDate(post.date)}
      </ContentCardEyebrow>
    </article>
  )
}

export function PostsList({ posts }: { posts: Array<Post> }) {
  let [filter, setFilter] = useState<Filter>('all')
  let filteredPosts =
    filter === 'all' ? posts : posts.filter((post) => post.type === filter)

  return (
    <div className="space-y-10">
      <div className="flex gap-1" aria-label="Filter posts">
        {filters.map((item) => (
          <Button
            key={item.value}
            type="button"
            size="sm"
            variant={filter === item.value ? 'secondary' : 'ghost'}
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>

      <div className="md:border-l md:border-border md:pl-6">
        <div className="flex max-w-3xl flex-col space-y-16">
          {filteredPosts.map((post) => (
            <PostItem key={post.href} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
