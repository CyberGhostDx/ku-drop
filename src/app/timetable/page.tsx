"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import { Timetable } from "@/types";
import { ApiResponse } from "@/libs/api";
import SubjectInformation from "@/components/SubjectInformation";

const page = () => {
  const [timetable, setTimetable] = useState<Timetable[]>();
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse>("/timetable");
        if (!res.data.success) return;
        const td = res.data.data.timetable as Timetable[];
        setTimetable(td);
      } catch {}
    };
    fetchTimetable();
  }, []);
  return (
    <div className="grid grid-cols-2 gap-10 pt-40 px-10 py-10">
      {timetable &&
        timetable.map((t, i) => <SubjectInformation {...t} key={i} />)}
    </div>
  );
};

export default page;
