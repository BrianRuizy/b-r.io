import Image, { type StaticImageData } from 'next/image'
import { cn } from '@/lib/utils'
import { iconChromeClassName } from '@/lib/iconChrome'

const sizes = {
  sm: 'size-12',
  md: 'size-16 sm:size-[4.75rem]',
} as const

export function Sticker({
  src,
  srcDark,
  alt,
  rotate = -3,
  size = 'md',
  variant = 'device',
  className,
}: {
  src: StaticImageData
  srcDark?: StaticImageData
  alt: string
  rotate?: number
  size?: keyof typeof sizes
  variant?: 'device' | 'app'
  className?: string
}) {
  let imageSizes = size === 'sm' ? '3rem' : '(min-width: 640px) 4.75rem, 4rem'

  if (variant === 'app') {
    return (
      <div
        className={cn(
          'relative z-20 shrink-0 rounded-lg',
          iconChromeClassName,
          sizes[size],
          className,
        )}
      >
        <div className="size-full overflow-hidden rounded-[inherit]">
          <Image
            src={src}
            alt={alt}
            sizes={imageSizes}
            className={cn('size-full object-cover', srcDark && 'dark:hidden')}
          />
          {srcDark ? (
            <Image
              src={srcDark}
              alt={alt}
              sizes={imageSizes}
              className="hidden size-full object-cover dark:block"
            />
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative z-10 shrink-0 origin-center overflow-visible transition duration-300 ease-out motion-reduce:rotate-0',
        'rotate-[var(--sticker-rotate)] group-hover:rotate-0',
        sizes[size],
        className,
      )}
      style={{ '--sticker-rotate': `${rotate}deg` } as React.CSSProperties}
    >
      <div className="relative isolate size-full">
        <Image
          src={src}
          alt={alt}
          sizes={imageSizes}
          className={cn(
            'size-full object-contain drop-shadow-[0_4px_6px_rgb(0_0_0_/_0.10),0_2px_4px_rgb(0_0_0_/_0.10)]',
            srcDark && 'dark:hidden',
          )}
        />
        {srcDark ? (
          <Image
            src={srcDark}
            alt={alt}
            sizes={imageSizes}
            className="hidden size-full object-contain drop-shadow-[0_4px_6px_rgb(0_0_0_/_0.10),0_2px_4px_rgb(0_0_0_/_0.10)] dark:block"
          />
        ) : null}
      </div>
    </div>
  )
}
