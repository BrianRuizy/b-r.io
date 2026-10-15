import { Button } from '@/components/Button'
import { getLinkMetadata } from '@/lib/link-metadata'

export async function OgButton({
  href,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'href'> & { href: string }) {
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
