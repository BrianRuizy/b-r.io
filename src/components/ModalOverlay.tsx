'use client'

import { motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

export const modalOverlayClassName =
  'fixed inset-0 isolate z-50 bg-black/5 supports-backdrop-filter:backdrop-blur-xs'

export function ModalOverlay({
  onClose,
  'aria-label': ariaLabel = 'Close',
  className,
}: {
  onClose: () => void
  'aria-label'?: string
  className?: string
}) {
  let reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      className={cn(modalOverlayClassName, className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.1 }}
      onClick={onClose}
    />
  )
}
