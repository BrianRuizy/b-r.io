import { Map } from '@/components/Map'
import { MapLocationBadge } from '@/components/MapLocationBadge'
import { cn } from '@/lib/utils'

export function MapDemo({ className }: { className?: string }) {
  return (
    <figure className={cn('not-prose mt-0 mb-10', className)}>
      <div
        className="relative overflow-hidden rounded-3xl border border-border bg-muted"
        style={{ height: 400 }}
      >
        <Map
          lng={-73.963244}
          lat={40.779437}
          zoom={16.2}
          pitch={58}
          bearing={-28}
          time="dusk"
          animateIn
          showMarker
        />
        <MapLocationBadge place="New York, NY" />
      </div>

      <figcaption className="mt-4 text-sm leading-6 text-pretty text-muted-foreground/75">
        The Met on the edge of Central Park in the evening. This is using the
        dusk theme, which is so nice and rich in detail. Later we&apos;ll see
        how to control the lighting and make the map dynamic.
      </figcaption>
    </figure>
  )
}
