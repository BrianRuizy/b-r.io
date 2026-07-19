import Link from 'next/link'
import clsx from 'clsx'

import { Halo } from '@/components/Halo'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
      className={clsx(
        'group relative flex flex-col items-start',
        className,
      )}
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
      className={clsx(
        'text-base font-semibold tracking-tight text-foreground',
        className,
      )}
    >
      {href ? (
        <>
          <div className="pointer-events-none absolute -inset-x-4 -inset-y-6 z-0 sm:-inset-x-6">
            <Halo
              strength={16}
              className="h-full w-full scale-95 rounded-2xl bg-muted opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100"
            />
          </div>
          <Link
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
            <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
            <span className="relative z-10">{children}</span>
          </Link>
        </>
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
    <p className="relative z-10 mt-2 text-sm text-muted-foreground">
      {children}
    </p>
  )
}

export function ContentCardEyebrow<T extends React.ElementType = 'p'>({
  as,
  decorate = false,
  className,
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'decorate'> & {
  as?: T
  decorate?: boolean
}) {
  let Component = as ?? 'p'

  return (
    <Component
      className={clsx(
        className,
        'relative z-10 order-first mb-3 flex items-center text-sm text-muted-foreground',
        decorate && 'pl-3.5',
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-border" />
        </span>
      )}
      {children}
    </Component>
  )
}

export function ContentCardCta({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-accent"
    >
      {children}
      <ArrowIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  )
}
