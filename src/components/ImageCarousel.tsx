'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { motion, useReducedMotion, type PanInfo } from 'motion/react'
import { motionTransition, snappySpring } from '@/lib/transitions'
import { cn } from '@/lib/utils'

export type CarouselImage = {
  src: StaticImageData | string
  alt?: string
  caption?: string
}

function imageSize(src: StaticImageData | string) {
  if (typeof src === 'string') {
    return { width: 1600, height: 1067 }
  }
  return { width: src.width, height: src.height }
}

const navButtonClassName =
  'absolute top-1/2 z-10 hidden size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground shadow-md ring-1 shadow-foreground/5 ring-border transition hover:bg-muted disabled:pointer-events-none disabled:opacity-30 md:flex dark:bg-muted dark:hover:bg-muted/80'

export function ImageCarousel({
  images,
  caption,
  className,
}: {
  images: CarouselImage[]
  caption?: string
  className?: string
}) {
  let count = images.length
  let [index, setIndex] = useState(0)
  let [width, setWidth] = useState(0)
  let containerRef = useRef<HTMLDivElement>(null)
  let reduceMotion = useReducedMotion()
  let current = images[index]
  let captionText = current?.caption ?? caption
  let canGoPrev = index > 0
  let canGoNext = index < count - 1

  useEffect(() => {
    let node = containerRef.current
    if (!node) return

    let update = () => setWidth(node.offsetWidth)
    update()

    let observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  function goTo(next: number) {
    setIndex(Math.max(0, Math.min(count - 1, next)))
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    let swipePower = Math.abs(info.offset.x) * Math.abs(info.velocity.x)
    if (
      canGoNext &&
      (info.offset.x < -40 || (info.velocity.x < -300 && swipePower > 8000))
    ) {
      goTo(index + 1)
      return
    }
    if (
      canGoPrev &&
      (info.offset.x > 40 || (info.velocity.x > 300 && swipePower > 8000))
    ) {
      goTo(index - 1)
    }
  }

  if (count === 0 || !current) return null

  let maxDrag = Math.max(0, (count - 1) * width)

  return (
    <div className={cn('not-prose my-8', className)}>
      {/*
        On desktop, pull out with negative margin and pad back in so the image
        stays content-width while nav buttons sit in the side gutters (not clipped).
      */}
      <div className="relative md:-mx-12 md:px-12">
        <div
          ref={containerRef}
          className="overflow-hidden rounded-3xl bg-muted"
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            animate={{ x: width ? -index * width : 0 }}
            transition={motionTransition(snappySpring, reduceMotion)}
            drag={width > 0 ? 'x' : false}
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.14}
            onDragEnd={onDragEnd}
          >
            {images.map((image, i) => {
              let size = imageSize(image.src)
              return (
                <div
                  key={i}
                  className="shrink-0 grow-0"
                  style={{ width: width || '100%' }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt ?? ''}
                    width={size.width}
                    height={size.height}
                    sizes="(min-width: 768px) 672px, 100vw"
                    className="pointer-events-none aspect-3/2 h-auto w-full object-cover"
                    priority={i === 0}
                    draggable={false}
                  />
                </div>
              )
            })}
          </motion.div>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              disabled={!canGoPrev}
              className={cn(navButtonClassName, 'left-0')}
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              disabled={!canGoNext}
              className={cn(navButtonClassName, 'right-0')}
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </>
        )}
      </div>

      {captionText && (
        <figcaption className="mt-4 text-sm leading-6 text-pretty text-muted-foreground/75">
          {captionText}
        </figcaption>
      )}

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Image ${i + 1} of ${count}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
              className="group flex size-6 items-center justify-center"
            >
              <span
                className={cn(
                  'size-2 rounded-full transition',
                  i === index
                    ? 'bg-foreground'
                    : 'bg-foreground/20 group-hover:bg-foreground/45',
                )}
              />
            </button>
          ))}
          <span className="sr-only">
            Image {index + 1} of {count}
          </span>
        </div>
      )}
    </div>
  )
}
