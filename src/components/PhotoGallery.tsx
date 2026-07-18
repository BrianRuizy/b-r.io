'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring } from 'motion/react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  
  // Spring physics for smooth, natural motion - iOS style
  const springConfig = {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  }
  
  const springX = useSpring(x, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Duplicate photos for smooth infinite scroll
  const duplicatedPhotos = [...photos, ...photos]
  
  const cardWidth = isMobile ? 176 : 288
  const gap = isMobile ? 20 : 32
  const singleSetWidth = photos.length * (cardWidth + gap)

  // Handle infinite loop - when we reach the end, jump back seamlessly
  useEffect(() => {
    if (!isMobile) return
    
    const unsubscribe = springX.on('change', (latest) => {
      // When we've scrolled through one full set, reset to beginning
      if (latest <= -singleSetWidth) {
        x.jump(latest + singleSetWidth)
      }
      // When we scroll backwards past the start, jump to end
      else if (latest > 0) {
        x.jump(latest - singleSetWidth)
      }
    })
    
    return unsubscribe
  }, [isMobile, springX, x, singleSetWidth])

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

  // Mobile: smooth draggable carousel with natural physics
  return (
    <div className="mt-16 sm:mt-20">
      <div 
        ref={containerRef}
        className="relative -my-4 py-4 overflow-hidden"
      >
        <motion.div
          drag="x"
          dragElastic={0.2}
          dragConstraints={{
            left: -singleSetWidth + cardWidth,
            right: 0,
          }}
          style={{ x: springX }}
          className="flex gap-5 cursor-grab active:cursor-grabbing"
        >
          {duplicatedPhotos.map(({ image, alt }, imageIndex) => (
            <div
              key={`${image.src}-${imageIndex}`}
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
                  className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
