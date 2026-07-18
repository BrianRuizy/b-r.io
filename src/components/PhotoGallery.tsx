'use client'

import { useState, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'motion/react'
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
    image: selfieImage,
    alt: 'Brian Ruiz selfie',
  },
  {
    image: deskSunsetImage,
    alt: 'Desk setup at sunset',
  },
  {
    image: bikingImage,
    alt: 'Brian Ruiz on an e-bike',
  },
  {
    image: juneImage,
    alt: 'Brian Ruiz in June',
  },
]

export function PhotoGallery() {
  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  
  const [isMobile, setIsMobile] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const x = useMotionValue(0)
  
  // Bouncy spring physics - iOS style
  const springConfig = {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  }
  
  const springX = useSpring(x, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640
      setIsMobile(mobile)
      if (mobile) {
        setContainerWidth(window.innerWidth)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const cardWidth = isMobile ? 176 : 288
  const gap = isMobile ? 20 : 32
  const totalWidth = photos.length * (cardWidth + gap)
  const maxDrag = containerWidth > 0 ? -(totalWidth - containerWidth + gap) : -totalWidth

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
                stiffness: 300,
                damping: 30,
                mass: 0.8,
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

  // Mobile: draggable carousel with edge bounce and individual card motion
  return (
    <div className="mt-16 sm:mt-20">
      <div className="relative -my-4 py-4 overflow-hidden">
        <motion.div
          drag="x"
          dragElastic={0.2}
          dragConstraints={{
            left: maxDrag,
            right: 0,
          }}
          style={{ x: springX }}
          className="flex gap-5 cursor-grab active:cursor-grabbing"
        >
          {photos.map(({ image, alt }, imageIndex) => (
            <PhotoCard
              key={image.src}
              image={image}
              alt={alt}
              imageIndex={imageIndex}
              rotation={rotations[imageIndex % rotations.length]}
              springX={springX}
              cardWidth={cardWidth}
              gap={gap}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// Individual photo card with parallax motion
function PhotoCard({
  image,
  alt,
  imageIndex,
  rotation,
  springX,
  cardWidth,
  gap,
}: {
  image: StaticImageData
  alt: string
  imageIndex: number
  rotation: string
  springX: MotionValue<number>
  cardWidth: number
  gap: number
}) {
  const cardPosition = imageIndex * -(cardWidth + gap)
  
  // Each card has individual parallax motion
  const cardX = useTransform(
    springX,
    [cardPosition - 200, cardPosition, cardPosition + 200],
    [-20, 0, -20]
  )
  
  // Individual card scale for depth effect
  const cardScale = useTransform(
    springX,
    [cardPosition - 400, cardPosition, cardPosition + 400],
    [0.96, 1, 0.96]
  )

  return (
    <motion.div
      style={{
        x: cardX,
        scale: cardScale,
      }}
      className={clsx(
        'relative w-44 flex-none overflow-hidden rounded-xl bg-muted',
        rotation,
      )}
    >
      <div className="aspect-9/10">
        <Image
          src={image}
          alt={alt}
          sizes="11rem"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>
    </motion.div>
  )
}
