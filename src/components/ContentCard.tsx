import Link from 'next/link'
import { cn } from '@/lib/utils'

export function ContentCard({
  as: Component = 'div',
  className,
  children,
}: {
  as?: 'article' | 'div' | 'li'
  className?: string
  children: React.ReactNode
}) {
  return (
    <Component
      className={cn('group relative flex flex-col items-start', className)}
    >
      {children}
    </Component>
  )
}

export function ContentCardTitle({
  as: Component = 'h2',
  href,
  children,
  external = false,
  className,
}: {
  as?: 'h2' | 'h3'
  href?: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  return (
    <Component
      className={cn(
        'text-lg leading-7 font-semibold tracking-tight text-foreground',
        className,
      )}
    >
      {href ? (
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="transition hover:text-muted-foreground"
        >
          {children}
          <span
            className="absolute inset-0 z-30 rounded-[inherit]"
            aria-hidden="true"
          />
        </Link>
      ) : (
        children
      )}
    </Component>
  )
}

export function ContentCardDescription({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <p className="mt-3 text-sm leading-6 text-muted-foreground">{children}</p>
  )
}

export function ContentCardEyebrow<T extends React.ElementType = 'p'>({
  as,
  decorate: _decorate = false,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
  as?: T
  decorate?: boolean
}) {
  const Component = as ?? 'p'
  return (
    <Component
      className={cn(
        'order-first mb-3 flex items-center text-sm text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function ContentCardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="mt-5 text-sm font-medium text-foreground"
    >
      {children}
    </div>
  )
}
