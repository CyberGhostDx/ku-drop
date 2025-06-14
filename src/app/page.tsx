"use client";
import dynamic from "next/dynamic";
import RoomSearch from "@/components/RoomSearch";
import BuildingInformation from "@/components/BuildingInformation";

const Maps = dynamic(() => import("@/components/Maps"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <RoomSearch />
      <Maps />
      <BuildingInformation />
    </div>
  );
}
