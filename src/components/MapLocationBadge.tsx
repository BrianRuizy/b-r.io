import { cn } from '@/lib/utils'

export function MapLocationBadge({
  label = 'Location',
  place = 'New York, NY',
  className,
}: {
  label?: string
  place?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute bottom-4 left-4 z-10 flex flex-col rounded-lg border bg-background px-4 py-2 leading-none md:bottom-6 md:left-6',
        className,
      )}
    >
      <p className="m-0 text-sm text-muted-foreground">{label}</p>
      <p className="m-0 text-lg font-semibold text-foreground">{place}</p>
    </div>
  )
}
