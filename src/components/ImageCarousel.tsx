'use client'

import { useEffect, useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { motion, useReducedMotion, type PanInfo } from 'motion/react'
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
  let [width, setWidth] = useState(0)
  let containerRef = useRef<HTMLDivElement>(null)
  let reduceMotion = useReducedMotion()
  let current = images[index]

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
    setIndex(Math.max(0, Math.min(images.length - 1, next)))
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    let swipePower = Math.abs(info.offset.x) * Math.abs(info.velocity.x)
    if (info.offset.x < -40 || (info.velocity.x < -300 && swipePower > 8000)) {
      goTo(index + 1)
      return
    }
    if (info.offset.x > 40 || (info.velocity.x > 300 && swipePower > 8000)) {
      goTo(index - 1)
    }
  }

  if (!current) return null

  let maxDrag = Math.max(0, (images.length - 1) * width)

  return (
    <div className={clsx('not-prose my-8', className)}>
      <div className="relative">
        <div
          ref={containerRef}
          className="overflow-hidden rounded-2xl bg-muted ring-1 ring-border"
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            animate={{ x: width ? -index * width : 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 }
            }
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

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous image"
              disabled={index === 0}
              className="absolute top-1/2 left-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md ring-1 shadow-foreground/5 ring-border backdrop-blur-sm transition hover:bg-card disabled:pointer-events-none disabled:opacity-30 dark:bg-muted/90"
            >
              <ChevronLeftIcon className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next image"
              disabled={index === images.length - 1}
              className="absolute top-1/2 right-3 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md ring-1 shadow-foreground/5 ring-border backdrop-blur-sm transition hover:bg-card disabled:pointer-events-none disabled:opacity-30 dark:bg-muted/90"
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
