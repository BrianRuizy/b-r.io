'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, PanInfo } from 'motion/react'
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
  
  // For mobile: infinite scroll carousel
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  
  // Spring config inspired by iOS 27 - bouncy and fluid
  const springConfig = {
    type: 'spring' as const,
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

  // Create infinite loop by tripling the photos
  const infinitePhotos = [...photos, ...photos, ...photos]
  
  const cardWidth = isMobile ? 176 : 288 // w-44 = 176px, sm:w-72 = 288px
  const gap = isMobile ? 20 : 32 // gap-5 = 20px, sm:gap-8 = 32px
  const totalWidth = photos.length * (cardWidth + gap)

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentX = x.get()
    const velocity = info.velocity.x
    
    // Calculate natural end position with velocity
    let targetX = currentX + velocity * 0.1
    
    // Wrap around logic for infinite scroll
    if (targetX > 0) {
      targetX = targetX - totalWidth
    } else if (targetX < -totalWidth * 2) {
      targetX = targetX + totalWidth
    }
    
    // Ensure we're always in the middle set for seamless looping
    while (targetX > -totalWidth) {
      targetX -= totalWidth
    }
    while (targetX < -totalWidth * 2) {
      targetX += totalWidth
    }
    
    x.set(targetX)
  }

  // Auto-reset position when approaching boundaries for seamless infinite scroll
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      if (latest > -gap) {
        x.jump(latest - totalWidth)
      } else if (latest < -totalWidth * 2 + gap) {
        x.jump(latest + totalWidth)
      }
    })
    
    return unsubscribe
  }, [x, totalWidth, gap])

  // Initialize position to middle set
  useEffect(() => {
    if (isMobile) {
      x.set(-totalWidth)
    }
  }, [isMobile, totalWidth, x])

  if (!isMobile) {
    // Desktop: original static layout
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
                ...springConfig,
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

  // Mobile: draggable infinite carousel with spring physics
  return (
    <div className="mt-16 sm:mt-20">
      <div 
        ref={containerRef}
        className="relative -my-4 py-4 overflow-hidden"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -totalWidth * 2.5, right: -totalWidth * 0.5 }}
          dragElastic={0.1}
          dragTransition={{ 
            bounceStiffness: 300,
            bounceDamping: 30,
            power: 0.2,
          }}
          onDragEnd={handleDragEnd}
          style={{ x: springX }}
          className="flex gap-5 cursor-grab active:cursor-grabbing"
        >
          {infinitePhotos.map(({ image, alt }, imageIndex) => (
            <motion.div
              key={`${image.src}-${imageIndex}`}
              whileTap={{ scale: 0.95 }}
              transition={springConfig}
              className={clsx(
                'relative w-44 flex-none overflow-hidden rounded-xl bg-muted select-none',
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
