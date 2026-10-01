import Image, { type StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { iconChromeClassName } from '@/lib/iconChrome'

const sizes = {
  sm: 'size-12',
  md: 'size-14 sm:size-[4.25rem]',
} as const

export function Sticker({
  src,
  srcDark,
  alt,
  rotate = -3,
  size = 'md',
  variant = 'device',
  scale = 1,
  className,
}: {
  src: StaticImageData
  srcDark?: StaticImageData
  alt: string
  rotate?: number
  size?: keyof typeof sizes
  variant?: 'device' | 'app'
  scale?: number
  className?: string
}) {
  let imageSizes = size === 'sm' ? '3rem' : '(min-width: 640px) 4.25rem, 3.5rem'

  if (variant === 'app') {
    // Same inset as /projects logos: size-12 plate, size-8 mark.
    return (
      <div
        className={cn(
          'relative z-20 flex shrink-0 items-center justify-center rounded-xl',
          iconChromeClassName,
          sizes[size],
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={32}
          height={32}
          sizes={imageSizes}
          className={cn(
            'size-8 rounded-full object-contain',
            srcDark && 'dark:hidden',
          )}
        />
        {srcDark ? (
          <Image
            src={srcDark}
            alt={alt}
            width={32}
            height={32}
            sizes={imageSizes}
            className="hidden size-8 rounded-full object-contain dark:block"
          />
        ) : null}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative z-10 shrink-0 origin-center overflow-visible transition duration-300 ease-out motion-reduce:rotate-0',
        'rotate-[var(--sticker-rotate)] scale-[var(--sticker-scale)] group-hover:rotate-0',
        sizes[size],
        className,
      )}
      style={
        {
          '--sticker-rotate': `${rotate}deg`,
          '--sticker-scale': String(scale),
        } as React.CSSProperties
      }
    >
      <div className="relative isolate size-full overflow-visible drop-shadow-[0_4px_6px_rgb(0_0_0_/_0.10),0_2px_4px_rgb(0_0_0_/_0.10)]">
        <Image
          src={src}
          alt={alt}
          sizes={imageSizes}
          className="size-full object-contain"
        />
      </div>
    </div>
  )
}
