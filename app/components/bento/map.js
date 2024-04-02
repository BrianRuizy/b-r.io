"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Card from "./card";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJpYW5ydWl6IiwiYSI6ImNsdWVyMm1hMTBsMHEyeGs4bWxxYzlrdngifQ._03YK5j-iCRuLKFKg1Zkgw";



export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-95.36327);
  const [lat, setLat] = useState(29.76328);
  const [zoom, setZoom] = useState(4);
  const [pitch, setPitch] = useState(15);

  const { theme, resolvedTheme } = useTheme();
  let mapTheme;
  if (theme === "dark") {
    mapTheme = "night";
  } else if (theme === "light") {
    mapTheme = "day";
  } else {
    mapTheme = resolvedTheme === "dark" ? "night" : "day";
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      center: [lng, lat],
      zoom: zoom,
      pitch: pitch,
    });

    // set configproperties
    map.current.on("style.load", () => {
      map.current.setConfigProperty("basemap", "lightPreset", mapTheme);
      map.current.setPadding({ left: 150 });

   
      // Then, in your useEffect hook:
      const el = document.createElement('span');
      el.className = "map-marker";      
    
      new mapboxgl.Marker({ element: el })
        .setLngLat([lng, lat])
        .addTo(map.current);
    });
  });

  return (
    <Card className="col-span-2 row-span-1">
      <div
        ref={mapContainer}
        className="map-container h-full w-full rounded-2xl"
      />
    </Card>
  );
}

// const marker = document.createElement("div");
//   const wrapper = document.createElement("span");
//   wrapper.className = "relative flex h-3 w-3";

//   const ping = document.createElement("span");
//   ping.className =
//     "animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75";
//   wrapper.appendChild(ping);

//   const inner = document.createElement("span");
//   inner.className = "relative inline-flex rounded-full h-3 w-3 bg-sky-500";
//   wrapper.appendChild(inner);

//   return wrapper;
// }