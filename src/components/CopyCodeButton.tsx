'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckIcon, Square2StackIcon } from '@heroicons/react/24/outline'
import { motion, useReducedMotion } from 'motion/react'

import { Button } from '@/components/Button'
import { motionTransition, symbolReplace } from '@/lib/transitions'

type CopyCodeButtonProps = {
  text: string
  className?: string
  label?: string
}

export function CopyCodeButton({
  text,
  className,
  label = 'Copy code',
}: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false)
  const [showCheck, setShowCheck] = useState(false)
  const iconSynced = useRef(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!iconSynced.current) {
      iconSynced.current = true
      setShowCheck(copied)
      return
    }

    if (reduceMotion) {
      setShowCheck(copied)
      return
    }

    let timeout = window.setTimeout(() => {
      setShowCheck(copied)
    }, 120)

    return () => window.clearTimeout(timeout)
  }, [copied, reduceMotion])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  let transition = motionTransition(symbolReplace(), reduceMotion)
  let hidden = { opacity: 0, scale: 0.001 }
  let visible = { opacity: 1, scale: 1 }

  return (
    <span className={className}>
      <Button
        type="button"
        variant="ghost"
        onClick={copy}
        aria-label={showCheck ? 'Copied' : label}
        className="size-9 p-0 text-muted-foreground"
      >
        <span className="relative block size-5 overflow-visible">
          <motion.span
            initial={false}
            animate={showCheck ? hidden : visible}
            transition={transition}
            style={{ transformOrigin: 'center', zIndex: showCheck ? 0 : 1 }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden={showCheck}
          >
            <Square2StackIcon className="size-5" strokeWidth={1.5} />
          </motion.span>
          <motion.span
            initial={false}
            animate={showCheck ? visible : hidden}
            transition={transition}
            style={{ transformOrigin: 'center', zIndex: showCheck ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden={!showCheck}
          >
            <CheckIcon className="size-5" strokeWidth={1.5} />
          </motion.span>
        </span>
      </Button>
    </span>
  )
}

export const codeBlockSurfaceClass =
  'overflow-x-auto rounded-3xl bg-[var(--tw-prose-pre-bg)] text-[var(--tw-prose-pre-code)]'
