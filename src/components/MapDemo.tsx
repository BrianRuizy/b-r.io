import { Map } from '@/components/Map'
import { MapLocationBadge } from '@/components/MapLocationBadge'
import { cn } from '@/lib/utils'

export function MapDemo({ className }: { className?: string }) {
  return (
    <figure className={cn('not-prose mt-0 mb-10', className)}>
      <div
        className="relative overflow-hidden rounded-3xl bg-muted"
        style={{ height: 400 }}
      >
        <Map
          lng={-73.963244}
          lat={40.779437}
          zoom={15.5}
          pitch={45}
          bearing={-28}
          time="dusk"
          animateIn
          showMarker
        />
        <MapLocationBadge place="New York, NY" />
      </div>

      <figcaption className="mt-4 text-sm leading-6 text-pretty text-muted-foreground/75">
        The Met on the edge of Central Park at dusk. Mapbox Standard&apos;s dusk
        preset is rich in detail. This is what we will build: camera, lighting,
        badge, then marker.
      </figcaption>
    </figure>
  )
}
