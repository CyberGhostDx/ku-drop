"use client";
import dynamic from "next/dynamic";

const Maps = dynamic(() => import("@/components/Maps"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Maps />
    </div>
  );
}
