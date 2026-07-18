'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, PanInfo, animate } from 'motion/react'
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

// Clamp value between min and max
const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max)
}

export function PhotoGallery() {
  const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']
  
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const isDraggingRef = useRef(false)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)

  // Check for mobile and reduced motion on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    mediaQuery.addEventListener('change', handleMotionChange)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Initialize position to middle set for mobile
  useEffect(() => {
    if (isMobile) {
      const cardWidth = 176
      const gap = 20
      const totalWidth = photos.length * (cardWidth + gap)
      x.set(-totalWidth)
    }
  }, [isMobile, x])

  // Auto-reset position when approaching boundaries
  useEffect(() => {
    const cardWidth = isMobile ? 176 : 288
    const gap = isMobile ? 20 : 32
    const totalWidth = photos.length * (cardWidth + gap)
    
    const unsubscribe = x.on('change', (latest) => {
      if (isDraggingRef.current || !isMobile) return
      
      if (latest > -totalWidth * 0.5) {
        x.jump(latest - totalWidth)
      } else if (latest < -totalWidth * 2.5) {
        x.jump(latest + totalWidth)
      }
    })
    
    return unsubscribe
  }, [isMobile, x])

  const infinitePhotos = [...photos, ...photos, ...photos]
  const cardWidth = isMobile ? 176 : 288
  const gap = isMobile ? 20 : 32
  const totalWidth = photos.length * (cardWidth + gap)

  const handleDragStart = () => {
    isDraggingRef.current = true
    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDraggingRef.current = false
    const currentX = x.get()
    let velocity = info.velocity.x
    
    const maxVelocity = 2000
    velocity = clamp(velocity, -maxVelocity, maxVelocity)
    
    const projection = currentX + velocity * 0.5
    let finalPosition = projection
    
    if (finalPosition > -totalWidth * 0.5) {
      finalPosition = finalPosition - totalWidth
    } else if (finalPosition < -totalWidth * 2.5) {
      finalPosition = finalPosition + totalWidth
    }
    
    if (prefersReducedMotion) {
      x.set(finalPosition)
      return
    }
    
    animationRef.current = animate(x, finalPosition, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      velocity: velocity,
      restDelta: 0.01,
      restSpeed: 0.01,
    })
  }

  // Desktop: static layout with animations
  if (!isMobile) {
    return (
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {photos.map(({ image, alt }, imageIndex) => (
            <motion.div
              key={image.src}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
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

  // Mobile: draggable carousel
  return (
    <div className="mt-16 sm:mt-20">
      <div 
        ref={containerRef}
        className="relative -my-4 py-4 overflow-hidden touch-none"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -totalWidth * 2.5, right: -totalWidth * 0.5 }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="flex gap-5 cursor-grab active:cursor-grabbing"
        >
          {infinitePhotos.map(({ image, alt }, imageIndex) => (
            <div
              key={`${image.src}-${imageIndex}`}
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
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
