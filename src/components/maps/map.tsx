"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
        
      });
    }
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "weekly",
      });
      console.log(location)

      const { Map } = await loader.importLibrary("maps");

      //initialize a marker

      const { AdvancedMarkerElement } = await loader.importLibrary("marker");

      const position = {
        lat: location.latitude,
        lng: location.longitude,
      };

      // map options:
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 16,
        mapId: "MY_NEXTJS_MAPID", //GENERATE SOMETING FOR TIS
      };

      // set up the map:
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
      });
    };

    if (location.latitude !== 0 && location.longitude !== 0) {
      initializeMap();
    }
  }, [location]);

  return <div style={{ height: "600px" }} ref={mapRef} />;
};

export default Map;
