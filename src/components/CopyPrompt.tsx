'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckIcon, Square2StackIcon } from '@heroicons/react/24/outline'
import { motion, useReducedMotion } from 'motion/react'

import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'
import { motionTransition, symbolReplace } from '@/lib/transitions'

type CopyPromptProps = {
  text: string
  className?: string
}

export function CopyPrompt({ text, className }: CopyPromptProps) {
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
    <div className={cn('not-prose relative my-6', className)}>
      <span className="dark absolute top-3 right-3 sm:top-5 sm:right-5">
        <Button
          type="button"
          variant="secondary"
          onClick={copy}
          aria-label={showCheck ? 'Copied' : 'Copy prompt'}
          className="size-9 p-0"
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
      <pre className="overflow-x-auto rounded-3xl border border-transparent bg-foreground p-5 text-sm leading-6 font-medium text-neutral-100 sm:p-8">
        <code className="font-[inherit] text-[inherit]">{text}</code>
      </pre>
    </div>
  )
}
