import type { Transition } from 'motion/react'

/**
 * SwiftUI spring presets, mapped to Motion's duration/bounce API.
 *
 * @see https://developer.apple.com/documentation/swiftui/animation/bouncy(duration:extrabounce:)
 * @see https://developer.apple.com/documentation/swiftui/animation/snappy(duration:extrabounce:)
 * @see https://developer.apple.com/documentation/swiftui/spring/smooth(duration:extrabounce:)
 *
 * Base bounce values from Apple:
 * - smooth → 0
 * - snappy → 0.15
 * - bouncy → 0.3
 *
 * Default perceptual duration for all three: 0.5s
 */

type SpringOptions = {
  duration?: number
  extraBounce?: number
}

function spring(
  baseBounce: number,
  { duration = 0.5, extraBounce = 0 }: SpringOptions = {},
): Transition {
  return {
    type: 'spring',
    duration,
    bounce: baseBounce + extraBounce,
  }
}

/** Critically damped — settles with no overshoot. SwiftUI `.smooth()` */
export function smooth(options?: SpringOptions): Transition {
  return spring(0, options)
}

/** Slightly underdamped — small overshoot, responsive. SwiftUI `.snappy()` */
export function snappy(options?: SpringOptions): Transition {
  return spring(0.15, options)
}

/** More underdamped — visible bounce. SwiftUI `.bouncy()` */
export function bouncy(options?: SpringOptions): Transition {
  return spring(0.3, options)
}

/** Default presets (duration 0.5, extraBounce 0) */
export const smoothSpring = smooth()
export const snappySpring = snappy()
export const bouncySpring = bouncy()

/** Overlay / backdrop fade — matches shadcn duration-100 */
export const overlayFade = {
  duration: 0.1,
} as const satisfies Transition

/** Short content crossfade (nav label, dialog inner content) */
export const contentFade = {
  duration: 0.14,
  ease: 'easeInOut',
} as const satisfies Transition

/**
 * Gesture-driven spring — closer to SwiftUI `interactiveSpring`
 * (stiffer / quicker settle for drag).
 */
export const dragSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
  mass: 0.8,
} as const satisfies Transition

export const dragTransition = {
  bounceStiffness: 400,
  bounceDamping: 40,
} as const

/** Zero-duration when the user prefers reduced motion */
export function motionTransition(
  transition: Transition,
  reduceMotion: boolean | null,
): Transition {
  return reduceMotion ? { duration: 0 } : transition
}
