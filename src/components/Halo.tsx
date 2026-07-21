'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

import { useMousePosition } from '@/hooks/useMousePosition'

type HaloProps = {
  children?: ReactNode
  /** Width/height of the glow in px */
  size?: number
  /** How strong the effect should be (0-100) */
  strength?: number
  className?: string
}

/**
 * Mouse-following spotlight, ported from b-r.io.
 * Opacity is driven by a parent `group-hover:` so it still works when the
 * card’s stretched link sits above this surface.
 */
export function Halo({
  children,
  size = 600,
  strength = 16,
  className,
}: HaloProps) {
  let ref = useRef<HTMLDivElement>(null)
  let { x, y } = useMousePosition(ref)
  let offset = size / 2

  return (
    <div
      ref={ref}
      className={cn('relative h-full w-full overflow-hidden', className)}
    >
      <div
        aria-hidden
        style={
          {
            '--x': `${x != null ? x - offset : -offset}px`,
            '--y': `${y != null ? y - offset : -offset}px`,
            '--halo-strength': strength / 100,
            width: size,
            height: size,
            // Foreground-tinted wash: dark on light cards, light on dark cards
            background:
              'radial-gradient(circle, color-mix(in oklab, var(--foreground) var(--halo-tint), transparent) 0%, transparent 60%)',
          } as React.CSSProperties
        }
        className="pointer-events-none absolute inset-0 z-50 translate-x-(--x) translate-y-(--y) opacity-0 transition-opacity duration-300 [--halo-tint:28%] group-hover:opacity-(--halo-strength) max-md:group-hover:opacity-0 dark:[--halo-tint:28%]"
      />
      {children}
    </div>
  )
}
