import React, { Suspense, useMemo } from "react";
import {
  GoogleMap,
  GoogleMapApiLoader,
  AdvancedMarker,
  Polyline,
} from "react-google-map-wrapper";
import { Spinner } from "@heroui/spinner";
import useBuildingState from "@/store/buildingStore";
import buildings from "@/libs/buildings";
import useBusLineState from "@/store/busLineStore";
import BusStopSign from "./BusStopSign";

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
  const buildingId = useBuildingState((state) => state.building);
  const busLine = useBusLineState((state) => state.busLine);

  const building = useMemo(
    () => buildings.find((item) => item.building == buildingId),
    [buildingId],
  );

  return (
    <GoogleMap
      className="w-full h-screen"
      zoom={16}
      center={{
        lat: building?.lat || 13.8479838,
        lng: building?.lng || 100.5697013,
      }}
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
    >
      {busLine?.polylines.map((path, i) => (
        <Polyline
          key={i}
          path={path}
          strokeColor="#08ad32"
          strokeOpacity={1.0}
          strokeWeight={4}
          geodesic
        />
      ))}
      {busLine?.busStops.map((busStop) => (
        <BusStopSign {...busStop} key={busStop.id} />
      ))}

      {building && <AdvancedMarker lat={building.lat} lng={building.lng} />}
    </GoogleMap>
  );
};
