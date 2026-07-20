import { Input as HeadlessInput } from '@headlessui/react'
import clsx from 'clsx'

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <HeadlessInput
      className={clsx(
        'w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-card px-3 py-[calc(--spacing(2)-1px)] text-foreground shadow-md shadow-foreground/5 outline outline-border placeholder:text-muted-foreground data-focus:ring-4 data-focus:ring-ring/20 data-focus:outline-ring sm:text-sm dark:bg-muted/30',
        className,
      )}
      {...props}
    />
  )
}
