import { Input as HeadlessInput } from '@headlessui/react'
import { cn } from '@/lib/utils'

export function Input({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <HeadlessInput
      className={cn(
        'min-h-11 w-full appearance-none rounded-full border border-border bg-card px-4 py-2 text-base text-foreground outline-offset-4 placeholder:text-muted-foreground data-focus:outline-2 data-focus:outline-foreground',
        className,
      )}
      {...props}
    />
  )
}
