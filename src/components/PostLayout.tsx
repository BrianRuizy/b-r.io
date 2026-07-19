'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

import { AppContext } from '@/app/providers'
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
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to posts"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-md ring-1 shadow-foreground/5 ring-border transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:bg-muted dark:ring-0 dark:hover:ring-1 dark:hover:ring-foreground/20"
            >
              <ArrowLeftIcon className="size-4 text-muted-foreground transition group-hover:text-foreground" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {post.title}
              </h1>
              <time
                dateTime={post.date}
                className="order-first flex items-center text-base text-muted-foreground"
              >
                <span className="h-4 w-0.5 rounded-full bg-border" />
                <span className="ml-3">{formatDate(post.date)}</span>
              </time>
            </header>

            {post.type === 'video' && (
              <YouTubeEmbed id={post.youtubeId} title={post.title} />
            )}

            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
