import Image, { type StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'

const sizes = {
  sm: 'size-14 sm:size-16',
  md: 'size-[4.5rem] sm:size-[5.5rem]',
} as const

export function Sticker({
  src,
  alt,
  rotate = -6,
  size = 'md',
  variant = 'device',
  className,
}: {
  src: StaticImageData
  alt: string
  rotate?: number
  size?: keyof typeof sizes
  variant?: 'device' | 'app'
  className?: string
}) {
  let imageSizes =
    size === 'sm'
      ? '(min-width: 640px) 4rem, 3.5rem'
      : '(min-width: 640px) 5.5rem, 4.5rem'

  return (
    <div
      className={cn(
        'relative z-10 shrink-0 origin-center transition duration-300 ease-out motion-reduce:rotate-0',
        variant === 'device' &&
          'rotate-[var(--sticker-rotate)] group-hover:-translate-y-1 group-hover:rotate-0',
        variant === 'app' && 'group-hover:-translate-y-0.5',
        sizes[size],
        className,
      )}
      style={
        variant === 'device'
          ? ({ '--sticker-rotate': `${rotate}deg` } as React.CSSProperties)
          : undefined
      }
    >
      <Image
        src={src}
        alt={alt}
        sizes={imageSizes}
        className="size-full object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.12),0_10px_20px_-8px_rgba(0,0,0,0.5)]"
      />
    </div>
  )
}
