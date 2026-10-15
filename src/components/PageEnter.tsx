'use client'

import { motion, useReducedMotion } from 'motion/react'

import { motionTransition, smoothSpring } from '@/lib/transitions'

export function PageEnter({
  children,
  className,
  index = 0,
  as = 'div',
  ...props
}: React.ComponentProps<typeof motion.div> & {
  index?: number
  as?: 'div' | 'header'
}) {
  let reduceMotion = useReducedMotion()
  let transition = motionTransition(
    { ...smoothSpring, duration: 0.6, delay: index * 0.13 },
    reduceMotion,
  )

  let MotionElement = as === 'header' ? motion.header : motion.div

  return (
    <MotionElement
      {...props}
      className={className}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 18, filter: 'blur(2px)' }
      }
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={transition}
    >
      {children}
    </MotionElement>
  )
}
