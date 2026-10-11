'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { bouncy, dragSpring, dragTransition } from '@/lib/transitions'
import { PhotoCard } from '@/components/PhotoCard'

import bikingImage from '@/images/photos/biking.jpeg'
import deskSunsetImage from '@/images/photos/desk-sunset.jpeg'
import juneImage from '@/images/photos/june.jpeg'
import lilyAndMeImage from '@/images/photos/lily-and-me-kyoto.jpeg'
import empireImage from '@/images/photos/empire.jpeg'

const photos = [
  {
    image: empireImage,
    alt: 'Empire State Building',
    caption: 'view from home',
    filename: 'empire.jpeg',
  },
  {
    image: bikingImage,
    alt: 'Brian Ruiz on an e-bike',
    caption: 'riding my ebike',
    filename: 'biking.jpeg',
  },
  {
    image: deskSunsetImage,
    alt: 'Desk setup at sunset',
    caption: 'desk setup at sunset',
    filename: 'desk-sunset.jpeg',
  },
  {
    image: lilyAndMeImage,
    alt: 'Brian Ruiz and Lily beneath a red shrine roof',
    caption: 'exploring Kyoto <3',
    filename: 'lily-and-me.jpeg',
    objectPosition: 'bottom',
  },
  {
    image: juneImage,
    alt: 'Small dog holding a toy',
    caption: 'my pup ૮ • ﻌ • ა',
    filename: 'june.jpeg',
  },
]

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

export function PhotoGallery() {
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

    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(
          carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
        )
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [isMobile])

  const cards = photos.map((photo, imageIndex) => (
    <PhotoCard
      key={photo.image.src}
      {...photo}
      index={imageIndex}
      isDraggable={!isMobile}
      rotationClassName={rotations[imageIndex % rotations.length]}
    />
  ))

  return (
    <div className="mt-16 sm:mt-20">
      {isMobile ? (
        <div className="relative -my-4 overflow-hidden py-4">
          <motion.div
            ref={carouselRef}
            drag="x"
            dragElastic={0.15}
            dragConstraints={{ right: 0, left: -width }}
            dragTransition={dragTransition}
            transition={dragSpring}
            className="flex cursor-grab gap-5 will-change-transform active:cursor-grabbing"
          >
            {cards}
          </motion.div>
        </div>
      ) : (
        <div
          className="-my-4 flex justify-center gap-5 overflow-visible py-4 sm:gap-8"
        >
          {cards}
        </div>
      )}
    </div>
  )
}
