'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { useTheme } from 'next-themes'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? ''

type LightPreset = 'dawn' | 'day' | 'dusk' | 'night'

type MapProps = {
  lng: number
  lat: number
  zoom?: number
  pitch?: number
  bearing?: number
  /** Force a Standard light preset: dawn | day | dusk | night */
  time?: LightPreset | null
  showMarker?: boolean
  /** Animate camera in after the style loads (flyover zoom + rotate) */
  animateIn?: boolean
  onReady?: () => void
  className?: string
}

export function Map({
  lng,
  lat,
  zoom = 6.5,
  pitch = 15,
  bearing = 0,
  time = null,
  showMarker = true,
  animateIn = false,
  onReady,
  className = 'h-full w-full',
}: MapProps) {
  let mapContainer = useRef<HTMLDivElement>(null)
  let map = useRef<mapboxgl.Map | null>(null)
  let marker = useRef<mapboxgl.Marker | null>(null)
  let onReadyRef = useRef(onReady)
  let showMarkerRef = useRef(showMarker)
  let { resolvedTheme } = useTheme()

  onReadyRef.current = onReady
  showMarkerRef.current = showMarker

  let mapTheme: LightPreset =
    time ?? (resolvedTheme === 'dark' ? 'night' : 'day')

  function addMarker(instance: mapboxgl.Map) {
    if (marker.current) return
    let el = document.createElement('span')
    el.className = 'map-marker'
    marker.current = new mapboxgl.Marker({ element: el, anchor: 'center' })
      .setLngLat([lng, lat])
      .addTo(instance)
  }

  useEffect(() => {
    if (!mapContainer.current || map.current) return
    if (!mapboxgl.accessToken) return

    let startZoom = animateIn ? Math.max(zoom - 1.8, 1) : zoom
    let startPitch = animateIn ? Math.max(pitch - 25, 0) : pitch
    let startBearing = animateIn ? bearing - 55 : bearing

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [lng, lat],
      zoom: startZoom,
      pitch: startPitch,
      bearing: startBearing,
      config: {
        basemap: {
          lightPreset: mapTheme,
        },
      },
    })

    map.current.on('style.load', () => {
      if (!map.current) return
      map.current.setConfigProperty('basemap', 'lightPreset', mapTheme)
      map.current.setPadding({ left: 100 })

      if (showMarkerRef.current) {
        addMarker(map.current)
      }

      if (animateIn) {
        map.current.easeTo({
          center: [lng, lat],
          zoom,
          pitch,
          bearing,
          duration: 3200,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        })
      }

      onReadyRef.current?.()
    })

    return () => {
      marker.current?.remove()
      marker.current = null
      map.current?.remove()
      map.current = null
    }
    // Initialize once for this mount; theme / marker updates handled below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!map.current?.isStyleLoaded()) return
    map.current.setConfigProperty('basemap', 'lightPreset', mapTheme)
  }, [mapTheme])

  useEffect(() => {
    if (!map.current?.isStyleLoaded()) return

    if (!showMarker) {
      marker.current?.remove()
      marker.current = null
      return
    }

    addMarker(map.current)
  }, [showMarker, lng, lat])

  if (!mapboxgl.accessToken) {
    return (
      <div
        className={`flex items-center justify-center bg-muted px-6 text-center text-sm text-muted-foreground ${className}`}
      >
        Add <code className="mx-1">NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN</code> to
        enable the map.
      </div>
    )
  }

  return <div ref={mapContainer} className={`map-container ${className}`} />
}
