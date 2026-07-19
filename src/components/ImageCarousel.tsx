'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from 'motion/react'
import clsx from 'clsx'

export type CarouselImage = {
  src: StaticImageData | string
  alt?: string
  caption?: string
}

function ChevronLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function imageSize(src: StaticImageData | string) {
  if (typeof src === 'string') {
    return { width: 1600, height: 1067 }
  }
  return { width: src.width, height: src.height }
}

export function ImageCarousel({
  images,
  className,
}: {
  images: CarouselImage[]
  className?: string
}) {
  let [index, setIndex] = useState(0)
  let reduceMotion = useReducedMotion()
  let current = images[index]
  let first = images[0]

  function goTo(next: number) {
    setIndex(((next % images.length) + images.length) % images.length)
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) < 50) return
    goTo(info.offset.x < 0 ? index + 1 : index - 1)
  }

  if (!current || !first) return null

  let spacer = imageSize(first.src)
  let active = imageSize(current.src)

  return (
    <div className={clsx('not-prose my-8', className)}>
      <div className="relative overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
        {/* Invisible spacer keeps a stable height while slides fade */}
        <Image
          src={first.src}
          alt=""
          width={spacer.width}
          height={spacer.height}
          sizes="(min-width: 768px) 672px, 100vw"
          className="pointer-events-none aspect-3/2 h-auto w-full opacity-0"
          aria-hidden
          priority
        />

        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
          >
            <Image
              src={current.src}
              alt={current.alt ?? ''}
              width={active.width}
              height={active.height}
              sizes="(min-width: 768px) 672px, 100vw"
              className="pointer-events-none h-full w-full object-cover"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md ring-1 shadow-foreground/5 ring-border backdrop-blur-sm transition hover:bg-card dark:bg-muted/90"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              className="absolute top-1/2 right-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md ring-1 shadow-foreground/5 ring-border backdrop-blur-sm transition hover:bg-card dark:bg-muted/90"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </>
        )}
      </div>

      {current.caption && (
        <p className="mt-3 text-sm text-muted-foreground">{current.caption}</p>
      )}

      {images.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Image ${i + 1} of ${images.length}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
              className="group flex size-6 items-center justify-center"
            >
              <span
                className={clsx(
                  'size-2 rounded-full transition',
                  i === index
                    ? 'bg-foreground'
                    : 'bg-foreground/20 group-hover:bg-foreground/45',
                )}
              />
            </button>
          ))}
          <span className="sr-only">
            Image {index + 1} of {images.length}
          </span>
        </div>
      )}
    </div>
  )
}
