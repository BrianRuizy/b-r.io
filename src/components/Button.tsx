import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-primary font-semibold text-primary-foreground hover:bg-primary/80 active:bg-primary active:text-primary-foreground/70',
  secondary:
    'bg-secondary font-medium text-secondary-foreground hover:bg-muted active:bg-muted active:text-secondary-foreground/60 dark:bg-muted/50 dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-foreground dark:active:bg-muted/50 dark:active:text-foreground/70',
  ghost:
    'font-medium text-muted-foreground hover:bg-muted hover:text-foreground active:bg-muted',
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
  className = clsx(
    'inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
