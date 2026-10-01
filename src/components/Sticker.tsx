import Image, { type StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'

const sizes = {
  sm: 'size-14 sm:size-16',
  md: 'size-16 sm:size-[4.75rem]',
  lg: 'size-[4.75rem] sm:size-28',
} as const

export function Sticker({
  src,
  alt,
  rotate = -6,
  size = 'md',
  variant = 'device',
  priority = false,
  className,
}: {
  src: StaticImageData
  alt: string
  rotate?: number
  size?: keyof typeof sizes
  variant?: 'device' | 'app'
  priority?: boolean
  className?: string
}) {
  let imageSizes =
    size === 'lg'
      ? '(min-width: 640px) 7rem, 4.75rem'
      : '(min-width: 640px) 4.75rem, 4rem'

  if (variant === 'app') {
    return (
      <div
        className={cn(
          'relative z-10 shrink-0 transition duration-300 ease-out group-hover:-translate-y-0.5',
          sizes[size],
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          sizes={imageSizes}
          priority={priority}
          className="size-full rounded-[22%] object-cover shadow-md ring-1 ring-black/10 dark:ring-white/10"
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative z-10 shrink-0 origin-center transition duration-300 ease-out motion-reduce:rotate-0',
        'rotate-[var(--sticker-rotate)] group-hover:-translate-y-1 group-hover:rotate-0',
        sizes[size],
        className,
      )}
      style={{ '--sticker-rotate': `${rotate}deg` } as React.CSSProperties}
    >
      <div className="size-full rounded-[1.15rem] bg-white p-[3px] shadow-[0_1px_1px_rgba(0,0,0,0.04),0_10px_24px_-10px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.05)] ring-1 ring-black/5 dark:bg-zinc-100">
        <Image
          src={src}
          alt={alt}
          sizes={imageSizes}
          priority={priority}
          className="size-full rounded-[0.95rem] object-cover"
        />
      </div>
    </div>
  )
}
