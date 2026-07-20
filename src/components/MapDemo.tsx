import { Map } from '@/components/Map'
import { MapLocationBadge } from '@/components/MapLocationBadge'

export function MapDemo() {
  return (
    <div
      className="not-prose relative overflow-hidden rounded-3xl bg-muted"
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
  )
}
