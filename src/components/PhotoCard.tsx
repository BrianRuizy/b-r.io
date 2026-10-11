'use client'

import { useRef, useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { bouncy, dragTransition } from '@/lib/transitions'
import { Halo } from '@/components/Halo'

type PhotoCardProps = {
  image: StaticImageData
  alt: string
  caption: string
  filename: string
  objectPosition?: string
  aspectClassName?: string
  className?: string
  rotationClassName?: string
  sizes?: string
  isDraggable?: boolean
  index?: number
}

export function PhotoCard({
  image,
  alt,
  caption,
  filename,
  objectPosition,
  aspectClassName = 'aspect-[4/5]',
  className,
  rotationClassName,
  sizes = '(min-width: 640px) 18rem, 11rem',
  isDraggable = true,
  index = 0,
}: PhotoCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const movedDuringPress = useRef(false)

  const togglePhoto = () => setIsFlipped((current) => !current)

  const handleTap = () => {
    if (!movedDuringPress.current) togglePhoto()
    movedDuringPress.current = false
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`${isFlipped ? 'Show photo' : 'Show caption'}: ${alt}`}
      aria-pressed={isFlipped}
      onPointerDownCapture={(event) => {
        pointerStart.current = { x: event.clientX, y: event.clientY }
        movedDuringPress.current = false
      }}
      onPointerMoveCapture={(event) => {
        const start = pointerStart.current
        if (!start || movedDuringPress.current) return

        const distance = Math.hypot(event.clientX - start.x, event.clientY - start.y)
        if (distance > 8) movedDuringPress.current = true
      }}
      onPointerUpCapture={() => {
        pointerStart.current = null
      }}
      onPointerCancelCapture={() => {
        pointerStart.current = null
        movedDuringPress.current = false
      }}
      onTap={handleTap}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          togglePhoto()
        }
      }}
      drag={isDraggable}
      dragElastic={0.15}
      dragTransition={dragTransition}
      whileTap={{ scale: 1.06 }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 40 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        ...bouncy({ duration: 0.6, extraBounce: 0.15 }),
        delay: index * 0.1,
      }}
      style={{ perspective: 1000 }}
      className={cn(
        'group relative z-30 w-44 flex-none overflow-hidden rounded-xl bg-muted sm:w-72 sm:rounded-2xl',
        isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer',
        rotationClassName,
        className,
      )}
    >
      <div className={cn('relative', aspectClassName)}>
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            aria-hidden={isFlipped}
            className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes={sizes}
              className="pointer-events-none object-cover"
              style={{ objectPosition: objectPosition ?? 'center' }}
              draggable={false}
            />
          </div>
          <div
            aria-hidden={!isFlipped}
            className="absolute inset-0 rounded-xl border border-[#6b5130]/10 bg-[#FFFAF2] text-[#554536] shadow-[0_2px_10px_rgba(65,48,25,0.09)] sm:rounded-2xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <Halo strength={50} className="flex items-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl"
              >
                <div className="absolute inset-0 bg-[url('/photopaper-clean.png')] bg-cover opacity-80" />
              </div>
              <div className="relative z-10 px-6">
                <div className="flex flex-col gap-0 font-ticketing uppercase">
                  <p className="text-sm leading-tight break-words text-[#68665f]">
                    {filename}
                  </p>
                  <p className="text-xs leading-tight break-words text-[#68665f]">
                    {caption}
                  </p>
                </div>
              </div>
            </Halo>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
