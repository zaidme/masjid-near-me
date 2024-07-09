"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { generateForm } from "@/lib/form";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [service, setService] =
    useState<google.maps.places.PlacesService | null>(null);
  const loaderRef = useRef<Loader | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const { form, schema } = generateForm({
    schema: z.object({
      search: z.string().min(1),
    }),
  });

  type FormInference = z.infer<typeof schema>;

  const onSubmit = (data: FormInference) => {
    console.log("submitted!");
    console.log(data);
    useEffect(() => {});
    if (service && map) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: data.search }, (results, status) => {
        if (
          status === google.maps.GeocoderStatus.OK &&
          results &&
          results[0].geometry
        ) {
          const location = results[0].geometry.location;
          map.setCenter(location);

          const request = {
            location: location,
            radius: 5000,
            type: "mosque",
          };

          service.nearbySearch(
            request,
            (
              results: google.maps.places.PlaceResult[] | null,
              status: google.maps.places.PlacesServiceStatus
            ) => {
              if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results
              ) {
                for (let i = 0; i < results.length; i++) {
                  createMarker(results[i]);
                }
              }
            }
          );
        }
      });
    }
  };

  const createMarker = (place: google.maps.places.PlaceResult) => {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map: map!,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
      setSelectedPlace(place);
      setDrawerOpen(true);
    });
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    const initializeMap = async () => {
      if (!loaderRef.current) {
        loaderRef.current = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
          version: "weekly",
          libraries: ["places"],
          id: "329857203597072039",
        });
      }

      const { Map } = await loaderRef.current.importLibrary("maps");

      const position = {
        lat: Number(location.latitude.toFixed(2)),
        lng: Number(location.longitude.toFixed(2)),
      };

      console.log(position);

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 16,
        mapId: "MY_NEXTJS_MAPID",
      };

      const newMap = new Map(mapRef.current as HTMLDivElement, mapOptions);
      setMap(newMap);

      const newService = new google.maps.places.PlacesService(newMap);
      setService(newService);
    };

    if (location.latitude !== 0 && location.longitude !== 0) {
      initializeMap();
    }
  }, [location]);

  return (
    <>
      <div className="map-container" ref={mapRef} />
      <div>
        <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            placeholder="Enter an address"
            className="z-10"
            type="search"
            field="search"
            control={form.control}
          ></Input>
          <Button type="submit" variant="primary" loading={loading}>
            Submit
          </Button>
        </Form>
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger asChild>
            <Button variant="ghost">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>{selectedPlace?.name}</DrawerTitle>
                <DrawerDescription>
                  {selectedPlace?.vicinity || "No address available"}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button onClick={() => setDrawerOpen(false)}>Close</Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default Map;
