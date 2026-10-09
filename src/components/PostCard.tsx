import Link from 'next/link'
import { PostArtwork } from '@/components/PostArtwork'
import { formatDate } from '@/lib/formatDate'
import { type Post } from '@/lib/posts'
import { cn } from '@/lib/utils'

export function PostCard({
  post,
  featured = false,
  priority = false,
}: {
  post: Post
  featured?: boolean
  priority?: boolean
}) {
  return (
    <article className="h-full">
      <Link
        href={post.href}
        className={cn(
          'group flex h-full overflow-hidden rounded-3xl border border-border bg-card transition hover:border-muted-foreground/40',
          featured ? 'flex-col bg-muted lg:grid lg:grid-cols-2' : 'flex-col',
        )}
      >
        <div className={cn(featured ? 'order-last lg:order-last' : '')}>
          <PostArtwork
            key={post.slug}
            post={post}
            featured={featured}
            priority={priority}
          />
        </div>
        <div
          className={cn(
            'flex flex-1 flex-col',
            featured ? 'p-7 sm:p-10 lg:order-first' : 'p-6',
          )}
        >
          <p className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
            <span>{post.type === 'article' ? 'Article' : 'Video'}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h2
            className={cn(
              'mt-4 font-semibold tracking-tight text-foreground',
              featured
                ? 'text-3xl leading-[1.2] sm:text-4xl'
                : 'text-xl leading-7',
            )}
          >
            {post.title}
          </h2>
          <p
            className={cn(
              'text-muted-foreground',
              featured
                ? 'mt-6 text-base leading-7 lg:mt-auto lg:pt-10'
                : 'mt-3 text-sm leading-6',
            )}
          >
            {post.description}
          </p>
          <span className="mt-6 text-sm font-medium text-foreground">
            {post.type === 'article' ? 'Read article' : 'Watch video'}
          </span>
        </div>
      </Link>
    </article>
  )
}
