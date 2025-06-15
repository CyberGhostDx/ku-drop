"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import RoomSearch from "@/components/RoomSearch";
import BuildingInformation from "@/components/BuildingInformation";
import axiosInstance from "@/libs/axios";
import { ApiResponse } from "@/libs/api";
import useUserStore from "@/store/userStore";

const Maps = dynamic(() => import("@/components/Maps"), {
  ssr: false,
});

export default function Home() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const auth = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse>("/auth/me");
        const data = res?.data;
        if (!data.success) {
          setUser(null);
        }
        setUser(res.data.data);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };
    auth();
  }, []);

  return (
    <div>
      <RoomSearch />
      <Maps />
      <BuildingInformation />
    </div>
  );
}
