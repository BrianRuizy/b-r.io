import { getLinkMetadata } from '@/lib/link-metadata'
import { cn } from '@/lib/utils'

type OgLinkProps = {
  url: string
  /** Overrides the fetched og:title */
  title?: string
  className?: string
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export async function OgLink({ url, title, className }: OgLinkProps) {
  const meta = await getLinkMetadata(url)
  const label = title ?? meta.title ?? getHostname(url)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline font-medium capitalize text-accent underline decoration-accent/20 underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:decoration-accent',
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={meta.favicon}
        alt=""
        width={16}
        height={16}
        className="mr-1 inline size-[0.95em] max-h-4 translate-y-[-0.08em] rounded-sm"
        loading="lazy"
      />
      {label}
    </a>
  )
}
