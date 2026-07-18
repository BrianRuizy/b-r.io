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
  
  // For mobile: infinite scroll carousel
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const isDraggingRef = useRef(false)
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)

  // Check for reduced motion preference
  useEffect(() => {
    setMounted(true)
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Handle responsive breakpoint and window resize
  useEffect(() => {
    if (!mounted) return
    
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 640
      setIsMobile(newIsMobile)
      
      // Recalculate position on resize to maintain scroll position
      if (newIsMobile) {
        const cardWidth = 176
        const gap = 20
        const totalWidth = photos.length * (cardWidth + gap)
        const currentX = x.get()
        
        // Ensure we're still in valid range after resize
        if (currentX === 0) {
          x.set(-totalWidth)
        }
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mounted, x])

  // Create infinite loop by tripling the photos
  const infinitePhotos = [...photos, ...photos, ...photos]
  
  const cardWidth = isMobile ? 176 : 288 // w-44 = 176px, sm:w-72 = 288px
  const gap = isMobile ? 20 : 32 // gap-5 = 20px, sm:gap-8 = 32px
  const totalWidth = photos.length * (cardWidth + gap)

  const handleDragStart = () => {
    isDraggingRef.current = true
    // Stop any ongoing animations when user starts dragging
    if (animationRef.current) {
      animationRef.current.stop()
      animationRef.current = null
    }
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDraggingRef.current = false
    const currentX = x.get()
    let velocity = info.velocity.x
    
    // Clamp velocity to prevent jarring fast swipes (Apple-like constraint)
    const maxVelocity = 2000
    velocity = clamp(velocity, -maxVelocity, maxVelocity)
    
    // Calculate where momentum would take us (with more refined coefficient)
    const projection = currentX + velocity * 0.5
    
    // Determine which set we'll end up in and wrap if needed
    let finalPosition = projection
    
    // If we've scrolled past boundaries, wrap to equivalent position
    if (finalPosition > -totalWidth * 0.5) {
      finalPosition = finalPosition - totalWidth
    } else if (finalPosition < -totalWidth * 2.5) {
      finalPosition = finalPosition + totalWidth
    }
    
    // Use reduced motion if user prefers
    if (prefersReducedMotion) {
      x.set(finalPosition)
      return
    }
    
    // Animate to final position with spring physics (iOS-like curve)
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

  // Auto-reset position when approaching boundaries for seamless infinite scroll
  useEffect(() => {
    const unsubscribe = x.on('change', (latest) => {
      // Don't jump during active dragging
      if (isDraggingRef.current) return
      
      // Seamlessly jump when we get too far in either direction
      if (latest > -totalWidth * 0.5) {
        x.jump(latest - totalWidth)
      } else if (latest < -totalWidth * 2.5) {
        x.jump(latest + totalWidth)
      }
    })
    
    return unsubscribe
  }, [x, totalWidth])

  // Initialize position to middle set (prevent flash)
  useEffect(() => {
    if (mounted && isMobile && x.get() === 0) {
      x.jump(-totalWidth)
    }
  }, [mounted, isMobile, totalWidth, x])

  // Prevent hydration mismatch by not rendering interactive version until mounted
  if (!mounted) {
    // SSR/initial render: show static centered version
    return (
      <div className="mt-16 sm:mt-20">
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {photos.map(({ image, alt }, imageIndex) => (
            <div
              key={image.src}
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
                  priority={imageIndex < 2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!isMobile) {
    // Desktop: static layout with subtle animations
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
                  priority={imageIndex < 2}
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
        className="relative -my-4 py-4 overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          // Prevent pull-to-refresh and other touch gestures from interfering
          touchAction: 'pan-y',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -totalWidth * 2.5, right: -totalWidth * 0.5 }}
          dragElastic={0.05}
          dragMomentum={false} // We handle momentum manually for better control
          dragTransition={{ power: 0.1, timeConstant: 200 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ 
            x,
            // Ensure GPU acceleration
            willChange: 'transform',
          }}
          className="flex gap-5"
        >
          {infinitePhotos.map(({ image, alt }, imageIndex) => (
            <div
              key={`${image.src}-${imageIndex}`}
              className={clsx(
                'relative w-44 flex-none overflow-hidden rounded-xl bg-muted select-none',
                rotations[imageIndex % rotations.length],
              )}
              style={{
                // Prevent images from blocking drag events
                pointerEvents: 'none',
              }}
            >
              <div className="aspect-9/10">
                <Image
                  src={image}
                  alt={alt}
                  sizes="11rem"
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                  priority={imageIndex >= photos.length && imageIndex < photos.length * 2}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
