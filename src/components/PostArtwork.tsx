'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PlayIcon } from '@heroicons/react/24/solid'
import { type Post } from '@/lib/posts'
import { cn } from '@/lib/utils'
import cityImage from '@/images/photos/empire.jpeg'
import deskImage from '@/images/photos/desk-sunset.jpeg'
import apartmentImage from '@/images/photos/june.jpeg'
import portraitImage from '@/images/photos/selfie.jpeg'

export function PostArtwork({
  post,
  featured = false,
  priority = false,
}: {
  post: Post
  featured?: boolean
  priority?: boolean
}) {
  const [failures, setFailures] = useState(0)
  const fallbackImage =
    post.type === 'video'
      ? /desk|notion|getting-my-life/.test(post.slug)
        ? deskImage
        : /apartment/.test(post.slug)
          ? apartmentImage
          : /glasses/.test(post.slug)
            ? portraitImage
            : cityImage
      : null
  const src =
    post.coverImage ??
    (post.type === 'video'
      ? `https://i.ytimg.com/vi/${post.youtubeId}/maxresdefault.jpg`
      : null)
  const artwork = failures === 0 ? src : failures === 1 ? fallbackImage : null
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-muted',
        featured ? 'h-full min-h-64 lg:min-h-96' : 'aspect-[16/10]',
      )}
    >
      {artwork ? (
        <Image
          src={artwork}
          alt=""
          fill
          quality={100}
          sizes={
            featured
              ? '(min-width: 1280px) 590px, (min-width: 1024px) 45vw, 90vw'
              : '(min-width: 1280px) 380px, (min-width: 640px) 45vw, 90vw'
          }
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
          priority={priority}
          onError={() => setFailures((current) => Math.min(current + 1, 2))}
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full min-h-[inherit] flex-col justify-between gap-10 bg-linear-to-br from-muted to-border/60 p-8 sm:p-10"
        >
          <span className="section-label">Brian Ruiz / Notes</span>
          <span className="max-w-md text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            {post.title}
          </span>
          <span className="text-sm text-muted-foreground">b-r.io</span>
        </div>
      )}
      {post.type === 'video' ? (
        <span
          aria-hidden="true"
          className="absolute right-5 bottom-5 flex size-12 items-center justify-center rounded-full bg-white text-black shadow-sm"
        >
          <PlayIcon className="ml-0.5 size-5" />
        </span>
      ) : null}
    </div>
  )
}
