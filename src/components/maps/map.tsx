"use client";

import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      //initialize a marker

      const {AdvancedMarkerElement} = await loader.importLibrary("marker") 

      const position = {
        lat: 43.642693,
        lng: -79.3871189,
      };

      // map options:
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 16,
        mapId: "MY_NEXTJS_MAPID", //GENERATE SOMETING FOR TIS
      }

      // set up the map:
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const marker = new AdvancedMarkerElement({
        map: map,
        position: position
      })
    };

    initializeMap();
  }, []);

  return <div style={{ height: "600px" }} ref={mapRef}/>

 
};

export default Map;
