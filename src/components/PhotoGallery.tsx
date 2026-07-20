'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import clsx from 'clsx'

import bikingImage from '@/images/photos/biking.jpeg'
import deskSunsetImage from '@/images/photos/desk-sunset.jpeg'
import juneImage from '@/images/photos/june.jpeg'
import selfieImage from '@/images/photos/selfie.jpeg'
import empireImage from '@/images/photos/empire.jpeg'

const photos = [
  {
    image: empireImage,
    alt: 'Empire State Building',
  },
  {
    image: bikingImage,
    alt: 'Brian Ruiz on an e-bike',
  },
  {
    image: deskSunsetImage,
    alt: 'Desk setup at sunset',
  },
  {
    image: selfieImage,
    alt: 'Brian Ruiz selfie',
  },
  {
    image: juneImage,
    alt: 'Brian Ruiz in June',
  },
]

export function PhotoGallery() {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ]
  const [isMobile, setIsMobile] = useState(false)
  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile || !carouselRef.current) return

    // This is the key: scrollWidth (total content) - offsetWidth (visible area)
    const calculatedWidth =
      carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
    setWidth(calculatedWidth)

    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
        )
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile])

  // Desktop: static layout
  if (!isMobile) {
    return (
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {photos.map(({ image, alt }, imageIndex) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring',
                bounce: 0.28,
                duration: 0.55,
                delay: imageIndex * 0.1,
              }}
              className={clsx(
                'relative w-44 flex-none overflow-hidden rounded-xl bg-muted sm:w-72 sm:rounded-2xl',
                rotations[imageIndex % rotations.length],
              )}
            >
              <div className="aspect-9/10">
                <Image
                  src={image}
                  alt={alt}
                  sizes="(min-width: 640px) 18rem, 11rem"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Mobile: draggable carousel with spring physics
  return (
    <div className="mt-16 sm:mt-20">
      <div className="relative -my-4 overflow-hidden py-4">
        <motion.div
          ref={carouselRef}
          drag="x"
          dragElastic={0.15}
          dragConstraints={{ right: 0, left: -width }}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
          transition={{ type: 'spring', stiffness: 400, damping: 40, mass: 0.8 }}
          className="flex cursor-grab gap-5 will-change-transform active:cursor-grabbing"
        >
          {photos.map(({ image, alt }, imageIndex) => (
            <motion.div
              key={image.src}
              className={clsx(
                'relative w-44 flex-none overflow-hidden rounded-xl bg-muted',
                rotations[imageIndex % rotations.length],
              )}
            >
              <div className="aspect-9/10">
                <Image
                  src={image}
                  alt={alt}
                  sizes="11rem"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
