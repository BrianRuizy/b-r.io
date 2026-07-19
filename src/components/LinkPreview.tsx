import Image, { type StaticImageData } from 'next/image'
import clsx from 'clsx'

type LinkPreviewProps = {
  title: string
  subtitle: string
  image: StaticImageData | string
  url: string
  className?: string
}

function ArrowUpRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  )
}

function getDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

function imageSize(src: StaticImageData | string) {
  if (typeof src === 'string') {
    return { width: 384, height: 216 }
  }
  return { width: src.width, height: src.height }
}

export function LinkPreview({
  title,
  subtitle,
  image,
  url,
  className,
}: LinkPreviewProps) {
  let { width, height } = imageSize(image)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'not-prose my-10 flex flex-row items-center gap-4 rounded-2xl bg-background p-4 ring-1 ring-border sm:gap-6 sm:p-6',
        className,
      )}
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center gap-1 text-sm leading-6 text-muted-foreground">
          <ArrowUpRightIcon className="size-4 shrink-0" />
          <span className="line-clamp-1">{getDomain(url)}</span>
        </div>
        <div className="line-clamp-2 text-base font-semibold leading-7 text-foreground">
          {title}
        </div>
        <p className="line-clamp-2 text-base leading-7 text-muted-foreground">
          {subtitle}
        </p>
      </div>
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl md:w-48">
        <Image
          src={image}
          alt=""
          width={width}
          height={height}
          sizes="(max-width: 768px) 96px, 192px"
          className="h-full w-full object-cover"
        />
      </div>
    </a>
  )
}
