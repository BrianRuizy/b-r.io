"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-95.36327);
  const [lat, setLat] = useState(29.76328);
  const [zoom, setZoom] = useState(2.5);
  const [pitch, setPitch] = useState(25);

  const { theme, resolvedTheme } = useTheme();
  let mapTheme;
  if (resolvedTheme === "dark") {
    mapTheme = "night";
  } else if (resolvedTheme === "light") {
    mapTheme = "light";
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch,
      // interactive: false,
    });

    // set configproperties
    map.current.on("style.load", () => {
      map.current.setConfigProperty("basemap", "lightPreset", mapTheme);
      map.current.setPadding({ left: 150 });

      const el = document.createElement("span");
      el.className = "map-marker";

      new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map.current);
    });
  });

  return (
    <div
      ref={mapContainer}
      className="map-container h-full w-full select-none rounded-2xl"
    />
  );
}
