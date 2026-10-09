import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { type PostMeta } from '@/lib/posts'
import { formatDate } from '@/lib/formatDate'

export function PostLayout({
  post,
  children,
}: {
  post: PostMeta
  children: React.ReactNode
}) {
  return (
    <Container className="page-space">
      <article>
        <header className="mx-auto max-w-3xl">
          <Link
            href="/writing"
            className="inline-block text-sm text-muted-foreground transition hover:text-foreground"
          >
            All writing &amp; videos
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{post.type === 'video' ? 'Video' : 'Article'}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h1 className="page-title mt-5">{post.title}</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {post.description}
          </p>
          <p className="mt-6 text-sm">By {post.author}</p>
        </header>
        {post.type === 'video' ? (
          <div className="mx-auto mt-10 max-w-5xl">
            <YouTubeEmbed id={post.youtubeId} title={post.title} />
          </div>
        ) : null}
        {post.type === 'article' && post.coverImage ? (
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={630}
              quality={100}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1280px) 1024px, 90vw"
              priority
            />
          </div>
        ) : null}
        <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-10">
          <Prose className="max-w-none" data-mdx-content>
            {children}
          </Prose>
        </div>
        <div className="mx-auto mt-12 max-w-3xl border-t border-border pt-8">
          <Link
            href="/writing"
            className="inline-block rounded-full border border-border bg-card px-5 py-2.5 text-sm transition hover:bg-muted"
          >
            More writing &amp; videos
          </Link>
        </div>
      </article>
    </Container>
  )
}
