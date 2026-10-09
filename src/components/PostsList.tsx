'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/Button'
import { PostCard } from '@/components/PostCard'
import { type Post } from '@/lib/posts'
import { writingHref } from '@/lib/writing'

type Filter = 'all' | 'article' | 'video'
const filters: Array<{ label: string; value: Filter }> = [
  { label: 'All posts', value: 'all' },
  { label: 'Articles', value: 'article' },
  { label: 'Videos', value: 'video' },
]

export function PostsList({ posts }: { posts: Array<Post> }) {
  const searchParams = useSearchParams()
  const rawFilter = searchParams.get('type')
  const filter: Filter =
    rawFilter === 'article' || rawFilter === 'video' ? rawFilter : 'all'
  const filteredPosts =
    filter === 'all' ? posts : posts.filter((post) => post.type === filter)
  const [featured, ...remaining] = filteredPosts

  return (
    <div>
      <nav
        aria-label="Filter writing"
        className="mb-10 flex flex-wrap gap-2 border-t border-border pt-6"
      >
        {filters.map((item) => (
          <Button
            key={item.value}
            href={
              item.value === 'all'
                ? writingHref()
                : `${writingHref()}?type=${item.value}`
            }
            scroll={false}
            variant={filter === item.value ? 'outline' : 'ghost'}
            aria-current={filter === item.value ? 'page' : undefined}
          >
            {item.label}
          </Button>
        ))}
      </nav>
      {featured ? (
        <PostCard post={featured} featured priority />
      ) : (
        <p className="py-12 text-muted-foreground">
          No posts in this category yet.
        </p>
      )}
      {remaining.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {remaining.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : null}
    </div>
  )
}
