import Link from 'next/link'

import { cn } from '@/lib/utils'

const variantStyles = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/80',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
  outline:
    'border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
  ghost:
    'hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return typeof props.href === 'undefined' ? (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-offset-2 transition-all active:not-aria-[haspopup]:translate-y-px',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  ) : (
    <Link
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium outline-offset-2 transition-all active:not-aria-[haspopup]:translate-y-px',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  )
}
