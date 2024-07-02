"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { generateForm } from "@/lib/form";
import { z } from "zod";
import { Input } from "../ui/input";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const { form, schema } = generateForm({
    schema: z.object({
      search: z.string().min(1),
    }),
  });

  type FormInference = z.infer<typeof schema>;

  const onSubmit = async (data: FormInference) => {
    console.log("submitted!")
    console.log(data)
  };

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

      const { Map } = await loader.importLibrary("maps");

      //initialize a marker

      const { AdvancedMarkerElement } = await loader.importLibrary("marker");

      const position = {
        lat: Number(location.latitude.toFixed(2)),
        lng: Number(location.longitude.toFixed(2)),
      };

      console.log(position);

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

  return (
    <>
      <div className="event__search__floater">
        <div className="search__anchor">
          <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
            <input
              type="text"
              className="search__bar"
              placeholder="Search Event"
             
            />
            <Input className="search__submit" type="submit"  field = 'search'/>
            <Button type="submit"/>
            <div className="search__toggler"></div>
          </Form>
        </div>
      </div>
      <div className="map-container" ref={mapRef} />
    </>
  );
};

export default Map;
