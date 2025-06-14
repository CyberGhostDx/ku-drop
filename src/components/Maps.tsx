import React, { Suspense } from "react";
import { GoogleMap, GoogleMapApiLoader } from "react-google-map-wrapper";
import { Spinner } from "@heroui/spinner";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;

const Map = () => {
  if (!apiKey) return "API KEY NOT FOUND";
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <GoogleMapApiLoader apiKey={apiKey} suspense>
        <MapComponent />
      </GoogleMapApiLoader>
    </Suspense>
  );
};

export default React.memo(Map);

const MapComponent = () => {
  return (
    <GoogleMap
      className="w-full h-screen"
      zoom={16}
      center={{ lat: 13.8479838, lng: 100.5697013 }}
      mapOptions={{
        mapId: "DEMO_MAP_ID",
        mapTypeControl: false,
        zoomControl: true,
        streetViewControl: false,
        clickableIcons: false,
        fullscreenControl: false,
        gestureHandling: "greedy",
        restriction: {
          latLngBounds: {
            north: 13.855965,
            south: 13.834748,
            west: 100.557717,
            east: 100.581338,
          },
        },
      }}
    ></GoogleMap>
  );
};
