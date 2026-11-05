'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

type EncryptedTextProps = {
  text: string
  className?: string
  revealDelayMs?: number
  initialDelayMs?: number
  scrambleHoldMs?: number
  charset?: string
  flipDelayMs?: number
  encryptedClassName?: string
  revealedClassName?: string
}

const DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?'

function randomCharacter(charset: string) {
  return charset.charAt(Math.floor(Math.random() * charset.length))
}

function getInitialScramble(text: string) {
  return Array.from(text, (character, index) =>
    character === ' '
      ? ' '
      : String.fromCharCode(65 + ((character.charCodeAt(0) + index * 11) % 26)),
  )
}

export function EncryptedText({
  text,
  className,
  revealDelayMs = 50,
  initialDelayMs = 450,
  scrambleHoldMs = 600,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}: EncryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()
  const characters = useMemo(() => Array.from(text), [text])
  const [revealCount, setRevealCount] = useState(0)
  const [scrambleChars, setScrambleChars] = useState<string[]>(() =>
    getInitialScramble(text),
  )
  const [replayCount, setReplayCount] = useState(0)
  const scrambleCharsRef = useRef(scrambleChars)

  useEffect(() => {
    if (!isInView || reduceMotion) return

    let frameId = 0
    let timeoutId = 0
    let startTime = 0
    let lastFlipTime = 0
    let previousRevealCount = 0
    let cancelled = false

    const update = (now: number) => {
      if (cancelled) return
      if (startTime === 0) {
        startTime = now
        lastFlipTime = now
        previousRevealCount = 0
        const initial = characters.map((character) =>
          character === ' ' ? ' ' : randomCharacter(charset),
        )
        scrambleCharsRef.current = initial
        setScrambleChars(initial)
      }

      const nextRevealCount = Math.min(
        characters.length,
        Math.floor(
          Math.max(0, now - startTime - scrambleHoldMs) /
            Math.max(1, revealDelayMs),
        ),
      )

      if (nextRevealCount !== previousRevealCount) {
        previousRevealCount = nextRevealCount
        setRevealCount(nextRevealCount)
      }

      if (nextRevealCount >= characters.length) return

      if (now - lastFlipTime >= Math.max(0, flipDelayMs)) {
        const nextScrambleChars = scrambleCharsRef.current.map(
          (character, index) =>
            index < nextRevealCount || characters[index] === ' '
              ? character
              : randomCharacter(charset),
        )
        scrambleCharsRef.current = nextScrambleChars
        setScrambleChars(nextScrambleChars)
        lastFlipTime = now
      }

      frameId = requestAnimationFrame(update)
    }

    timeoutId = window.setTimeout(
      () => {
        frameId = requestAnimationFrame(update)
      },
      replayCount === 0 ? initialDelayMs : 0,
    )

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      cancelAnimationFrame(frameId)
    }
  }, [
    characters,
    charset,
    flipDelayMs,
    initialDelayMs,
    isInView,
    reduceMotion,
    replayCount,
    revealDelayMs,
    scrambleHoldMs,
  ])

  if (!text) return null

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
      onPointerEnter={(event) => {
        if (event.pointerType === 'mouse' && !reduceMotion) {
          const initial = characters.map((character) =>
            character === ' ' ? ' ' : randomCharacter(charset),
          )
          scrambleCharsRef.current = initial
          setScrambleChars(initial)
          setRevealCount(0)
          setReplayCount((count) => count + 1)
        }
      }}
    >
      {characters.map((character, index) => {
        const isRevealed = reduceMotion || index < revealCount
        const displayCharacter = isRevealed
          ? character
          : (scrambleChars[index] ?? '•')

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayCharacter}
          </span>
        )
      })}
    </motion.span>
  )
}
