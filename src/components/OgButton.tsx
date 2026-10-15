import { Button } from '@/components/Button'
import { getLinkMetadata } from '@/lib/link-metadata'

type OgButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  className?: string
}

export async function OgButton({ href, children, ...props }: OgButtonProps) {
  const metadata = await getLinkMetadata(href)

  return (
    <Button href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {metadata.favicon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={metadata.favicon}
          alt=""
          width={16}
          height={16}
          className="size-4 rounded-sm"
          loading="lazy"
        />
      ) : null}
      {children}
    </Button>
  )
}
